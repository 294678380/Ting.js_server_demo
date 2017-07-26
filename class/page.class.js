class Page{
	getPage(req,res,next){
		/*
			配置中的ver验证，如果失败会将失败信息挂在req._typeError中 判断它
		*/
		if(req._typeError){
			res.send(req._typeError.msg);
			return next();
		}
		res.send("hello page");
	}
}
module.exports = Page;