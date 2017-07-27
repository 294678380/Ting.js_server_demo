const path = require("path");
//引入express
const express = require("express");
//express_app
var app = express();
var ting = require("ting.js");
//定义routes
var routes = require("./routes");
//引入_package
var _package = require("./package.json");

	_package.doc.path = path.join(__dirname,_package.doc.path);
	_package.doc.addFiles = {
		test:function(doc,opt){
			//返回doc对象
			console.log(doc);
			
		}
	}
//初始化
var ting_fn = function(init){
	init(routes);
}
//生成路由
ting(app,ting_fn,_package);

//监听
app.listen(8090,()=>{
	console.log("ting_server started 8090");
});