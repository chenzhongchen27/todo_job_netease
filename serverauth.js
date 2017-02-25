var http = require('http')

http.createServer(function(req,res){
	var auth = req.headers['authorization'] || '';
	var parts = auth.split(' ')
	var method = parts[0] || '';  //Basic
	var encoded = parts[1] || '';  //user:password的base64加密结果
	var decoded = (new Buffer(encoded,'base64')).toString('utf-8').split(':')
	var user = decoded[0]
	var pass = decoded[0]
	if(user=='dmin'&&pass=='admin'){
		res.writeHead(200)
		res.end('登录成功')
	}else{
		res.setHeader('WWW-Authenticate','Basic realm="secure Area"')
		// res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

		res.writeHead(401)
		res.end()
	}
}).listen(8082,'127.0.0.1')

console.log("Server start on port 8082")