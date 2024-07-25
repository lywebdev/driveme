import UserService from "../services/userService.js";

const findAll = async (req, res) => {
  const response = await UserService.findAll();
  res.status(response.status).json(response.content);
};

const store = async (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  const response = await UserService.registration(name, email, password, passwordConfirmation);

  if (response.content.isSuccess) {
    res.cookie('refreshToken', response.content.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

  res.status(response.status).json(response.content);
};

const login = async (req, res) => {
  const {email, password} = req.body;
  const response = await UserService.login(email, password);

  if (response.content.isSuccess) {
    res.cookie('refreshToken', response.content.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
  }

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
  const response = await UserService.refresh(refreshToken);

  if (response.content.isSuccess) {
    res.cookie('refreshToken', response.content.data.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  res.status(response.status).json(response);
}



export default { findAll, store, login, logout, refreshTokens };
