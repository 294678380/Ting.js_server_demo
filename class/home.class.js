class Home{
	main(){
		/**
			main函数是每个类的入口函数，它会在启动加载类时执行
		*/
	}
	getHome(req,res,next){
		res.send("hello world");
	}
}
module.exports = Home;