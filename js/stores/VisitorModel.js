var mongoose = require('mongoose');

var visitorSchema = new mongoose.Schema({
  visitorId: { type: String, unique: true, index: true },
  name: String,
  gender: String,
  yearofbirth: String,
  monthofbirth: String,
  mobile: { type: Number, default: 0 },
  wechat: String,
  recommandgroud: { type: Number, default: 0 },
  isingroup: { type: Boolean, default: 0 },
  prayers: String
});

module.exports = mongoose.model('Visitor', visitorSchema);