'use strict';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

//App imports 
import getMongooseConnection from './databases/mongo'
import loadRoutes from './routes';

//INIT______________________________
dotenv.config();
const port = process.env.EXPRESS_PORT;
const app = express();

app.use('/public', express.static(process.env.PUBLIC_PATH))
app.use(bodyParser());
//API endpoints routing
loadRoutes(app);


/**
* Establish db connection before intializing the server
*/
(async function init() {
  try {
    await getMongooseConnection();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const port = 3000;
  app.listen(port, () => {
    console.log(`ITS ALIVE!! Server running at port ${port}`);
  });
})()
