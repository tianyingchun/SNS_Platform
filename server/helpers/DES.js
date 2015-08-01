var crypto = require('crypto');

var _encryptDES = function (cryptkey, iv, cleardata) {
  var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
    encoded = encipher.update(cleardata, 'utf8', 'base64');
  encoded += encipher.final('base64');
  return encoded;
};
var _decryptDES = function (cryptkey, iv, secretdata) {
  var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
    decoded = decipher.update(secretdata, 'base64', 'utf8');

  decoded += decipher.final('utf8');
  return decoded;
};

module.exports = {
  encryptDES: function (data, secret) {
    var cryptkey = crypto.createHash('sha256').update(secret).digest();
    return _encryptDES(cryptkey, "1234567890000000", data);
  },
  decryptDES: function (data, secret) {
    var cryptkey = crypto.createHash('sha256').update(secret).digest();

    return _decryptDES(cryptkey, '1234567890000000', data);
  }
};
