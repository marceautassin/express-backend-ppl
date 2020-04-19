const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {
  User,
  validateUser
} = require('../models/user');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  res.send(user);
});

// post

router.post('/', validate(validateUser),async (req, res) => {

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered');

  user = new User(
    _.pick(req.body, ['name', 'email', 'password'])
  );

  const salt = await bcrypt.genSalt(10); //crée un salt avec une certaine complexité
  user.password = await bcrypt.hash(user.password, salt); // générèe un mdp crypté en se basant sur le salt généré juste avant.

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email'])); // x- is for custom header

});

module.exports = router;
