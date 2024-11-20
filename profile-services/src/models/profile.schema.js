const joi = require("joi");

const profileSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  postal_code: joi.number().required(),
  image: joi.string().optional(),
  id_user: joi.number().required(),
});

module.exports = { profileSchema };
