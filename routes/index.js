var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: title });
});

router.get('/login', function(req, res) {
  res.render('login');
});

module.exports = router;
