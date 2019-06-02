import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import getMongooseConnection from '../db/mongo';
import loadRoutes from './routes';

dotenv.config();
const app = express();

// Middlewares
app.use(bodyParser());
app.use(cors());
loadRoutes(app); // API routing

/** Stablish db connection before starting the server */
async function init() {
  const port = process.env.EXPRESS_PORT;
  try {
    await getMongooseConnection();
  } catch (e) {
    console.error('Server couldn´t connect to db');
    process.exit(1);
  }
  app.listen(port, () => console.log(`ITS ALIVE!! Server running at port ${port}`));
}
init();