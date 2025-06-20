const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { addExternalUser } = require("../services/externalUsers");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/oauth/external/google/redirect",
      scope: ["profile", "email"],
    },
    function verify(accessToken, refreshToken, profile, cb) {
      const name = profile.displayName;
      const email = profile.emails[0].value;
      const user = addExternalUser({ name, email, profile });
      cb(null, user);
    }
  )
);

module.exports = passport;
