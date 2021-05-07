const authStrategy = require("passport-local").Strategy;
const User = require("../models/users");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    "sign-up",
    new authStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, res, email, password, done) => {
        User.findOne({ email: email }, () => {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, false, console.log("email is already taken"));
          } else {
            let newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err) => {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );

  passport.use(
    "sign-in",
    new authStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, res, email, password, done) => {
        User.findOne({ email: email }, () => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, console.log("dont exists user"));
          }
          if (!user.validatePass(password)) {
            return done(null, false, console.log("Wrong password"));
          }

          return done(null, user);
        });
      }
    )
  );
};
