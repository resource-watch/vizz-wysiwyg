const passport = require('passport');
const passportLocal = require('passport-local');
const request = require('superagent');

const Strategy = passportLocal.Strategy;

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = () => {
  const strategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    request
      .post(`${process.env.KENYA_API}/auth`)
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err, null, 'User unathorized');
        } else {
          const user = Object.assign({}, res.body);
          done(null, user, 'User authenticated correctly');
        }
      });
  });
  passport.use(strategy);
  return {
    authenticate: () => passport.authenticate('local', { failureRedirect: '/login' })
  };
};
