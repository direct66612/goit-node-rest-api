const { asyncHandler } = require("../../helpers/asyncHandler");

const { addUser } = require("../../services/userServices");

const { registerSchema } = require("../../schemas/usersSchemas");

const { User } = require("../../models/userModel");

const nodemailer = require("nodemailer");

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
  const { email, password, subscription } = value;
  const newObj = await asyncHandler(addUser, email, password, subscription);
  try {
    const emailTransporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const emailConfig = {
      from: "Admin <admin@example.com>",
      to: email,
      subject: "Verification email",
      html: `<a href=localhost:3001/users/verify/${newObj.verificationToken}>Please verification email</a>`,
      text: `localhost:3001/users/verify/${newObj.verificationToken}`,
    };

    await emailTransporter.sendMail(emailConfig);
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({
    Status: "201 Created",
    ContentType: "application/json",
    ResponseBody: {
      user: newObj,
    },
  });
};

module.exports = { userRegister };
