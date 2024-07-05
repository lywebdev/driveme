import jwt from "jsonwebtoken";

const unauthorizedResponse = (res) => {
  return res.status(401).json({ message: "Unauthorized" });
};

const isUserLoggedIn = (req, res, next) => {
  if (!req.cookies || !req.cookies.userToken) {
    return unauthorizedResponse(res);
  }
  try {
    const user = jwt.verify(req.cookies.userToken, process.env.JWT_TOKEN);
    req.user = user;
    next();
  } catch (err) {
    return unauthorizedResponse(res);
  }
};

const isUserLoggedOut = (req, res, next) => {
  if (req.cookies && req.cookies.userToken) {
    try {
      jwt.verify(req.cookies.userToken, process.env.JWT_TOKEN);
      return unauthorizedResponse(res);
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};

export default { isUserLoggedIn, isUserLoggedOut };
