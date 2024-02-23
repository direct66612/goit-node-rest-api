const express = require("express");

const {
  userLogout,
  userCurrent,
  allowFor,
  protect,
  uploadAvatar,
  checkVerification,
} = require("../middlewares/userMiddlewares");

const usersRouter = express.Router();

const {
  userRegister,
  userLogin,
  userUpdateSubscription,
  userUpdateAvatar,
  userVerifyEmail,
  userResendEmail,
} = require("../controllers/usersControllers");
usersRouter.post("/register", userRegister);
usersRouter.post("/login", checkVerification, userLogin);
usersRouter.get("/verify/:verificationToken", userVerifyEmail);
usersRouter.post("/verify", userResendEmail);
usersRouter.use(protect);
usersRouter.patch("/avatars", uploadAvatar, userUpdateAvatar);
usersRouter.post("/logout", userLogout);
usersRouter.get("/current", userCurrent);
usersRouter.use(allowFor("business"));
usersRouter.patch("/:id", userUpdateSubscription);

module.exports = { usersRouter };
