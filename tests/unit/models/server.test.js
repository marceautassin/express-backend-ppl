const server = require('../../../index');
const config = require('config');

describe('server', () => {
  it('Server should run on the current port', async () => {
    expect(server.address().port).toEqual(config.get('port'));
  });
});
