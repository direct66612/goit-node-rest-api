const express = require("express");

const {
  userLogout,
  userCurrent,
  allowFor,
  protect,
  uploadAvatar,
} = require("../middlewares/userMiddlewares");

const usersRouter = express.Router();

const {
  userRegister,
  userLogin,
  userUpdateSubscription,
  userUpdateAvatar,
} = require("../controllers/usersControllers");
usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.use(protect);
usersRouter.patch("/avatars", uploadAvatar, userUpdateAvatar);
usersRouter.post("/logout", userLogout);
usersRouter.get("/current", userCurrent);
usersRouter.use(allowFor("business"));
usersRouter.patch("/:id", userUpdateSubscription);

module.exports = { usersRouter };
