var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

// require de passport
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function() {
    var db   = req.db;
    var user = db.get("users");

    console.log("coucou");
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/', 
    function(req, res) {
        passport.authenticate('local'),
        function(req, res) {
            console.log("coucou je suis ici")
            res.redirect('/users/user/' + req.body.email);
        }
    }
);

module.exports = app;
