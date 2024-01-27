const Joi = require("joi");

const createContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      phone: Joi.string().regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/),
      email: Joi.string().email(),
      favorite: Joi.boolean(),
    })
    .validate(data);

const updateContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30),
      phone: Joi.string().regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/),
      email: Joi.string().email(),
      favorite: Joi.boolean(),
    })
    .validate(data);
const updateStatusContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.boolean().required(),
    })
    .validate(data);
module.exports = {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
