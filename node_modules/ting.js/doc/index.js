var fs = require("fs");
var path = require("path");

var toString = Object.prototype.toString;
var stringify = JSON.stringify;
var html_path = path.join(__dirname,"./template/html/doc.html");
var json_path = path.join(__dirname,"./template/json/doc.json");
var	readOption = {
	encoding:"utf-8",
	flag:"r"
} 
var	writeOption = {
	encoding:"utf-8",
	flag:"w"
} 


var doc = module.exports = {};
	doc.html = function(_doc,opt,test){
		return rwDoc(html_path,opt.version+"_doc.html",_doc,opt.doc,test);
	}
	doc.json = function(_doc,opt,test){
		return rwDoc(json_path,opt.version+"_doc.json",_doc,opt.doc,test);
	}
	/**
		读取本地文件，替换文件中的{{json}}标志，生成文档
		@param readpath {String} 读取文件路径
		@param filename {String} 写入文件名称
		@param _doc {Object} 写入文档对象
		@param opt {Object} 文档配置
	*/
	function rwDoc(readpath,filename,_doc,opt,test){
		let str = stringify(_doc);
		var contentText = fs.readFileSync(readpath,readOption);
		//替换j'son
			contentText = contentText.replace(/\{\{json\}\}/,str);
			//写入文件
			var write_path = opt.path+filename;
			if(!!test){
				return write_path;
			}
			fs.writeFile(write_path,contentText,writeOption,function(err){
				if(err){
					throw err;
				}
			});
		return true;
	}
