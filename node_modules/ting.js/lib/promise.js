var slice = Array.prototype.slice;
var isFunction = function(fn){
	return Object.prototype.toString.call(fn) === "[object Function]";
}
class Promise{
	constructor(){
		this.queue = [];
	}
	then(resolveHandler){
		var self = this;
		var handler = {};
		if(isFunction(resolveHandler)){
			handler.resolveHandler = resolveHandler;
		}
		
		self.queue.push(handler);
		return self;
	}
	catch(rejectHandler){
		var self = this;
		var handler = {};
		if(isFunction(rejectHandler)){
			handler.rejectHandler = rejectHandler;
		}
		self.queue.push(handler);
		return self;
	}
}
class Deferred{
	constructor(){
		this.promise = new Promise();
	}
	callbacks(){
		var self = this;
		return function(){
			var args = slice.call(arguments,0);
				//根据new Error("错误信息") 捕获异常错误
				if(args[0] instanceof Error){
					self.reject(args[0])
					return;
				}
				self.resolve.apply(self,args);
		}
	}
	resolve(){
		var self = this;
		var _promise = self.promise;
		var args = slice.call(arguments,0);
		var handler;
		while(handler = _promise.queue.shift()){
			if(handler && handler.resolveHandler){
				var pro = handler.resolveHandler.apply(_promise,args);
					if(pro instanceof Promise){
						pro.queue = _promise.queue;
						self.promise = pro;
						return;
					}
			}
		}
	}
	reject(err){
		var self = this;
		var _promise = self.promise;
		var handler;
		while(handler = _promise.queue.shift()){
			if(handler && handler.rejectHandler){

				handler.rejectHandler(err);
			}
		}
	}
}

module.exports = Deferred;
