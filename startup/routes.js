const express = require('express');
const app = express();
const home = require('../routes/home');
const document = require('../routes/document');

module.exports = function(app) {
  app.use('/', home);
  app.use('/api/documents', document);
};

