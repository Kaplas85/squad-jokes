const crypto = require("crypto");

function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

function verifyPassword(password, hashedPassword) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex") === hashedPassword;
}

module.exports = {
  verifyPassword,
  hashPassword,
};
