var app = require('./app.js')
var action = require('./action.js')
var http = require('http')
var url = require('url')


app.use('/',action.setting)

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname

	for(var i=0;i<app.routers.length;i++){
		let route = app.routers[i]
		if(pathname == route[0]){
			let action = route[1]
			action(req,res)
		}
	}

}).listen(8081,'127.0.0.1')

console.log('Server runing at port 8081')