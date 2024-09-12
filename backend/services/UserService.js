import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import BaseApiService from "./BaseApiService.js";
import TokenService from "./TokenService.js";
import UserDTO from "../DTOs/userDTO.js";
import {isJsonWebTokenError} from "../utils/throwables.js";
import {codeStatuses, responseTemplates} from "../utils/constants/responseConstants.js";
import UserConstants from "../models/constants/UserConstants.js";

class UserService extends BaseApiService {
    findAll = async () => {
        try {
            const users = await User.find();
            const userDTOs = users.map(user => new UserDTO(user));

            return this.apiResponse({
                message: 'Transport types have been successfully obtained',
                data: userDTOs,
            });
        } catch (err) {
            return this.apiResponse({...responseTemplates.exception});
        }
    }

    registration = async (name, email, password, confirmPassword) => {
        try {
            const errors = this.#validateUserData(name, email, password, confirmPassword);
            if (errors.length) {
                return this.apiResponse({
                    ...responseTemplates.entity.savingFailed,
                    data: errors,
                });
            }

            if (await User.findOne({ email })) {
                return this.apiResponse({ ...responseTemplates.entity.alreadyExists });
            }

            const user = await User.create({
                name: name,
                email: email,
                password: password,
            });
            const userDTO = new UserDTO(user);
            const tokens = TokenService.generateTokens({...userDTO});

            await TokenService.saveToken(userDTO.id, tokens.refreshToken);


            return this.apiResponse({
                ...responseTemplates.entity.added,
                data: {
                    ...tokens,
                    user: userDTO,
                },
            });
        } catch (err) {
            return this.apiResponse({...responseTemplates.exception});
        }
    }

    login = async (email, password) => {
        try {
            const user = await User.findOne({email});

            if (!user) {
                return this.apiResponse({...responseTemplates.entity.notExists,});
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                return this.apiResponse({
                    message: 'Incorrect password',
                    isSuccess: false,
                });
            }

            const userDTO = new UserDTO(user);
            const publicFields = {
                id: userDTO.id,
                name: userDTO.name,
                email: userDTO.email,
                role: userDTO.role,
            };
            const tokens = TokenService.generateTokens(publicFields);

            await TokenService.saveToken(userDTO.id, tokens.refreshToken);

            return this.apiResponse({
                message: 'Successful login',
                data: {
                    ...tokens,
                    user: publicFields,
                },
            });
        } catch (err) {
            return this.apiResponse({...responseTemplates.exception});
        }
    }

    logout = async (refreshToken) => {
        try {
            await TokenService.removeToken(refreshToken);
        } catch (err) {
            return this.apiResponse({...responseTemplates.exception});
        }

        return this.apiResponse({
            status: codeStatuses.success,
        });
    }

    refresh = async (refreshToken) => {
        if (!refreshToken) {
            return this.apiResponse({...responseTemplates.user.unauthorized});
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            return this.apiResponse({...responseTemplates.user.unauthorized});
        }

        const user = await User.findById(userData.id);
        const userDTO = new UserDTO(user);
        const tokens = TokenService.generateTokens({...userDTO});

        await TokenService.saveToken(userDTO.id, tokens.refreshToken);
        return this.apiResponse({
            message: 'The token has been successfully updated',
            data: {
                ...tokens,
                user: userDTO,
            },
        });
    }


    isAdmin = async (authorizationHeader) => {
        if (!authorizationHeader) {
            return this.#unauthorizedResponse();
        }

        const accessToken = authorizationHeader.split(' ')[1];
        let validatedAccessToken = false;

        try {
            validatedAccessToken = TokenService.validateAccessToken(accessToken);
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return this.apiResponse({...responseTemplates.validation.accessToken.invalidFormat});
            }
        }

        if (!validatedAccessToken) {
            return this.#unauthorizedResponse();
        }

        const user = new UserDTO(validatedAccessToken);

        const userInDb = await User.findById(user?.id);
        if (!user || !userInDb) {
            return this.apiResponse({...responseTemplates.entity.notExists});
        }

        if (userInDb.role !== UserConstants.ROLE_ADMIN) {
            return this.apiResponse({...responseTemplates.user.forbidden});
        }


        return user;
    }

    isGuest = async (authorizationHeader) => {
        if (!authorizationHeader) {
            return true;
        }

        const accessToken = authorizationHeader.split(' ')[1];
        let validatedAccessToken = false;

        try {
            validatedAccessToken = TokenService.validateAccessToken(accessToken);
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return true;
            }
        }

        if (!validatedAccessToken) {
            return true;
        }

        const user = new UserDTO(validatedAccessToken);

        const userInDb = await User.findById(user?.id);
        if (userInDb) {
            return this.apiResponse({...responseTemplates.user.alreadyAuthorized});
        }

        return true;
    }

    isAuthenticated = async (authorizationHeader) => {
        if (!authorizationHeader) {
            return this.#unauthorizedResponse();
        }

        const accessToken = authorizationHeader.split(' ')[1];
        let validatedAccessToken = false;

        try {
            validatedAccessToken = TokenService.validateAccessToken(accessToken);
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return this.apiResponse({...responseTemplates.validation.accessToken.invalidFormat});
            }
        }

        if (!validatedAccessToken) {
            return this.#unauthorizedResponse();
        }

        const user = new UserDTO(validatedAccessToken);

        const userInDb = await User.findById(user?.id);
        if (!user || !userInDb) {
            return this.apiResponse({...responseTemplates.entity.notExists});
        }


        return user;
    }


    #unauthorizedResponse = () => this.apiResponse({...responseTemplates.user.unauthorized});

    #validateUserData(name, email, password, confirmPassword) {
        let errors = [];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || !email || !password || !confirmPassword) {
            errors.push('All fields are required');
        }

        if (!emailRegex.test(email)) {
            errors.push('Invalid email address');
        }

        if (password !== confirmPassword) {
            errors.push('Password do not match');
        }

        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        return errors;
    }
}


export default new UserService();