var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Visitor = require('./stores/VisitorModel');
var objectAssign = require('object-assign');

var app = express();


var database = process.env.MONGO_URI || 'localhost';

mongoose.connect(database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../')));


/**
 * POST /api/characters
 * Adds new character to the database.
 */
app.post('/api/addvisitor', function(req, res, next) {

	var visitor = new Visitor({
		visitorId: req.body.visitorId,
    name: req.body.name,
    gender: req.body.gender,
    yearofbirth: req.body.yearofbirth,
    monthofbirth: req.body.monthofbirth,
    mobile: req.body.mobile,
    wechat: req.body.wechat,
    recommandgroup: req.body.recommandgroup,
    isingroup: req.body.isingroup,
    prayers: req.body.prayers
    });

  

  var respMessage = {status:0};

  visitor.save(function(err) {
  	if (err) return next(err);
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify(respMessage));
        res.end();
      });
});


app.get('/api/delete/:id', function(req,res,next){
  //var query = Visitor.find({"visitorId":req.params.id}).remove();
  var query = Visitor.find({"visitorId":req.params.id});
  console.log(req.params);
  query.exec(function(err,doc){
    //if(err) return next(err);
    var respMessage = {"id":req.params.id};
    res.setHeader('content-type', 'application/json');
    res.json(respMessage);
    res.end();
    });
});

/**
 * POST /api/characters
 * Adds new character to the database.
 */
app.get('/api/visitors', function(req, res, next) {
  var query = Visitor.find({}).select('visitorId name mobile followups -_id');
  query.exec(function(err,doc){
    if(err) return next(err);
    res.setHeader('content-type', 'application/json');
    res.json(doc);
    res.end();
    });
});

/**
 * POST /api/characters
 * Adds new character to the database.
 */
app.post('/api/addfollowup', function(req, res, next) {
  var query = '{visitorId:' + req.body.visitorId + '}';
  console.log(query);
  Visitor.update(query,{$addToSet: {"followups": {"followup": req.body.followup}}}, function(err,doc){
    if(err) return next(err);
    res.setHeader('content-type', 'application/json');
    res.json(doc);
    res.end();
    });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});