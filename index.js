var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
	fs.readFile('./data.html',function(err,data){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end(data);
	})
}).listen(8081,"127.0.0.1")

console.log('Server runing at port 8081')