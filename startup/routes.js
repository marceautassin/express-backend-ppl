const express = require('express');
const app = express();
const home = require('../routes/home');
const documents = require('../routes/documents');
const users = require('../routes/users');
const auth = require('../routes/auth');
const session = require('express-session')

module.exports = function(app) {
  app.use(express.json()); //middleware function => req.body
  app.use(express.urlencoded({ extended: true })); //middleware function => req.body
  app.use('/', home);
  app.use('/api/documents', documents);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
};

