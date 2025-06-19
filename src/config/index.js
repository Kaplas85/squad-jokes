const config = {};

config.secret_key = process.env.SECRET_KEY;
config.jwt_expires_in = process.env.JWT_EXPIRES_IN || "1h";

module.exports = config;
