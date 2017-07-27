
var ting_class = require("./ting_class");
var toString = Object.prototype.toString;
var doc = require("../doc/");
var proto = exports = module.exports = {};
/**
	入口函数
	@param app{Object} express的app对象，将在proto中挂载
	@param _routes{function} 路由处理将传入proto.use方法设置路由
	@param opt{Object} 文档的初始配置
*/
proto.init = function(app,routes,opt){
	if(!app && toString.call(app) != '[object Function]'){
		proto.error("Incoming correct 'app'");
		return;
	}
	if(!routes && toString.call(routes) != '[object Function]'){
		proto.error("Incoming correct 'routes'");
		return;
	}
	//设置路由
	this._app = app;
	this._routes = routes;
	this._doc = opt;
	this.routes();
	//需要生成文档
	if(!!opt.doc){
		let self = this;
		if(!opt.doc.path){
			self.error("doc.path is undefined");
			return false;
		}
		if(opt.doc.addFiles){
			for(name in opt.doc.addFiles){
				doc[name] = opt.doc.addFiles[name];
			}
			
		}
		if(Array.isArray(opt.doc.files)){
			opt.doc.files.forEach(function(value){
				doc[value](self._doc,opt);
			});
		}

	}
	return this._doc;
}
/*
	这个方法被proto.routes调用，
	@return 返回设置routes的函数调用
*/
proto.use = function(){
	var self = this;
	//这个方法挂载在ting(routes)中 传入了routes对象
	return function(_routes){
		_routes.forEach((value)=>{
			if(typeof(value.brie) != 'string'){
				proto.error("Incoming correct 'brie'");
			}
			if(typeof(value.desc) != 'string'){
				proto.error("Incoming correct 'desc'");
			}
			var path = value.path;
			//处理类

			var router = ting_class.init(value.class,value.rules);
			//处理一级router文档
			self.doc(value);
			//调用express的use
			self._app.use(path,router);
		});
		
		
	}
}
/**
	路由处理,调用传入proto.use()返回的函数设置路由
	this._routes调用的是初始化ting(app,routes,opt)传入的routes函数
*/
proto.routes = function(){
	this._routes(this.use());
}
/**
	集成单个router
	@param router {Object} 传入单个router配置
	@return {Object} 返回单个router的文档信息
*/
proto.doc = function(router){
	
	var doc_obj = {
		"brie":router.brie,
		"desc":router.desc,
		"path":router.path,
		"class":[]
	}
	//处理类的文档信息
	ting_class.doc(doc_obj);

	if(!this._doc.pages){
		this._doc.pages = [];
	}
	this._doc.pages.push(doc_obj);
	return doc_obj;
}
/*
	proto.error

*/
proto.error = function(msg){
	throw new Error(msg);
}