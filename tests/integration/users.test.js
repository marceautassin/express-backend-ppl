const request = require('supertest');
const {
  User
} = require('../../models/user');
const mongoose = require('mongoose');


describe('POST /', () => {
  let server;
  let name;
  let userTest;

  const exec = () => {
    return request(server)
      .post('/api/users')
      .send({
        name: name,
        email: '1234@gmail.com',
        password: '1234567'
      });
  };

  beforeEach(() => {
    server = require('../../index');
    name = '12345';
  });

  afterEach(async () => {
    await User.remove({});
    await server.close();
  });


  it('should return 400 if the user is already regsitered', async () => {

    userTest = new User({
      name: "12345",
      email: '1234@gmail.com',
      password: '1234567'
    });
    await userTest.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if one of the field is missing', async () => {
    name = '';

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 400 if one of the field is wrong', async () => {
    name = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should save the user if it is valid', async () => {
    await exec();

    const user = await User.find({
      name: '12345'
    });

    expect(user).not.toBeNull();
  });

  it('should return the user if it is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('name', '12345');
  });
});
