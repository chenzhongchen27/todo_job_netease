var http = require('http')
var path = require('path')
var url = require('url')
var handlers = require('./handlers')

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	var paths = pathname.split('/')
	var controller = paths[1] ||'default'
	var action = paths[2] || 'default'
	var args = paths.slice(3)

	if(handlers[controller]&&handlers[controller][action]){
		handlers[controller][action].apply(null,[req,res].concat(args));
	}else{
		res.writeHead(500)
		res.end('找不到相应控制器，请求地址为：'+req.url)
	}
	/**
	 *  try {
	 *  	module = require('./controlers/'+control)
	 *  }catch(ex){
	 *  	handle500(req,res)
	 *  	return;
	 *  }
	 */

}).listen(8081,'127.0.0.1')

console.log('server start in port 8081')