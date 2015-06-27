var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

app.route('/')
	.get(function(req, res) {
		var db         = req.db;
		var collection = db.get('users');

		collection.find({}, {}, function(e,docs) {
			res.json(docs);
		});
	})

app.route('/user')
	.post(function(req, res) {
		var db         = req.db;
		var collection = db.get('users');
		console.log(req.body);
		collection.insert(req.body, function(err, result) {
			res.send((null === err) ? { msg: '' } : { msg: err });
		});
	})

app.route('/user/:email')
	.get(function(req, res) {
		var db         = req.db;
		var collection = db.get('users');

		collection.find({"email" : req.params.email}, {}, function(e,docs) {
			res.json(docs);
		});
	})
	.delete(function(req, res) {
		var db         = req.db;
		var collection = db.get('users');
		collection.remove({'email' : req.params.email}, function(err) {
			res.send((null === err) ? { msg: '' } : { msg: err });
		});
	})
	.put(function(req, res) {
		var db         = req.db;
		var collection = db.get('users');
		collection.update({'email' : req.params.email}, {$set : req.body}, function(err, result) {
			res.send((null === err) ? { msg: '' } : { msg: err });
		});
	});

app.get('/subscribe', function(req, res, next) {
	res.render('subscribe', { title: title });
});

module.exports = app;
