const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
const LocalStrategy = require("passport-local").Strategy;

/*
passport.use(new BasicStrategy(
  (userName, password, done) => {
      if (userName === "admin" && password === "pipi")
      {
          return done(null, {
              userName: "admin"
          });
      }
      else
      {
          return done(null, false);
      }
  }
));
*/

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, {
        id
    });
});

passport.use("local", new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        if (username === "admin" && password === "pipi")
        {
            return done(null, {
                id: "admin"
            });
        }
        else
        {
            return done(null, false);
        }
    }
));

module.exports = passport;
