import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import BaseApiService from "./BaseApiService.js";
import TokenService from "./tokenService.js";
import UserDTO from "../DTOs/userDTO.js";
import {isJsonWebTokenError} from "../utils/throwables.js";
import {responseTemplates} from "../utils/constants/responseConstants.js";
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

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name: name,
                email: email,
                password: hashedPassword,
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
        return await TokenService.removeToken(refreshToken);
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


    #authProcess = async (authorizationHeader, requireAdmin = false, allowUnauthenticated  = false) => {
        try {
            if (!authorizationHeader) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const token = authorizationHeader.split(' ')[1];
            const validatedToken = TokenService.validateAccessToken(token);
            if (!validatedToken) {
                return allowUnauthenticated ? true : this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const user = new UserDTO(validatedToken);
            if (!user) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const userInDb = await User.findById(user.id);
            if (!userInDb) {
                return this.apiResponse({...responseTemplates.entity.notExists});
            }

            if (requireAdmin && userInDb.role !== UserConstants.ROLE_ADMIN) {
                return this.apiResponse({...responseTemplates.user.forbidden});
            }

            return user;
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return this.apiResponse({...responseTemplates.validation.accessToken.invalidFormat});
            }

            return this.apiResponse({...responseTemplates.exception});
        }
    }

    isAdminByAuthHeader = async (authorizationHeader) => {
        try {
            if (!authorizationHeader) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const token = authorizationHeader.split(' ')[1];
            const validatedToken = TokenService.validateAccessToken(token);
            if (!validatedToken) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const user = new UserDTO(validatedToken);

            if (!user) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const userInDb = await User.findById(user.id);

            if (!userInDb) {
                return this.apiResponse({...responseTemplates.entity.notExists});
            }

            if (userInDb.role !== UserConstants.ROLE_ADMIN) {
                return this.apiResponse({...responseTemplates.user.forbidden});
            }


            return user;
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return this.apiResponse({...responseTemplates.validation.accessToken.invalidFormat});
            }

            return this.apiResponse({...responseTemplates.exception});
        }
    }

    isNotAuthenticatedByAuthHeader = async (authorizationHeader) => {
        try {
            if (!authorizationHeader) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const token = authorizationHeader.split(' ')[1];
            const validatedToken = TokenService.validateAccessToken(token);
            if (!validatedToken) {
                return true;
            }

            return this.apiResponse({...responseTemplates.user.forbidden});
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return this.apiResponse({...responseTemplates.validation.accessToken.invalidFormat});
            }

            return this.apiResponse({...responseTemplates.exception});
        }
    }

    isAuthenticatedByAuthHeader = async (authorizationHeader) => {
        try {
            if (!authorizationHeader) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const token = authorizationHeader.split(' ')[1];
            const validatedToken = TokenService.validateAccessToken(token);
            if (!validatedToken) {
                return true;
            }

            const user = new UserDTO(validatedToken);

            if (!user) {
                return this.apiResponse({...responseTemplates.user.unauthorized});
            }

            const userInDb = await User.findById(user.id);

            if (!userInDb) {
                return this.apiResponse({...responseTemplates.entity.notExists});
            }


            return user;
        } catch (err) {
            if (isJsonWebTokenError(err)) {
                return this.apiResponse({...responseTemplates.validation.accessToken.invalidFormat});
            }

            return this.apiResponse({...responseTemplates.exception});
        }
    }



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