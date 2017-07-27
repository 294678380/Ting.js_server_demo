/**
	类方法接口
*/
var toString = Object.prototype.toString;
var inter = exports = module.exports = {

}
/**
	验证请求对象上的object参数的正确性
	@param parentObj {Object} 父级对象
	@param rule {Object} 验证规则对象
*/
inter.ver = function(parentObj,rule,obj_name,parentName){
	let _err = {
		fieldName:"",
		msg:""
	}
	let proto = parentObj[obj_name];
	!parentName?parentName="":parentName;
	for(name in rule){
		//不存在
		if(!proto[name]){
			_err.fieldName = parentName+"."+obj_name+"."+name;
			_err.msg = _err.fieldName+" is undefined";
			return parentObj._typeError = _err;
		}
		//设置的正则验证
		if(toString.call(rule[name]) === "[object RegExp]"){
			let rex = rule[name];
			let ed = rex.test(proto[name]);
				if(!ed){
					_err.fieldName = "req."+obj_name+"."+name;
					_err.msg = _err.fieldName+" Validation failure";
					return parentObj._typeError = _err;
				}
		}
		//设置的函数验证 直接返回处理的结果
		if(toString.call(rule[name]) === "[object Function]"){
			let val = rule[name].call(parentObj,proto[name],proto);
			if(val != true){

				if(val === false){
					return parentObj._typeError = true;
				}else{
					return parentObj._typeError = val;
				}
				
			}
		}

	}

	return parentObj._typeError = undefined;
}
/**
	验证params的正确性
	@param req {Object} request请求对象
	@param params {Object} params规则
*/
inter.params = function(req,rule){
	return inter.ver(req,rule,"params","req");
	
}
/**
	验证query的正确性
	@param req {Object} request请求对象
	@param params {Object} query规则
*/
inter.query = function(req,rule){
	return inter.ver(req,rule,"query","req");
	
}
/**
	获取对象的名称
	@param parentObj {Object} 父级对象
	@param obj {Object} 对象本身
	@return {String} 返回对象名称

function getObjectName(parentObj,obj){
	let obj_name = null;
		for(name in parentObj){
			if(parentObj[name] == obj){
				return name;
			}
		}
	return obj_name;
}
*/