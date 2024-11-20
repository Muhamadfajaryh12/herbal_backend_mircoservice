const {
  insertProfile,
  getProfile,
} = require("../controllers/profile.controllers");
const { AuthMiddleware } = require("../middlewares/auth.middlewares");
const {
  validationMiddleware,
} = require("../middlewares/validation.middleware");
const { profileSchema } = require("../models/profile.schema");
const router = require("express").Router();

router.post(
  "/profile",
  AuthMiddleware,
  validationMiddleware(profileSchema),
  insertProfile
);
router.get("/:id", AuthMiddleware, getProfile);

module.exports = router;
