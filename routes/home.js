const express = require('express');
const router = express.Router();

// get
router.get('/', (req, res) => {
  res.send('Welcome on my first API!')
  });

module.exports = router;
