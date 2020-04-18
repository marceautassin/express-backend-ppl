const request = require('supertest');
const {
  Document
} = require('../../models/document');
const mongoose = require('mongoose');

describe('GET /api/documents', () => {
  let document;
  let server;
  let documentId;

  beforeEach(async () => {
    server = require('../../index');
    documentId = mongoose.Types.ObjectId();

    document = new Document({
      _id: documentId,
      year: '12345',
      month: '12345',
      name: '12345',
      SIRET: '12345',
      // doc_line: {
      //   salaire_brut: 12345,
      //   salaire_net_paye: 12345,
      //   impot_revenu: 12345,
      //   conge_n_1: 12345,
      //   conge_n: 12345,
      //   rtt: 12345
      // }
    });
    await document.save();
  });

  afterEach(async () => {
    await server.close();
    await Document.remove({});
  });


  it('should return a 200', async () => {

    const document = {
      year: '12345',
      month: '12345',
      name: '12345',
      SIRET: '12345'
    }

    await Document.collection.insertOne(document);

    const res = await request(server).get('/api/documents');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('year');
    // expect(res.body.some(g => g.name === '12345')).toBeTruthy();
    // expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
  });
});
