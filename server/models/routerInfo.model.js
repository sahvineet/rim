// load the things we need
var mongoose = require('mongoose');

var routerInfoSchema = mongoose.Schema({
    sid:String
},{ collection: 'router_info' });

module.exports = mongoose.model('RouterInfo', routerInfoSchema);
