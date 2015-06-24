var express = require('express');
var router  = express.Router();

router.get('/display_datas', function(req, res) {
    var db = req.db;
    var collection = db.get('original');
    collection.find({},{},function(e,docs){
        res.render('display_datas', {
            "display_datas" : docs
        });
    });
});

module.exports = router;