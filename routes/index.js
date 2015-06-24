var express = require('express');
var router  = express.Router();
var title   = 'Blog Jahwes';

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: title });
});

router.get('/login', function(req, res) {
  res.render('login');
});

module.exports = router;
