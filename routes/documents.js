const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  Document,
  validateDocument
} = require('../models/document');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.get('/', auth, async (req, res) => {
  const result = await Document.find({
    userId: req.userId
  });
  res.send(result);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const document = await Document.findOne({
    _id: req.params.id,
    userId: req.userId
  });
  if (!document) return res.status(404).send('This document does not exist');

  res.send(document);
});

router.post('/', [auth, validate(validateDocument)], async (req, res) => {

  let document = new Document({
    userId: req.userId,
    year: req.body.year,
    month: req.body.month,
    name: req.body.name,
    SIRET: req.body.SIRET,
    salaire_brut: req.body.salaire_brut,
    salaire_net_paye: req.body.salaire_net_paye,
    impot_revenu: req.body.impot_revenu,
    conge_n_1: req.body.conge_n_1,
    conge_n: req.body.conge_n,
    rtt: req.body.rtt
  });

  document = await document.save();
  res.send(document);
});

router.put('/:id', [auth, validateObjectId, validate(validateDocument)], async (req, res) => {
  const document = await Document.findByIdAndUpdate(req.params.id, {
    $set: {
      userID: req.userId,
      year: req.body.year,
      month: req.body.month,
      name: req.body.name,
      SIRET: req.body.SIRET,
      salaire_brut: req.body.salaire_brut,
      salaire_net_paye: req.body.salaire_net_paye,
      impot_revenu: req.body.impot_revenu,
      conge_n_1: req.body.conge_n_1,
      conge_n: req.body.conge_n,
      rtt: req.body.rtt
    }
  }, {
    new: true
  });
  if (!document) return res.status(404).send('This document does not exist');

  res.send(document);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const document = await Document.findOneAndRemove({
    _id: req.params.id,
  userId: req.userId});
  if (!document) return res.status(404).send('This document does not exist');

  res.send(document);

});

module.exports = router;
