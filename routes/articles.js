var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

/* GET articles listing. */
app.get('/', function(req, res, next) {
  res.render(); //afficher tous les articles cette route sera appelée par la div de l'index
});

module.exports = app;
