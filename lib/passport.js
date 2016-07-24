const LocalStrategy = require("passport-local").Strategy;
const md5 = require("md5");
const passport = require("passport");

passport.use("local", new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        if (username === "admin" && md5(password) === "a99e2bc0efaa6c17888f2946aedc6be8")
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, {
        id
    });
});

module.exports = passport;
