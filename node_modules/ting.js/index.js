var proto = require("./lib/ting");
var mixin = require('merge-descriptors');

exports = module.exports = function(app,routes,opt){
	var ting = function(){
		return ting.init(app,routes,opt);
	}
	mixin(ting, proto, false);

	return new ting();
}