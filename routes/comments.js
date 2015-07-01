var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

app.route('/')
	.get(function(req, res) {
		var db         = req.db;
		var collection = db.get('articles');

		collection.find({}, {"comment" : 1}, function(e,docs) {
			res.json(docs);
		});
	});

app.route('/comment/:id')
	.delete(function(req, res) {
		var db         = req.db;
		var collection = db.get("articles");

		collection.remove({"_id" : req.params.id}, {$unset : req.body}, function(err) {
			res.send((null === err) ? { msg: "" } : { msg: err });
		});
	})
	.put(function(req, res) {
		var db         = req.db;
		var collection = db.get("articles");
		console.log(req.body);
		collection.update({"_id" : req.params.id}, {$set : req.body}, function(err, result) {
			res.send((null === err) ? { msg: "" } : { msg: err });
		});
	});

app.route('/article/:id_art/comment/:id_com')
	.get(function(req, res) {
		var db         = req.db;
		var collection = db.get('articles');
		console.log(req.params.id);
		collection.find({"_id" : req.params.id_art, "comment.id" : req.params.id_com}, {"comment" : 1}, function(e,docs) {
			res.json(docs);
		});
	});

module.exports = app;