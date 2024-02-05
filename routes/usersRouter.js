const express = require("express");

const usersRouter = express.Router();

const { userRegister, userLogin } = require("../controllers/usersControllers");

usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);

module.exports = { usersRouter };
