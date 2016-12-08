import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../model/user';
import config from '../../config';

//******************
//******************
// LocalStrategy
//******************
//******************

// Options for setting up LocalStrategy.
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email & password, call done with the user.
  // if it is the correct email & password,
  // otherwise, call done with false.
  User.findOne({ email })
      .then(user => {
        // if the email is not in the db...
        if (!user) done(null, false);
        // Compare Passwords - is `password` equal to user.password.
        user.comparePassword(password, (err, isMatch) => {
          if (err) done(err);
          if (!isMatch) done(null, false);

          return done(null, user);
        });
      })
      .catch(err => done(err));
});

//******************
//******************
// JWTStrategy
//******************
//******************

// Setup options for JWT Strategy.
const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy.
const jwtLogin = new JWTStrategy(JwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our db
  // if it does, call 'done' with that other
  // otherwise, call done without a user object.
  User.findById(payload.sub)
      .then(user => {
        if (!user) done(null, false);

        return done(null, user);
      })
      .catch(err => done(err, false));
});

// Tell passport to use this Strategy.
passport.use(jwtLogin);
passport.use(localLogin);
