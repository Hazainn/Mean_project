var express = require('express');
var router  = express.Router();

/* GET articles listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); //afficher tous les articles cette route sera appelée par la div de l'index
});

module.exports = router;