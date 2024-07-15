import mongoose from "mongoose";
import {codeStatuses} from "./constants/responseConstants.js";

export function idIsCorrect(id) {
    return id && mongoose.isValidObjectId(id);
}

export function getUpdatableFields(fields) {
    Object.keys(fields).forEach(key => {
        if (fields[key] !== undefined) {
            fields[key] = fields[key];
        }
    });

    return fields;
}


export const responseMessages = {
    validation: {
        id: {
            invalidFormat: {
                message: 'Invalid id format',
                status: codeStatuses.clientError,
            },
        },
    },

    entity: {
        added: {
            message: 'The entry was successfully added',
            status: codeStatuses.successfulAdded,
        },
        updated: {
            message: 'The entry was successfully updated',
            status: codeStatuses.success,
        },

        savingFailed: {
            message: 'Failed to save',
            status: codeStatuses.serverError,
        },
        deletingFailed: {
            message: 'The record could not be deleted',
            status: codeStatuses.serverError,
        },
        gettingError: {
            message: 'Failed to get records',
            status: codeStatuses.serverError,
        },
        alreadyExists: {
            message: 'The record already exists in the database',
            status: codeStatuses.conflict,
        },
        notExists: {
            message: 'The record does not exist in the database',
            status: codeStatuses.conflict,
        },
    }
};
