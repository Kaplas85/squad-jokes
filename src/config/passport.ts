import { addExternalUser } from "@/services/externalUsers";
import passport from "passport";
import type { VerifyFunction } from "passport-google-oauth";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:8000/oauth/external/google/redirect",
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: VerifyFunction
    ) => {
      const name = profile.displayName;
      const email = profile.emails[0].value;
      const user = addExternalUser({ name, email, profile });
      cb(null, user);
    }
  )
);

export default passport;
