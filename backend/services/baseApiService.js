import {codeStatuses} from "../utils/constants/responseConstants.js";
import apiResponseDTO from "../DTOs/apiResponseDTO.js";

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


class baseApiService {
    #getMessage = (status, message) => message || responseMessages[status] || responseMessages.default;

    #getStatus = status => status || responseStatuses[status] || responseStatuses.default;


    apiResponse = ({
        message = responseMessages.default,
        data = [],
        status = responseStatuses.default,
        isSuccess = true
   }) => {
        status = this.#getStatus(status);
        message = this.#getMessage(status, message);

        const success = (status === codeStatuses.success || status === codeStatuses.successfulAdded) ? isSuccess : false;
        const content = {
            isSuccess: success,
            ...(success ? { data, message } : { errors: [message].concat(data) }),
        }

        return new apiResponseDTO(status, content);
    }

    // handleHttpRequest = async (req, res, serviceFunction, ...args) => {
    //     const responseData = await serviceFunction(...args);
    //     res.status(responseData.status).json(responseData.content);
    // }
}


export default baseApiService;