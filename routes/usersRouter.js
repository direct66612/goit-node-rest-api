const express = require("express");

const { userLogout, userCurrent } = require("../middlewares/userMiddlewares");

const usersRouter = express.Router();

const { userRegister, userLogin } = require("../controllers/usersControllers");

usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.post("/logout", userLogout);
usersRouter.post("/current", userCurrent);

module.exports = { usersRouter };
