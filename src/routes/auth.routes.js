const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const {
  registerSchema,
  loginSchema,
  tokenHeaderSchema,
} = require('../middlewares/schemas.validator');

const { validateSchema } = require('../middlewares/auth.validator');

const authRouter = Router();

authRouter.post(
  '/register',
  validateSchema(registerSchema, 'body'),
  authController.registerUser
);
authRouter.post(
  '/login',
  validateSchema(loginSchema, 'body'),
  authController.loginUser
);

authRouter.post(
  '/token/validate',
  validateSchema(tokenHeaderSchema, 'headers'),
  authController.validateToken
);

module.exports = authRouter;
