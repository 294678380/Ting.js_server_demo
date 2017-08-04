/*
	配置规则
*/
const rules = {
	get:[
		{
			brie:"这是首页的get访问方法",
			desc:"返回了hello world",
			path:"/",
			Examination:true,	//开启代码视图
			controller:["getHome"]
		}
	]
}
class Home{
	getHome(req,res,next){
		res.send("hello world");
	}
}

Home.rules = rules;
module.exports = Home;