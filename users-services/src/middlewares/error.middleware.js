const ClientError = require("../utils/ClientError");
const responseHandler = require("../utils/Response");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return responseHandler(res, 500, "Internal Server Error");
};

module.exports = errorMiddleware;
