var crypto = require("crypto");

module.exports = {
  create(password){
    let sha512 = crypto.createHash('sha512');
    sha512.update(password);
    return sha512.digest('hex');
  }
}
