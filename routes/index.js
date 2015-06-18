var express = require('express');
var router  = express.Router();
var title   = 'Blog Jahwess';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: title });
});

router.get('/inscription', function(req, res, next) {
  res.render('inscription', { title: title });
});

module.exports = router;
