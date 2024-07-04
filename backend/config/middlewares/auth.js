import jwt from "jsonwebtoken";

function isUserLoggedIn(req, res, next) {
    if (!req.cookies || !req.cookies.userToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = jwt.verify(req.cookies.userToken, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

function loginAuth(req, res, next) {
    if (!req.cookies || !req.cookies.userToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

export default { isUserLoggedIn, loginAuth };
