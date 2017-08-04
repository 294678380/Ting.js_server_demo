var Home = require("./class/home.class");
var Page = require("./class/page.class");
module.exports = [
		{
			brie:"首页",
			desc:"这是首页的整体说明",
			path:"/",
			class:Home
		},
		{
			brie:"这是page页",
			desc:"这是page页的整体说明",
			path:"/pages",
			class:Page
		}
]