const joi = require("joi");

const userSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = { userSchema };
