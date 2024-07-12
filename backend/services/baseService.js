import {codeStatuses} from "../utils/constants/responseConstants.js";

const responseMessages = {
    [codeStatuses.clientError]: 'Error on the client side',
    [codeStatuses.unauthorized]: 'Unauthorized request',
    [codeStatuses.serverError]: 'Error on the server side',
    default: 'Completed successfully'
};

const responseStatuses = {
    [codeStatuses.clientError]: codeStatuses.clientError,
    [codeStatuses.unauthorized]: codeStatuses.unauthorized,
    [codeStatuses.serverError]: codeStatuses.serverError,
    default: codeStatuses.success,
};

const getMessage = (status, message) => message || responseMessages[status] || responseMessages.default;
const getStatus = (status) => status || responseStatuses[status] || responseStatuses.default;



export const apiResponse = ({
    message = responseMessages.default,
    data = [],
    status = responseStatuses.default,
    isSuccess = true
}) => {
    status = getStatus(status);
    message = getMessage(status, message);

    const success = (status === codeStatuses.success || status === codeStatuses.successfulAdded) ? isSuccess : false;


    return {
        status,
        content: {
            isSuccess: success,
            ...(success ? { data, message } : { errors: [message].concat(data) }),
        }
    };
}


export const handleRequest = async (req, res, serviceFunction, ...args) => {
    const responseData = await serviceFunction(...args);
    res.status(responseData.status).json(responseData.content);
};