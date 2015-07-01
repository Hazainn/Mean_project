var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';


// require de passport
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        var user;
        var mongo = require('mongodb');
        var monk  = require('monk');
        var db    = monk('localhost:27017/database');
        var collection = db.get("users");

        user = collection.findOne({"email" : username, "password" : password}, {"email" : 1}, function (err, user) {
            done(err, user);
        });
        done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/', 
    passport.authenticate('local',
        {
            successRedirect: '/users',
            failureRedirect: '/',
            failureFlash: true
        }
    )
);

module.exports = app;
