import Token from "../models/TokenSchema.js";
import jwt from "jsonwebtoken";

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenInDb = await Token.findOne({user: userId});
            if (tokenInDb) {
                tokenInDb.refreshToken = refreshToken;

                return tokenInDb.save();
            }

            return Token.create({
                user: userId,
                refreshToken: refreshToken,
            })
        } catch (err) {
        }
    }

    async removeToken(refreshToken) {
        return Token.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return Token.findOne({refreshToken});
    }
}

export default new TokenService();