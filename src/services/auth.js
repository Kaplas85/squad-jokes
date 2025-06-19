const jwt = require("jsonwebtoken");
const users = require("./../mock/users.json");
const config = require("./../config");
const { verifyPassword } = require("../utils/hash");

function login(email, password) {
  const user = users.find((u) => u.email === email);

  if (!user) {
    return {
      result: "user not found",
    };
  }

  const isVerified = verifyPassword(password, user.password);

  if (!isVerified) {
    return {
      result: "invalid password",
    };
  }

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.secret_key, {
    expiresIn: config.jwt_expires_in,
  });

  return {
    result: "success",
    token: token,
  };
}

module.exports = {
  login,
};
