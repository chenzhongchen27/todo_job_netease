var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
	if(req.url=='/' || req.url=='/index.html'){
		fs.readFile('./index.html',function(err,data){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data);
		})		
	}else if(req.url=='/about.html'){
		fs.readFile('./about.html',function(err,data){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data);
		})		
	}else{
		fs.readFile('./error.html',function(err,data){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(data.toString('utf8').replace(/\$\{url\}/g,req.url));
		})		
	}
}).listen(8081,"127.0.0.1")

console.log('Server runing at port 8081')