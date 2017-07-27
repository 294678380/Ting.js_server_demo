var Home = require("./class/home.class");
var Page = require("./class/page.class");
module.exports = [
		{
			brie:"首页",
			desc:"这是首页的整体说明",
			path:"/",
			class:Home,
			rules:{
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
		},
		{
			brie:"这是page页",
			desc:"这是page页的整体说明",
			path:"/pages",
			class:Page,
			rules:{
				get:[
					{
						brie:"这是page页get访问方法",
						desc:"必须要传入get查询参数?s=hello",
						path:"/",
						Examination:true,
						controller:["getPage"],
						ver:{
							query:{
								s:/hello/,
								t:function(val,query){

									if(val !== "test"){
										return "参数t的值必须是test";
									}
									return true;
								}
							}
						}
					}
				]
			}
		}
]