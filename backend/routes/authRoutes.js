const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfileImage
} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);

router.put(
  "/profile-image",
  authMiddleware,
  updateProfileImage
);

module.exports = router;