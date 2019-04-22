'use strict';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

//App imports 
import loadRoutes from './routes';

//INIT______________________________
dotenv.config();
const app = express();
const port = process.env.EXPRESS_PORT;

//Public file serve
app.use('/public', express.static(process.env.PUBLIC_PATH))

//Common Middleware 
app.use(bodyParser());

//API endpoints routing
loadRoutes(app);

//Server Start 
app.listen(port, () => console.log(`ITS ALIVE!! Server running at port ${port}`));