const jwt = require("jsonwebtoken");
const externalUsers = [];
const config = require("./../config");
const { generateToken } = require("./auth");

function addExternalUser({ name, email, profile }) {
  let user = externalUsers.find((u) => u.email === email);
  if (!user) {
    user = {
      id: profile.id,
      name,
      email,
      role: "user",
      federated: {
        provider: "google",
        profile: profile.id,
      },
    };
    externalUsers.push(user);
  }
  return user;
}

function getExternalUser(profileId) {
  const user = externalUsers.find((u) => u.federated.profile === profileId);

  if (!user) {
    return null;
  }

  const token = generateToken(user);
  return token;
}

module.exports = { addExternalUser, getExternalUser, externalUsers };
