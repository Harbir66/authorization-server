require('dotenv').config();
const cors = require('cors');
const express = require('express');
const router = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3010;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello Auth!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
