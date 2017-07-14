const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOAUTH_CLIENT_ID,
  clientSecret: process.env.GOAUTH_CLIENT_SECRET,
  callbackURL: process.env.GOAUTH_CALLBACK_URL
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  })
);

module.exports = passport;