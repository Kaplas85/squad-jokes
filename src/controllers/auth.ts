import config from "@/config";
import { LocalUser, Role } from "@/types/auth";
import { login } from "@services/auth";
import { getExternalUser } from "@services/externalUsers";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "email and password required" });
    return;
  }

  const token = login(email, password);

  if (token.result !== "success") {
    res.status(401).json({ error: token.result });
    return;
  }

  res.json({ token });
}

function externalSignIn(req: Request, res: Response) {
  const { profile } = req.query;

  if (!profile) {
    res.status(400).json({ error: "profile required" });
    return;
  }

  const token = getExternalUser(profile as string);

  if (!token) {
    res.status(404).json({ error: "user not found" });
    return;
  }

  res.json({ token });
}

function authMiddleware(requiredRole: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      res.status(401).json({ error: "token required" });
      return;
    }
    const token = auth.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.secret_key) as LocalUser;
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        res.status(403).json({ error: "Access denied" });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({ error: "invalid token" });
    }
  };
}

export { authMiddleware, externalSignIn, signIn };
