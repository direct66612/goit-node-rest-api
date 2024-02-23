const Joi = require("joi");

const registerSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})/
        )
        .required(),
      subscription: Joi.string()
        .valid("starter", "pro", "business")
        .default("starter"),
    })
    .validate(data);

const userUpdateSubscriptionSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      subscription: Joi.string().valid("starter", "pro", "business").required(),
    })
    .validate(data);

const userVerifyResendSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
    })
    .validate(data);

module.exports = {
  registerSchema,
  userUpdateSubscriptionSchema,
  userVerifyResendSchema,
};
