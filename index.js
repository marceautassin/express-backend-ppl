const express = require('express');
const app = express();
const winston = require('winston')


require('./startup/db')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/prod')(app);
require('./startup/validation')();


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  winston.info(`Listening to port ${port}...`);
});

module.exports = server;

// console.log(process.env.PORT)
