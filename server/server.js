var http = require('http')
var fs = require('fs')

http.createServer(function(req,res){
	if(req.method=='GET'){
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
				res.writeHead(404,{'Content-Type':'text/html'});
				res.end(data.toString('utf8').replace(/\$\{url\}/g,req.url));
			})		
		}
		return;
	}

	if(req.method=='POST'){
		var content =''
		req.on('data',function(chunk){
			content += chunk;
		})

		req.on('end',function(){
			res.writeHead(200,{"Content-Type":"text/plain"})
			res.write('you have send information: ' + content);
			res.end()
		})

		return;
	}

	if(req.method=='PUT'){
		console.log('接受put请求')
		let destination = fs.createWriteStream('destination.txt')
		let length = req.headers['content-length']; //不用中括号加引号的方式，- 会被解析为引号

		req.pipe(destination)
		req.on('data',function(chunk){
			console.log('接受的数据长度',chunk.length,'接收的content-type',length)
		})
		req.on('end',function(){
			console.log('put请求结束')
			res.end();
		})
	}
}).listen(8081,"127.0.0.1")

console.log('Server runing at port 8081')