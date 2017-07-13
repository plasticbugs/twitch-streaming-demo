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
    console.log(profile);
    return done(null, profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  })
);

module.exports = passport;