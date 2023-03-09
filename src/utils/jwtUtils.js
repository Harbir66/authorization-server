const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const data = {
    time: Date(),
    user: user.email,
  };
  const SECRET_KEY = process.env.SECRET_KEY || 'ThisIsASecretKey';
  const EXPIRATION_TIME = process.env.EXPIRATION_TIME_JWT || '1h';
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
  return token;
};

const decodeToken = (token) => {
  const SECRET_KEY = process.env.SECRET_KEY || 'ThisIsASecretKey';
  const decoded = jwt.decode(token, SECRET_KEY);
  if (!decoded) return null;
  return decoded;
};

module.exports = { generateToken, decodeToken };
