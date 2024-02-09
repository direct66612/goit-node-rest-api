const { asyncHandler } = require("../../helpers/asyncHandler");

const { userUpdateSubscriptionSchema } = require("../../schemas/usersSchemas");

const { userUpdate } = require("../../services/userServices/userUpdate");

const userUpdateSubscription = async (req, res) => {
  const { value, error } = userUpdateSubscriptionSchema(req.body);
  if (error) {
    return res.status(400).json({
      Status: "400 Bad Request",
      ContentType: "application / json",
      ResponseBody: "Ошибка от Joi или другой библиотеки валидации",
    });
  }
  const { subscription } = value;
  const updatedUser = await asyncHandler(
    userUpdate,
    req.params.id,
    subscription
  );
  res.status(200).json({ updatedUser });
};

module.exports = { userUpdateSubscription };
