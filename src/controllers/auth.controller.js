const authServices = require('../services/auth.services');
const redisUtils = require('../utils/redisUtils');

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await authServices.registerUser(email, password);
    res.status(201).json({ message: 'User Registered', user: newUser.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authServices.loginUser(email, password);
    await redisUtils.storeToken(token, email);
    res.status(200).json({ jwt: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const authorizationToken = req.headers['authorization'];
    if (!authorizationToken) {
      res.status(401).json({ message: 'Unauthorized - No Token Found' });
    }
    const token = authorizationToken.split(' ')[1];
    const user = await authServices.validateToken(token);
    const cachedToken = await redisUtils.getToken(token);
    if (!cachedToken) {
      res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  validateToken,
};
