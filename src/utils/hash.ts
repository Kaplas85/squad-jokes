import crypto from "crypto";

function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

function verifyPassword(password: string, hashedPassword: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex") === hashedPassword;
}

export { hashPassword, verifyPassword };
