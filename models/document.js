const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);

const documentSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  SIRET: {
    type: String,
    required: true
  },
  salaire_brut: {
    type: Number,
    required: true
  },
  salaire_net_paye: {
    type: Number,
    required: true
  },
  impot_revenu: {
    type: Number,
    required: true
  },
  conge_n_1: {
    type: Number,
    required: true
  },
  conge_n: {
    type: Number,
    required: true
  },
  rtt: {
    type: Number,
    required: true
  }
})

const Document = mongoose.model('Document', documentSchema);

const validateDocument = (document) => {
  const schema = {
    year: Joi.string().required(),
    month: Joi.string().required(),
    name: Joi.string().required(),
    SIRET: Joi.string().required(),
    salaire_brut: Joi.number().required(),
    salaire_net_paye: Joi.number().required(),
    impot_revenu: Joi.number().required(),
    conge_n_1: Joi.number().required(),
    conge_n: Joi.number().required(),
    rtt: Joi.number().required(),
  };
  return Joi.validate(document, schema);
};

exports.Document = Document;
exports.validate = validateDocument;
