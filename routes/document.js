const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Document} = require('../models/document');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res) => {
const result = await Document.find();

res.send(result);
});

router.get('/:id', validateObjectId, async (req, res) => {
const document = await Document.findById(req.params.id);
if(!document) return res.status(404).send('This document does not exist');

res.send(document);
});

router.post('/', async (req, res) => {

});

module.exports = router;
