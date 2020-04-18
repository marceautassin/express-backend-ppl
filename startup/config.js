const config = require('config');

module.exports = function () {
  if (!config.get('jwtPrivateKey')) { //export vidly_jwtPrivateKey=secretkeyaconfigurer dans le terminal
    throw new Error('FATAL ERROR jwtPrivateKey is not defined.');
  }
};
