const { registerSchema } = require("../schemas/usersSchemas");
const { asyncHandler } = require("../helpers/asyncHandler");
const { User } = require("../models/userModel");

const { addUser, loginUser } = require("../services/userServices");

const userRegister = async (req, res) => {
  const { value, error } = registerSchema(req.body);
  if (error) {
    return res.status(400).json({
      Status: "400 Bad Request",
      ContentType: "application / json",
      ResponseBody: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
  const userExists = await User.exists({ email: value.email });
  if (userExists)
    return res.status(409).json({
      Status: "409 Conflict",
      ContentType: "application/json",
      ResponseBody: {
        message: "Email in use",
      },
    });
  const { email, password } = value;
  const newObj = await asyncHandler(addUser, email, password);
  return res.status(201).json({
    Status: "201 Created",
    ContentType: "application/json",
    ResponseBody: {
      user: newObj,
    },
  });
};

const userLogin = async (req, res) => {
  const { value, error } = registerSchema(req.body);
  if (error) {
    return res.status(400).json({
      Status: "400 Bad Request",
      ContentType: "application / json",
      ResponseBody: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
  const { email, password } = value;
  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({
      Status: "200 OK",
      ContentType: "application/json",
      ResponseBody: {
        token: token,
        user: user,
      },
    });
  } catch (error) {
    res.status(401).json({
      Status: "401 Unauthorized",
      ResponseBody: {
        message: "Email or password is wrong",
      },
    });
  }
};
module.exports = {
  userRegister,
  userLogin,
};
