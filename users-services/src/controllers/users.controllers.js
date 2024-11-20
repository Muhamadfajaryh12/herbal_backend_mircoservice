const UsersService = require("../services/users.services");
const userService = new UsersService();
const jwt = require("jsonwebtoken");
const responseHandler = require("../utils/Response");

const generateJWToken = (username) => {
  const generateToken = jwt.sign(username, process.env.SECRET_TOKEN);
  return generateToken;
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await userService.register({ email, password });
    return responseHandler(res, 201, "Success");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await userService.login({ email, password });
    const token = generateJWToken(email);
    return res.status(200).json({
      message: "Login successfully",
      response,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
