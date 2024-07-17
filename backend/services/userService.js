import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import baseApiService from "./baseApiService.js";
import {responseMessages} from "../utils/modelsHelper.js";
import TokenService from "./tokenService.js";
import UserDTO from "../DTOs/userDTO.js";

class UserService extends baseApiService {
    findAll = async () => {
        try {
            const users = await User.find();
            const userDTOs = users.map(user => new UserDTO(user));

            return this.apiResponse({
                message: 'Transport types have been successfully obtained',
                data: userDTOs,
            });
        } catch (err) {
            return this.apiResponse({...responseMessages.exception});
        }
    }

    registration = async (name, email, password, confirmPassword) => {
        try {
            const errors = this.#validateUserData(name, email, password, confirmPassword);
            if (errors.length !== 0) {
                return this.apiResponse({
                    ...responseMessages.entity.savingFailed,
                    data: errors,
                });
            }

            const candidate = await User.findOne({email});
            if (candidate) {
                return this.apiResponse({...responseMessages.entity.alreadyExists});
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
                ...responseMessages.entity.added,
                data: {
                    ...tokens,
                    user: userDTO,
                },
            });
        } catch (err) {
            return this.apiResponse({...responseMessages.exception});
        }
    }

    login = async (email, password) => {
        try {
            const user = await User.findOne({email});

            if (!user) {
                return this.apiResponse({...responseMessages.entity.notExists,});
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
            console.log(err);
            return this.apiResponse({...responseMessages.exception});
        }
    }

    logout = async (refreshToken) => {
        return await TokenService.removeToken(refreshToken);
    }

    refresh = async (refreshToken) => {
        if (!refreshToken) {
            return this.apiResponse({...responseMessages.user.unauthorized});
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            return this.apiResponse({...responseMessages.user.unauthorized});
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