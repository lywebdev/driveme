import {errorTypes} from "./constants/errorTypeConstants.js";

export const isJsonWebTokenError = (error) => {
    return error.name === errorTypes.jsonWebTokenError;
}