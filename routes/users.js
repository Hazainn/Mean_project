var express = require('express');
var router  = express.Router();
var title   = 'Blog Jahwess';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource'); 
});

/* Affiche la liste des users */
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection("userlist").find().toArray(function (err, items) {
        res.json(items);
    });
});

router.get('/inscription', function(req, res, next) {
	res.render('inscription', { title: title });
});

module.exports = router;
