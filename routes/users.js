var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

<<<<<<< HEAD
/* GET users listing. */
app.get('/', function(req, res, next) {
=======
/* GET users listing.
router.get('/', function(req, res, next) {
>>>>>>> ajout et suppressions
  res.send('respond with a resource'); 
});*/

/* Affiche la liste des users
router.get('/userlist', function(req, res) {
	var db = req.db;
	db.collection("original").find().toArray(function (err, items) {
		res.json(items);
	});
});*/

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('original');

	collection.find({}, {}, function(e,docs)
		{
			res.json(docs);
		});
});

router.post('/add_user', function(req, res) {
	var db = req.db;
	var collection = db.get('original');

	collection.insert(req.body, function(err, result)
		{
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
});

router.delete('/delete_user/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('original');
	var user_id = req.params.id;

	collection.remove({ '_id' : user_id }, function(err)
		{
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
});

router.put('/update_user/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('original');

	collection.update(req.params.id, {$set : req.body}, function(err, result)
		{
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
});

app.get('/subscribe', function(req, res, next) {
	res.render('subscribe', { title: title });
});

module.exports = app;
