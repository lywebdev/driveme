import UserService from "../services/userService.js";

const findAll = async (req, res) => {
  const response = await UserService.findAll();
  res.status(response.status).json(response.content);
};

const store = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const response = await UserService.registration(name, email, password, confirmPassword);
  res.status(response.status).json(response.content);
};

const login = async (req, res) => {
  const {email, password} = req.body;

  const response = await UserService.login(email, password);

  res.cookie('refreshToken', response.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(response.status).json(response.content);
};

const logout = async (req, res) => {
  const {refreshToken} = req.cookies;
  const response = await UserService.logout(refreshToken);

  res.clearCookie('refreshToken');
  res.status(response.status).json(response.content);
};

const refreshTokens = async (req, res) => {
  const {refreshToken} = req.cookies;
  const userData = await UserService.refresh(refreshToken);

  res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true
  });

  res.json(userData);
}



export default { findAll, store, login, logout, refreshTokens };
