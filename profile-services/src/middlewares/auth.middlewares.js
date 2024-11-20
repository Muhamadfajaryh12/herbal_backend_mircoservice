const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: err.message,
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  AuthMiddleware,
};
