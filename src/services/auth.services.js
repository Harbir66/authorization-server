const { users } = require('../../database/models');
const hashUtils = require('../utils/hashUtils');
const jwtUtils = require('../utils/jwtUtils');

const registerUser = async (email, password) => {
  const user = await users.findOne({ where: { email } });
  if (user) {
    throw new Error('User already exists');
  }
  const encryptedPassword = await hashUtils.encryptPassword(password);
  const newUser = await users.create({
    email: email,
    password: encryptedPassword,
  });
  return newUser;
};

const loginUser = async (email, password) => {
  const user = await users.findOne({ where: { email } });
  if (!user) {
    throw new Error('User does not exist');
  }
  const isMatch = await hashUtils.comparePasswords(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }
  const token = await jwtUtils.generateToken({ email });
  return token;
};

const validateToken = async (token) => {
  const decodedToken = jwtUtils.decodeToken(token);
  if (!decodedToken) {
    throw new Error('Invalid token');
  }

  const email = decodedToken.user;
  const foundUserWithToken = await users.findOne({
    where: { email },
    attributes: ['id', 'email'],
  });
  return foundUserWithToken;
};

module.exports = {
  registerUser,
  loginUser,
  validateToken,
};
