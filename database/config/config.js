const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'authorization',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5442,
  },
  test: {
    username: 'postgres',
    password: 'password',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'post',
    port: 5442,
  },
};
