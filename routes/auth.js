const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
const Joi = require('joi');
const {
  User
} = require('../models/user');

router.use(session({
  name: "sid",
  secret: '343ji43j4n3jn4jk3n',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true
  }
}));

// post

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  req.session.userId = user._id

  const token = user.generateAuthToken();
  res.send(token);
});

const validate = (req) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  };

  return Joi.validate(req, schema);
};


module.exports = router;
