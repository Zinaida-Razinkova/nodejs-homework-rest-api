const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscriptionUser,
  updateAvatar,
  updateCloudAvatar,
} = require("../../controllers/users");

const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubUser,
} = require("./validationUsers");
const guard = require("../../helpers/guard");
const uploadAvatar = require("../../helpers/uploadAvatar");

router.post("/signup", guard, validateSignupUser, signupUser);
router.post("/login", guard, validateLoginUser, loginUser);
router.post("/logout", guard, logoutUser);
router.get("/current", guard, getCurrentUser);
router.patch(
  "/subscription",
  guard,
  validateUpdateSubUser,
  updateSubscriptionUser
);
router.patch(
  "/avatar",
  guard,
  uploadAvatar.single("avatar"),
  updateAvatar
  /* updateCloudAvatar */
);

module.exports = router;
