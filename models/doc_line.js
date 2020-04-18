const Joi = require('joi');
const mongoose = ('mongoose');

// const doclineSchema = new mongoose.Schema({
//   salaire_brut: {
//     type: Number,
//     required: true
//   }
  // ,
  // salaire_net_paye: {
  //   type: Number,
  //   required: true
  // },
  // impot_revenu: {
  //   type: Number,
  //   required: true
  // },
  // conge_n_1: {
  //   type: Number,
  //   required: true
  // },
  // conge_n: {
  //   type: Number,
  //   required: true
  // },
  // rtt: {
  //   type: Number,
  //   required: true
  // }
// });

// const Doc_line = mongoose.model('Doc_line', doclineSchema);

// const validateDocline = (doc_line) => {
//   const schema = {
//       salaire_brut: Joi.number().required(),
//         salaire_net_paye: Joi.number().required(),
//         impot_revenu: Joi.number().required(),
//         conge_n_1: Joi.number().required(),
//         conge_n: Joi.number().required(),
//         rtt: Joi.number().required()
//   };
//   return Joi.validate(doc_line, schema);
// }


// exports.doclineSchema = doclineSchema;
// exports.Doc_line = Doc_line;
// exports.validate = validateDocline;
