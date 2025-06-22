import passport from "@/config/passport";
import { authMiddleware, externalSignIn, signIn } from "@/controllers/auth";
import { Request, Response, Router } from "express";

const router = Router();

router.post("/auth/login", signIn);

router.get(
  "/api/usuario",
  authMiddleware("user"),
  (req: Request, res: Response) => {
    res.json({ message: `Hola, ${req.user?.name}!`, user: req.user });
  }
);

router.get(
  "/api/admin",
  authMiddleware("admin"),
  (req: Request, res: Response) => {
    res.json({ message: `Hola admin, ${req.user?.name}!`, user: req.user });
  }
);

router.get("/oauth/external/google", passport.authenticate("google"));

router.get(
  "/oauth/external/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    session: false,
  }),
  async (req, res) => {
    const searchParams = new URLSearchParams({
      profile: req.user?.federated?.profile,
    });

    res.redirect("/auth/external/callback" + "?" + searchParams.toString());
  }
);

router.get("/auth/external/callback", externalSignIn);

export default router;
