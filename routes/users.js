var express = require('express');
var app  = express();
var title   = 'Blog Jahwes';

app.route('/user')
	.get(function(req, res) {
		var db = req.db;
		var collection = db.get('users');

		collection.find({}, {}, function(e,docs) {
			res.json(docs);
		});
	})
	.post(function(req, res) {
		var db = req.db;
		var collection = db.get('users');

		collection.insert(req.body, function(err, result) {
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
	})
	.delete(function(req, res) {
		var db = req.db;
		var collection = db.get('users');

		collection.remove({'_id' : req.params.id}, function(err) {
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
	})
	.put(function(req, res) {
		var db = req.db;
		var collection = db.get('users');

		collection.update({'_id' : req.params.id}, {$set : req.body}, function(err, result) {
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
	});

app.get('/subscribe', function(req, res, next) {
	res.render('subscribe', { title: title });
});

module.exports = app;
