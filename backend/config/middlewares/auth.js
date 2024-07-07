import jwt from "jsonwebtoken";

const authResponse = (res, message) => {
  return res.status(401).json({ message: message });
};

const isUserLoggedIn = (req, res, next) => {
  if (!req.cookies || !req.cookies.userToken) {
    return authResponse(res, "Unauthorized. User is not logged in");
  }
  try {
    const user = jwt.verify(req.cookies.userToken, process.env.JWT_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    return authResponse(res);
  }
};

const isUserLoggedOut = (req, res, next) => {
  if (req.cookies && req.cookies.userToken) {
    try {
      jwt.verify(req.cookies.userToken, process.env.JWT_TOKEN);
      return authResponse(res, "User is already logged in");
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};

export default { isUserLoggedIn, isUserLoggedOut };
