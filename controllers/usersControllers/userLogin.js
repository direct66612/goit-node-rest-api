const { registerSchema } = require("../../schemas/usersSchemas");

const { loginUser } = require("../../services/userServices");

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
    const { user } = await loginUser(email, password);
    res.status(200).json({
      Status: "200 OK",
      ContentType: "application/json",
      user: user,
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

module.exports = { userLogin };
