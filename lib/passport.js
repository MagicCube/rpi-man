const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

passport.use(new BasicStrategy(
  (userName, password, done) => {
      if (userName === "pi" && password === "pipi")
      {
          return done(null, {
              userName: "pi"
          });
      }
      else
      {
          return done(null, false);
      }
  }
));

module.exports = passport;
