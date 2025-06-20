const authRouter = require("express").Router();
const {
  signIn,
  authMiddleware,
  externalSignIn,
} = require("../controllers/auth");
const passport = require("../config/passport");

authRouter.post("/auth/login", signIn);

authRouter.get("/api/usuario", authMiddleware("user"), (req, res) =>
  res.json({ message: `Hola, ${req.user.name}!`, user: req.user })
);

authRouter.get("/api/admin", authMiddleware("admin"), (req, res) =>
  res.json({ message: `Hola admin, ${req.user.name}!`, user: req.user })
);

authRouter.get("/oauth/external/google", passport.authenticate("google"));

authRouter.get(
  "/oauth/external/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    session: false,
  }),
  async (req, res) => {
    const searchParams = new URLSearchParams({
      profile: req.user.federated.profile,
    });

    res.redirect("/auth/external/callback" + "?" + searchParams.toString());
  }
);

authRouter.get("/auth/external/callback", externalSignIn);

module.exports = authRouter;
