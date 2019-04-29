'use strict';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// const cors = require("cors");

import express from 'express';

//App imports 
import getMongooseConnection from './databases/mongo'
import loadRoutes from './routes/routes';

//INIT______________________________
dotenv.config();
const port = process.env.EXPRESS_PORT;
const app = express();
//app.use(cors())

app.use('/public', express.static(process.env.PUBLIC_PATH))

app.use(bodyParser());

//Cors Middleware (Allow frontend app served in other port, to access api)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-market');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//API endpoints routing
loadRoutes(app);


/**
* Establish db connection before intializing the server
*/
(async function init() {
  try {
    await getMongooseConnection();
  } catch (e) {
    console.error('Server couldn´t connect to db');
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`ITS ALIVE!! Server running at port ${port}`);
  });
})()
