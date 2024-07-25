import apiResponseDTO from "../DTOs/apiResponseDTO.js";
import UserService from "../services/userService.js";
import {codeStatuses} from "../utils/constants/responseConstants.js";


const isUserLoggedIn = async (req, res, next) => {
  const userOrApiResponse = await UserService.isAuthenticated(req.headers.authorization);

  if (userOrApiResponse instanceof apiResponseDTO) {
    return res.status(userOrApiResponse.status).json(userOrApiResponse.content);
  }

  req.user = userOrApiResponse;
  next();
};

const isNotAuthorized = async (req, res, next) => {
  const trueOrApiResponse = await UserService.isGuest(req.headers.authorization);

  if (trueOrApiResponse === true) {
    return next();
  }

  if (trueOrApiResponse instanceof apiResponseDTO) {
    return res.status(trueOrApiResponse.status).json(trueOrApiResponse.content);
  }

  return res.status(codeStatuses.serverError).json('Server Error');
};

const isAdmin = async (req, res, next) => {
  const userOrApiResponse = await UserService.isAdmin(req.headers.authorization);

  if (userOrApiResponse instanceof apiResponseDTO) {
    return res.status(userOrApiResponse.status).json(userOrApiResponse.content);
  }

  req.user = userOrApiResponse;
  next();
};


export default { isUserLoggedIn, isNotAuthorized, isAdmin };
