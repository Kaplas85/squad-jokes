interface Config {
  secret_key: string;
  jwt_expires_in: number;
  notifier_method: string;
}

const config: Config = {
  secret_key: process.env.SECRET_KEY!,
  jwt_expires_in: Number(process.env.JWT_EXPIRES_IN!) || 60,
  notifier_method: process.env.NOTIFIER_METHOD || "email",
};

export default config;
