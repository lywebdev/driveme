import mongoose from "mongoose";

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



export const codeStatuses = {
    success: 200,
    successfulAdded: 201,

    clientError: 400,
    unauthorized: 401,
    forbidden: 403,
    conflict: 409,

    serverError: 500,
};

export const responseTemplates = {
    exception: {
        message: 'Unexpected error on the server side',
        status: codeStatuses.serverError,
    },

    validation: {
        id: {
            invalidFormat: {
                message: 'Invalid id format',
                status: codeStatuses.clientError,
            },
        },
        accessToken: {
            invalidFormat: {
                message: 'Invalid access token format',
                status: codeStatuses.unauthorized,
            }
        }
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
    },

    user: {
        alreadyAuthorized: {
            message: 'You are already authorized',
            status: codeStatuses.conflict,
        },
        unauthorized: {
            message: 'You are not logged in',
            status: codeStatuses.unauthorized,
        },
        forbidden: {
            message: 'You don\'t have enough rights to execute this request',
            status: codeStatuses.forbidden,
        }
    }
};