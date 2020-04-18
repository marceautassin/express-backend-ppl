const Joi = require('joi');
const mongoose = require('mongoose');
Joi.objectId = require('joi-objectid')(Joi);
const {
  doclineSchema
} = require('./doc_line');

const documentSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  }
  // ,
  // month: {
  //   type: String,
  //   required: true
  // },
  // name: {
  //   type: String,
  //   required: true
  // },
  // SIRET: {
  //   type: String,
  //   required: true
  // },
  // doc_line: {
  //   type: doclineSchema,
  //   require: true
  // }
})

const Document = mongoose.model('Document', documentSchema);

const validateDocument = (document) => {
  const schema = {
    year: Joi.string().required()
    // ,
    // month: Joi.string().required(),
    // name: Joi.string().required(),
    // SIRET: Joi.string().required(),
    // doc_line: Joi.objectId().required()
  };
  return Joi.validate(document, schema);
};

exports.Document = Document;
exports.validate = validateDocument;
