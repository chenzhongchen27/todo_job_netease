var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = 'mongodb://server.firstfly.cn:12345/todojob'
/*
MongoClient.connect(url,function(err,db){
	var collection = db.collection('todo');
	collection.find({}).toArray(function(err,result){
		console.log('已连接数据库 '+ url)
		console.log('查询的结果',result[0].test)
		db.close();
	})
})
*/
var util = require('./resource/util')
var http = require('http')
var fs = require('fs')
var url = require('url')
var assert = require('assert')

http.createServer(function(req,res){
	let userId = ''
	req.cookies = util.parseCookie(req.headers.cookie)
	if(!req.cookies.userId){
		res.setHeader('Set-cookie',util.serializeCookie('userId',Math.random()))
	}else{
		userId = req.cookies.userId;
	}

	var pathname = url.parse(req.url).pathname;
	var paths = pathname.split('/') //todoControl与操作方法 
	var action = paths[2] //add,delete,modify,get
	if(paths[1]=='todoControl'){
		// MongoClient.connect(mongodbUrl,function(err,db){
		// 	var collection = db.collection('user');
		// 	collection.find({name:userId}).toArray(function(err,result){
		// 		console.log('已连接数据库 '+ url)
		// 		console.log('查询的结果',result[0])
		// 		db.close();
		// 	})
		// })
		switch(action){
			case 'fetchAllData':
			/**
			 * 一个成功的例子
			 * fetch('http://localhost:8082/todoControl/get',{credentials:'include'}).then(function(response){return response.json()}).then(function(body){console.log(body)})
			 */
				MongoClient.connect(mongodbUrl,function(err,db){
					var collection = db.collection('todo');
					collection.find({name:userId}).toArray(function(err,result){
						console.log('已连接数据库 '+ url)
						console.log('查询的结果',result[0],'name',userId)
						db.close();
						res.writeHead(200)
						res.end(JSON.stringify(result[0]||{
							todos:[]
							,editing:''
							,filter:'all'
						}))
					})
				})
				return;
			case 'addTodo':
				let content = ''
				req.on('data',function(chunk){
					content += chunk;
				})
				req.on('end',function(){
					console.log('数据接收完',content,JSON.parse(content))		
					MongoClient.connect(mongodbUrl,function(err,db){
						var collection = db.collection('todo');
						collection.update({name:userId},{
							$push:{
								"data.todos":{
									$each:[JSON.parse(content)]
									,$position:0
								}
							}
						},function(err,r){
							db.close();
							if(err){
								res.writeHead(500)
								res.end('数据库操作出错'+err)
								return;
							}
							res.writeHead(200)
							res.end('success')
						})
					})
				})
				return ;
			default:
				res.writeHead(404);
				res.end('action错误: '+ action)
		}
	}else{
		if(pathname=='/'||pathname=='/index.html'){
			fs.readFile('index.html',function(err,data){
				res.setHeader('Content-Type','text/html')
				res.writeHead(200)
				res.end(data)
			})			
		}else{
			if(fs.existsSync('.'+pathname)){
				res.writeHead(200)
				fs.createReadStream('.'+pathname).pipe(res)
			}else{
				res.writeHead(404)
				res.end('无此资源')				
			}
			// fs.readFile('.'+pathname,function(err,data){
			// 	if(!err){
			// 		res.writeHead(404)
			// 		res.end('无此资源')
			// 	}
			// 	res.writeHead(200)
			// 	console.log('读取的数据',data)
			// 	res.end(data.toString())
			// })	
		}
	}
}).listen(8082,'127.0.0.1')

console.log("Server start on port 8082")

