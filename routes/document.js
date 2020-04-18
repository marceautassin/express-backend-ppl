const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Document} = require('../models/document');

router.get('/', (req, res) => {
res.status(200).send(res.body)
});

router.post('/', (req, res) => {
  // let document = new Document({
  //   year: req.body.year
  //   // ,
  //   // month: req.body.month,
  //   // name: req.body.name,
  //   // SIRET: req.body.SIRET
  // });
  // document = await document.save();
  res.send(req);
});

module.exports = router;
