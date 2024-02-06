const express = require("express");

const {
  userLogout,
  userCurrent,
  allowFor,
  protect,
} = require("../middlewares/userMiddlewares");

const usersRouter = express.Router();

const {
  userRegister,
  userLogin,
  userUpdateSubscription,
} = require("../controllers/usersControllers");
usersRouter.use(protect);
usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.post("/logout", userLogout);
usersRouter.get("/current", userCurrent);
usersRouter.use(allowFor("business"));
usersRouter.patch("/:id", userUpdateSubscription);

module.exports = { usersRouter };
