var express = require('express');
var router  = express.Router();
var title   = 'Blog Jahwess';

/* GET articles listing. */
router.get('/', function(req, res, next) {
  res.render(); //afficher tous les articles cette route sera appelée par la div de l'index
});

module.exports = router;