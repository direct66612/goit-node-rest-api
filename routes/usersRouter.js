const express = require("express");

const { userLogout, userCurrent } = require("../middlewares/userMiddlewares");

const usersRouter = express.Router();

const {
  userRegister,
  userLogin,
  userUpdateSubscription,
} = require("../controllers/usersControllers");

usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.post("/logout", userLogout);
usersRouter.get("/current", userCurrent);
usersRouter.patch("/:id", userUpdateSubscription);

module.exports = { usersRouter };
