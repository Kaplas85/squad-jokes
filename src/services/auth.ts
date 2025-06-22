import config from "@/config";
import users from "@/mock/users.json";
import { ExternalUser, LocalUser } from "@/types/auth";
import { verifyPassword } from "@/utils/hash";
import jwt from "jsonwebtoken";

function generateToken(user: ExternalUser | LocalUser) {
  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.secret_key, {
    expiresIn: config.jwt_expires_in,
  });
}

function login(email: string, password: string) {
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

  const token = generateToken(user as LocalUser);

  return {
    result: "success",
    token: token,
  };
}

export { generateToken, login };
