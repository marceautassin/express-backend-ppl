const Joi = require('joi');
const mongoose = require('mongoose');

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
})
