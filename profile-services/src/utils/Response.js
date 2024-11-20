const responseHandler = (res, statusCode, message, data = null) => {
  const responseObject = {
    message,
  };

  if (data) {
    responseObject.data = data;
  }

  return res.status(statusCode).json(responseObject);
};

module.exports = responseHandler;
