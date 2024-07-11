import jwt from "jsonwebtoken";
import User from "../../models/UserSchema.js";

const isAdmin = async (req, res, next) => {
  try {
    const user = jwt.verify(req.cookies.userToken, process.env.JWT_TOKEN);
    req.user = user;

    const foundUser = await User.findById(user.user);

    if (!foundUser || foundUser.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized. User is not an admin" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default { isAdmin };
