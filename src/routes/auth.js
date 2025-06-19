const authRouter = require("express").Router();
const { signIn, authMiddleware } = require("../controllers/auth");

authRouter.post("/auth/login", signIn);

authRouter.get("/api/usuario", authMiddleware("user"), (req, res) =>
  res.json({ message: `Hola, ${req.user.name}!`, user: req.user })
);

authRouter.get("/api/admin", authMiddleware("admin"), (req, res) =>
  res.json({ message: `Hola admin, ${req.user.name}!`, user: req.user })
);

module.exports = authRouter;
