var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

// require de passport
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(email, password, done) {
    var db = req.db;
    var User = db.get("users");

    User.findOne({}, {email: email}, function(err, user) {
        console.log("coucou");
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/', function(req, res) {
        res.redirect('/users/')
        console.log(req.params.email);
    }
);

module.exports = app;
