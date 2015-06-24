var express = require('express');
var app     = express();
var title   = 'Blog Jahwes';

/* GET articles listing. */
app.get('/articlelist', function(req, res) {
	var db = req.db;
	var collection = db.get('articles');
	collection.find({}, {}, function(e,docs)
		{
			res.json(docs);
		});
});

app.post('/add_article', function(req, res) {
	var db = req.db;
	var collection = db.get('articles');

	collection.insert(req.body, function(err, result)
		{
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
});

app.delete('/delete_article/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('articles');
	var user_id = req.params.id;

	collection.remove({ '_id' : user_id }, function(err)
		{
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
});

app.put('/update_article/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('articles');

	collection.update(req.params.id, {$set : req.body}, function(err, result)
		{
			res.send((err == null) ? { msg: '' } : { msg: err });
		});
});

module.exports = app;
