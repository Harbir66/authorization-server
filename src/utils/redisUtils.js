const { createClient } = require('redis');

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
  url: `redis://${host}:${port}`,
});

redisClient.on('error', (error) => {
  console.log(process.env.REDIS_HOST);
  console.log('Redis Error: ', error);
});

redisClient.connect().then(() => {
  console.log('Redis connected');
});

const storeToken = async (token, email) => {
  const EXPIRATION_TIME = process.env.EXPIRATION_TIME_REDIS || 3600;
  await redisClient.set(token, email, {
    EX: EXPIRATION_TIME,
  });
};

const getToken = async (token) => {
  const email = await redisClient.get(token);
  return email;
};

module.exports = {
  storeToken,
  getToken,
};
