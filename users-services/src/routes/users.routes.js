const { register, login } = require("../controllers/users.controllers");
const {
  validationMiddleware,
} = require("../middlewares/validation.middleware");
const { userSchema } = require("../models/users.schema");

const router = require("express").Router();

router.post("/register", validationMiddleware(userSchema), register);
router.post("/login", validationMiddleware(userSchema), login);

module.exports = router;
