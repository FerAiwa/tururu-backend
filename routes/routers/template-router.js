'use strict';
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Interception middleware!');
  next();
})

//Root of the route
router.get('/', (req, res) => {
  res.send('Hello world!')
})






module.exports = router;
