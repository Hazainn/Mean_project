var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});

/* Affiche la liste des users */
app.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection("user").find().toArray(function (err, items) {
        res.json(items);
    });
});

app.get('/subscribe', function(req, res, next) {
	res.render('subscribe', { title: title });
});

module.exports = app;
