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

var TOKEN_LENGTH = 32;

module.exports = {
  encryptDES: function (data, secret) {
    var cryptkey = crypto.createHash('sha256').update(secret).digest();
    return _encryptDES(cryptkey, "1234567890000000", data);
  },
  decryptDES: function (data, secret) {
    var cryptkey = crypto.createHash('sha256').update(secret).digest();

    return _decryptDES(cryptkey, '1234567890000000', data);
  },
  md5: function (data) {
    var md5 = crypto.createHash('md5');
    md5.update(JSON.stringify(data));
    return md5.digest('hex');
  },
  randomBytes: function () {
    return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
  },
  random: function (min, max) {
    if (arguments.length == 1) {
      max = min;
      min = 0;
    }
    var range = max - min;
    var rand = Math.random();
    return min + Math.round(rand * range);
  }
};
