const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const { error } = await schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          message: "Validation failed",
          required: error.details.map((detail) => detail.message),
        });
      } else {
        next();
      }
    } catch (error) {
      return res.status(500).json({
        message: "An uxpected error occured",
        error: error.message,
      });
    }
  };
};
module.exports = { validationMiddleware };
