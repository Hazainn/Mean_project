var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

// require de passport
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//config pour passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


app.post('/', passport.authenticate('local'), function(req, res) {
        res.redirect('/users/')
    }
);

module.exports = app;
