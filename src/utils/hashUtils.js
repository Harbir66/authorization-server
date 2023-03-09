const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  return encryptedPassword;
};

const comparePasswords = async (password, encryptedPassword) => {
  const isMatch = await bcrypt.compare(password, encryptedPassword);
  return isMatch;
};

module.exports = {
  encryptPassword,
  comparePasswords,
};
