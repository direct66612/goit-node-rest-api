const Joi = require("joi");

const createContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(8).required(),
      phone: Joi.string().min(10).max(10).required(),
      email: Joi.string().email().required(),
    })
    .validate(data);

const updateContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(8),
      phone: Joi.string().min(10).max(10),
      email: Joi.string().email(),
    })
    .validate(data);
module.exports = { createContactSchema, updateContactSchema };
