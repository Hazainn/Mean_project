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
passport.use(new LocalStrategy(function(email, password, done) {
  process.nextTick(function() {
    // Auth Check Logic
  });
}));

app.get('/', function(req, res) {
  res.sendfile('views/login.html');
});

app.post('/', passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    })
);
 
app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

module.exports = app;
