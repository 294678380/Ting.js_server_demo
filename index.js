const path = require("path");
const express = require("express");
var app = express();
var ting = require("ting.js");
var routes = require("./routes");
var _package = require("./package.json");

	_package.doc.path = path.join(__dirname,_package.doc.path);
//初始化
var ting_fn = function(init){
	init(routes);
}
//生成路由
ting(app,ting_fn,_package);

//监听
app.listen(8090,()=>{
	console.log("ting_server started 8090");
})