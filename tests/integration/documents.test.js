const request = require('supertest');
const {
  Document
} = require('../../models/document');
const {
  User
} = require('../../models/user');
const mongoose = require('mongoose');

describe('GET /api/documents', () => {
  let document;
  let server;

  beforeEach(async () => {
    server = require('../../index');

    document = new Document({
      _id: mongoose.Types.ObjectId(),
      year: '12345',
      month: '12345',
      name: '12345',
      SIRET: '12345',
      salaire_brut: 12345,
      salaire_net_paye: 12345,
      impot_revenu: 12345,
      conge_n_1: 12345,
      conge_n: 12345,
      rtt: 12345
    });
    await document.save();

    document2 = new Document({
      _id: mongoose.Types.ObjectId(),
      year: '12345',
      month: '12345',
      name: '12345',
      SIRET: '12345',
      salaire_brut: 12345,
      salaire_net_paye: 12345,
      impot_revenu: 12345,
      conge_n_1: 12345,
      conge_n: 12345,
      rtt: 12345
    });
    await document2.save();
  });


  afterEach(async () => {
    await Document.remove({});
    await server.close();
  });


  it('should return all documents', async () => {
    const res = await request(server).get('/api/documents');

    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('name', "12345");
    expect(res.body[0]).toHaveProperty('salaire_brut', 12345);
    expect(res.body.length).toBe(2);

  });
});

describe('GET /api/documents/:id', () => {
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
      salaire_brut: 12345,
      salaire_net_paye: 12345,
      impot_revenu: 12345,
      conge_n_1: 12345,
      conge_n: 12345,
      rtt: 12345
    });
    await document.save();
  });


  afterEach(async () => {
    await Document.remove({});
    await server.close();
  });


  it('should return a document if valid id is passed', async () => {
    const res = await request(server).get('/api/documents/' + document._id);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', "12345");
    expect(res.body).toHaveProperty('salaire_brut', 12345);
  });
  it('should return 404 if invalid id is passed', async () => {

    const res = await request(server).get('/api/documents/1');

    expect(res.status).toBe(404);
  });
  it('should return 404 if no document with the given id', async () => {
    const id = mongoose.Types.ObjectId();
    const res = await request(server).get('/api/documents/' + id);

    expect(res.status).toBe(404);
  });
});

describe('POST /', () => {
  let server;
  let token;
  let year;

  const exec = () => {
    return request(server)
      .post('/api/documents')
      .set('x-auth-token', token)
      .send({
        name: 'document',
        year: year,
        month: "april",
        SIRET: "12345",
        salaire_brut: 1,
        salaire_net_paye: 1,
        impot_revenu: 1,
        conge_n_1: 1,
        conge_n: 1,
        rtt: 1
      });
  };

  beforeEach(() => {
    server = require('../../index');
    token = new User().generateAuthToken();
    year = "2020";
  });

  afterEach(async () => {
    await Document.remove({});
    await server.close();
  });


  it('should return 401 if client is not logged in', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if one of the field is missing', async () => {
    year = '';

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it('should return 400 if one of the field is wrong', async () => {
    year = 2020;

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should save the document if it is valid', async () => {
    await exec();

    const document = await Document.find({
      name: 'document'
    });

    expect(document).not.toBeNull();
  });

  it('should return the document if it is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'document');
  });
});

describe('PUT /:id', () => {
  let server;
  let token;
  let year;
  let id;
  let newName;
  let doc;

  const exec = () => {
    return request(server)
      .put('/api/documents/' + id)
      .set('x-auth-token', token)
      .send({
        name: newName,
        year: year,
        month: '12345',
        SIRET: '12345',
        salaire_brut: 12345,
        salaire_net_paye: 12345,
        impot_revenu: 12345,
        conge_n_1: 12345,
        conge_n: 12345,
        rtt: 12345
      });
  };

  beforeEach(async () => {
    server = require('../../index');
    token = new User().generateAuthToken();
    year = "2020";

    doc = new Document({
      year: year,
      month: '12345',
      name: '12345',
      SIRET: '12345',
      salaire_brut: 12345,
      salaire_net_paye: 12345,
      impot_revenu: 12345,
      conge_n_1: 12345,
      conge_n: 12345,
      rtt: 12345
    });
    await doc.save();

    id = doc._id;
    newName = "updatedDocument";
  });

  afterEach(async () => {
    await Document.remove({});
    await server.close();
  });


  it('should return 401 if client is not logged in', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if one of the field is missing', async () => {
    year = '';

    const res = await exec();

    expect(res.status).toBe(400);
  });
  it('should return 400 if one of the field is wrong', async () => {
    year = 2020;

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 404 if invalid id is passed', async () => {
    id = 1;

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 404 if no document with the given id', async () => {
    id = mongoose.Types.ObjectId();
    const res = await exec();

    expect(res.status).toBe(404);
  });

  it('should update the document if input is valid', async () => {
    await exec();

    const updatedDocument = await Document.findById(id);

    expect(updatedDocument.name).toBe(newName);
  });

  it('should return the document if it is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', 'updatedDocument');
  });
});

describe('DELETE /:id', () => {
  let server;
  let token;
  let id;
  let doc;

  const exec = () => {
    return request(server)
      .delete('/api/documents/' + id)
      .set('x-auth-token', token)
      .send();
  };

  beforeEach(async () => {
    server = require('../../index');
    token = new User().generateAuthToken();

    doc = new Document({
      year: '2020',
      month: '12345',
      name: '12345',
      SIRET: '12345',
      salaire_brut: 12345,
      salaire_net_paye: 12345,
      impot_revenu: 12345,
      conge_n_1: 12345,
      conge_n: 12345,
      rtt: 12345
    });
    await doc.save();

    id = doc._id;
  });

  afterEach(async () => {
    await Document.remove({});
    await server.close();
  });


  it('should return 401 if client is not logged in', async () => {
    token = '';

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 404 if invalid id is passed', async () => {
    id = 1;

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it('should return 404 if no document with the given id', async () => {
    id = mongoose.Types.ObjectId();
    const res = await exec();

    expect(res.status).toBe(404);
  });

  it('should delete the document if input is valid', async () => {
    await exec();

    const documentInDb = await Document.findById(id);

    expect(documentInDb).toBeNull();
  });

  it('should return the document if it is valid', async () => {
    const res = await exec();

    expect(res.body).toHaveProperty('_id', id.toHexString());
    expect(res.body).toHaveProperty('name', doc.name);
  });
});
