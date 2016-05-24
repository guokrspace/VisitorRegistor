var mongoose = require('mongoose');
var Schema = require('mongoose').Schema

var visitorSchema = new mongoose.Schema({
  visitorId: { type: String, unique: true, index: true },
  name: String,
  gender: String,
  yearofbirth: String,
  monthofbirth: String,
  mobile: { type: Number, default: 0 },
  wechat: String,
  recommandgroud: [Schema({type: Number, default: 0})],
  isingroup: { type: Boolean, default: 0 },
  prayers: String,
  followups:[
    Schema({
      followup:String, 
      timestamp:{type:Date,default: Date.now}},
      {_id:false})
    ]
});

module.exports = mongoose.model('Visitor', visitorSchema);