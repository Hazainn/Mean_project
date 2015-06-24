var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

app.route('/article')
	.get(function(req, res) {
		var db = req.db;
		var collection = db.get('articles');

		collection.find({}, {}, function(e,docs) {
			res.json(docs);
		});
	})
	.post(function(req, res) {
		var db = req.db;
		var collection = db.get('articles');

		collection.insert(req.body, function(err, result) {
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
	})
	
app.route('/article/:title')
	.get(function(req, res)) {
		var db = req.db;
		var collection = db.get('articles');

		collection.find({}, {"title" : req.params.title}, function(e,docs) {
			res.json(docs);
		});
	}
	.delete(function(req, res) {
		var db = req.db;
		var collection = db.get('articles');

		collection.remove({'title' : req.params.title}, function(err) {
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
	})
	.put(function(req, res) {
		var db = req.db;
		var collection = db.get('articles');

		collection.update(req.params.title, {$set : req.body}, function(err, result) {
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
	});

module.exports = app;
