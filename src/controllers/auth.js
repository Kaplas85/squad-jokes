const jwt = require("jsonwebtoken");
const { login } = require("../services/auth");
const config = require("../config");
const { getExternalUser } = require("../services/externalUsers");

function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  const token = login(email, password);

  if (token.result !== "success") {
    return res.status(401).json({ error: token.result });
  }

  res.json({ token });
}

function externalSignIn(req, res) {
  const { profile } = req.query;

  if (!profile) {
    return res.status(400).json({ error: "profile required" });
  }

  const token = getExternalUser(profile);

  if (!token) {
    return res.status(404).json({ error: "user not found" });
  }

  res.json({ token });
}

function authMiddleware(requiredRole) {
  return (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "token required" });
    }
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.secret_key);
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: "invalid token" });
    }
  };
}

module.exports = { signIn, authMiddleware, externalSignIn };
