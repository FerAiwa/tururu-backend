import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import socketIO from 'socket.io';
import clientSocket from './events/client-sockets';
import getMongooseConnection from '../db/mongo';
import loadRoutes from './routes';

dotenv.config();
// Express Middlewares & Routing
const app = express();
app.use(bodyParser());
app.use(cors());
loadRoutes(app);


// Bind server with socketIO & express
const server = http.createServer(app);

const io = socketIO(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': process.env.ORIGIN, // '*'
      'Access-Control-Allow-Credentials': true,
    };
    res.writeHead(200, headers);
    res.end();
  }
});

clientSocket(io);


/** Stablish db connection before starting the server */
async function init() {
  const port = process.env.SERVER_PORT || 3000;
  try {
    await getMongooseConnection();
  } catch (e) {
    console.error('Server couldn´t connect to db');
    console.log(e.message);
    process.exit(1);
  }
  server.listen(port, () => console.log(`ITS ALIVE!! Server running at port ${port}`));
}
init();

export default io;
