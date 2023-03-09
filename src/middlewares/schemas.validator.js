const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(50).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(50).required(),
});

const tokenHeaderSchema = Joi.object({
  authorization: Joi.string().required(),
}).required();

module.exports = {
  registerSchema,
  loginSchema,
  tokenHeaderSchema,
};
