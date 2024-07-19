import apiResponseDTO from "../DTOs/apiResponseDTO.js";
import UserService from "../services/userService.js";

const authResponse = (res, message) => {
  return res.status(401).json({ message: message });
};

const isUserLoggedIn = async (req, res, next) => {
  const userOrApiResponse = await UserService.isNotAuthenticatedByAuthHeader(req.headers.authorization);

  if (userOrApiResponse instanceof apiResponseDTO) {
    return res.status(userOrApiResponse.status).json(userOrApiResponse.content);
  }

  req.user = userOrApiResponse;
  next();
};

const isNotAuthorized = async (req, res, next) => {
  const trueOrApiResponse = await UserService.isNotAuthenticatedByAuthHeader(req.headers.authorization);

  if (trueOrApiResponse instanceof apiResponseDTO) {
    return res.status(trueOrApiResponse.status).json(trueOrApiResponse.content);
  }

  next();
};

const isAdmin = async (req, res, next) => {
  const userOrApiResponse = await UserService.isAdminByAuthHeader(req.headers.authorization);

  if (userOrApiResponse instanceof apiResponseDTO) {
    return res.status(userOrApiResponse.status).json(userOrApiResponse.content);
  }

  req.user = userOrApiResponse;
  next();
};


export default { isUserLoggedIn, isNotAuthorized, isAdmin };
