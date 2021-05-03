import express from 'express';
import WSServer from 'express-ws';

require('dotenv').config()

const app = express();
WSServer(app);

const { HOST, PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server started on: https://${HOST}:${PORT}`);
});
