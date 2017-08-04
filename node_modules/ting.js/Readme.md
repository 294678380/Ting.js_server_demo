ting.js for 1.1.16 基于express的server工程化组件
==============================
<a href="https://travis-ci.org/294678380/Ting.js"><img src="https://api.travis-ci.org/294678380/Ting.js.svg?branch=master" alt="" data-canonical-src="https://api.travis-ci.org/294678380/Ting.js.svg?branch=master" style="max-width:100%;"></a>
<h2>你可以用它，工程化你的express项目。使项目变得更可靠</h2>
<p>
	nodejs版本：
	node >= 6.10.0
</p>
<div>
	<p>访问主页</p>
	<a href="http://www.tingjs.top" target="_blank">
		<img width="100%" src="http://images.cnblogs.com/cnblogs_com/ztfjs/841508/o__2_JI@[S0Z6@[%7DNHNVPTHAV.png" alt="ting.js"/>
	</a>
</div>

<div class="ta-right">
<div><div id="jianshu" class="ta-title"><!-- react-text: 293 -->Ting.js简述<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></div><div class="ta-content"><div><!-- react-text: 297 -->Ting.js是一款基于express的server工程化组件，它的主要作用，在于简化express的较繁杂router操作，使nodejs的server端API变得更加友好。附加功能可以实时生成路由文档，使api请求一目了然，简洁代码的同时保持了express可扩展性能。<!-- /react-text --><br></div><div><h2 id="jianshu三大特性" style="color: rgb(255, 144, 0);">三大特性</h2><div class="ta-content-path"><h3 id="jianshu三大特性0"><!-- react-text: 303 -->1.简化express的路由<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 307 --><!-- /react-text --><br></span></p><div></div></div><div class="ta-content-path"><h3 id="jianshu三大特性1"><!-- react-text: 312 -->2.使用es6的class语法接受请求，使工程更易于移植<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 316 --><!-- /react-text --><br></span></p><div></div></div><div class="ta-content-path"><h3 id="jianshu三大特性2"><!-- react-text: 321 -->3.配置即文档，根据package的版本生成文档<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 325 --><!-- /react-text --><br></span></p><div></div></div></div></div></div><div><div id="jiaocheng" class="ta-title"><!-- react-text: 330 -->使用教程<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></div><div class="ta-content"><div><!-- react-text: 334 --><!-- /react-text --><br></div><div><h2 id="jiaocheng步骤" style="color: rgb(255, 144, 0);">步骤</h2><div class="ta-content-path"><h3 id="jiaocheng步骤0"><!-- react-text: 340 -->开始之前<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 344 -->在一切开始之前，你需要具备express知识,另外，需要生成一份package.json。<!-- /react-text --><br></span><span><!-- react-text: 347 -->准备就绪后,就开始吧！<!-- /react-text --><br></span></p><div></div></div><div class="ta-content-path"><h3 id="jiaocheng步骤1"><!-- react-text: 352 -->
Step 1:　下载express<!-- /react-text -->
<span style="color: rgb(255, 144, 0);"></span></h3><p><span>
<!-- react-text: 356 -->你需要先下载express:<!-- /react-text --><br></span><span><!-- react-text: 359 -->项目目录打开命令行运行 npm install express --save<!-- /react-text --><br></span>
<span><!-- react-text: 362 --><!-- /react-text --><br></span></p><div></div></div><div class="ta-content-path"><h3 id="jiaocheng步骤2"><!-- react-text: 367 -->Step 2:　下载ting.js<!-- /react-text -->
<span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 371 -->你需要先下载express:<!-- /react-text --><br></span><span><!-- react-text: 374 -->项目目录打开命令行运行 npm install ting.js --save<!-- /react-text --><br></span><span><!-- react-text: 377 --><!-- /react-text --><br></span></p><div></div></div><div class="ta-content-path"><h3 id="jiaocheng步骤3"><!-- react-text: 382 -->
Step 3:　创建index.js<!-- /react-text -->
<span style="color: rgb(255, 144, 0);"></span></h3><p>
<span><!-- react-text: 386 -->入口文件<!-- /react-text --><br></span></p>
<div class="code_view">
<pre class=" line-numbers language-javascript">
<code id="codeview_3" class=" language-javascript">
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
			//doc路径
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
		});
</code>
</pre>
</div></div>
<div class="ta-content-path"><h3 id="jiaocheng步骤4"><!-- react-text: 393 -->Step 4:　创建routes.js<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 397 -->配置routes规则<!-- /react-text --><br></span></p><div class="code_view">

<pre class=" line-numbers language-javascript">
<code id="codeview_4" class=" language-javascript">
	//处理类
	var Home = require("./home.class");
	//定义规则
	module.exports = [
			{
				brie:"首页",
				desc:"这是首页的整体说明",
				path:"/",
				class:Home
			}
	]

</code>
</pre>

</div></div><div class="ta-content-path"><h3 id="jiaocheng步骤5"><!-- react-text: 404 -->Step 5:　创建home.class.js<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 408 -->替代复杂的router，使用类文件作为请求入口<!-- /react-text --><br></span></p><div class="code_view">
<pre class=" line-numbers language-javascript">
<code id="codeview_5" class=" language-javascript">
const rules = {   //对象
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
	main(){
	}
	getHome(req,res,next){
		res.send("hello world");
	}
}
Home.rules = rules;
module.exports = Home;
</code>
</pre>
</div></div>
<div class="ta-content-path">
<h3 id="jiaocheng步骤6"><!-- react-text: 415 -->Step 6:　运行测试<!-- /react-text --><span style="color: rgb(255, 144, 0);"></span></h3><p><span><!-- react-text: 419 -->项目目录打开命令行运行<!-- /react-text --><br></span><span><!-- react-text: 422 -->node index<!-- /react-text --><br></span><span><!-- react-text: 425 -->访问localhost:8090<!-- /react-text --><br></span><span><!-- react-text: 428 -->你可以看到类Home调用了getHome，顺利返回hello world<!-- /react-text --><br></span></p><div></div></div></div></div></div><div>

</div>



