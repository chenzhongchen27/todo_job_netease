var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = 'mongodb://server.firstfly.cn:12345/todojob'

var util = require('./resource/util')
var http = require('http')
var fs = require('fs')
var url = require('url')
var assert = require('assert')

http.createServer(function(req,res){
	let userId = ''
	req.cookies = util.parseCookie(req.headers.cookie)
	if(!req.cookies.userId){
		userId = Math.random()
		res.setHeader('Set-cookie',util.serializeCookie('userId',userId))
		//数据库中初始化数据
		MongoClient.connect(mongodbUrl,function(err,db){
			var collection = db.collection('todo');
			collection.insert({name:userId,data:{todos:[],filter:'all'}},function(err,suc){
				if(err){
					// console.log('初始化name出错')
					db.close()
					res.end('初始化name出错');
					return;
				}
				// console.log('初始化完成')
				db.close()
			})
		})
	}else{
		//cookie传递过来都为字符串，但数据库中为数字，需转换
		userId = parseFloat(req.cookies.userId);
	}

	// var pathname = url.parse(req.url).pathname;
	var urlParsed = url.parse(req.url,true);
	var pathname = urlParsed.pathname
	req.query = urlParsed.query;

	var paths = pathname.split('/') //todoControl与操作方法 
	var action = paths[2] //add,delete,modify,get
	if(paths[1]=='todoControl'){

		switch(action){
			case 'fetchAllData':
			/**
			 * 一个成功的例子
			 * fetch('http://localhost:8082/todoControl/get',{credentials:'include'}).then(function(response){return response.json()}).then(function(body){console.log(body)})
			 */
				MongoClient.connect(mongodbUrl,function(err,db){
					var collection = db.collection('todo');
					collection.findOne({name:userId},(function(err,result){
						// console.log('已连接数据库 '+ url)
						// console.log('查询的结果',result,'name',userId)
						db.close();
						res.writeHead(200)
						res.end(JSON.stringify((result&&result.data)||{
							todos:[]
							,filter:'active'
						}))
					}))
				})
				return;
			case 'addTodo':
				let content = ''
				req.on('data',function(chunk){
					content += chunk;
				})
				req.on('end',function(){
					// console.log('数据接收完',content,JSON.parse(content),'nam是',userId)		
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
							// console.log('addtodo完成')
							res.writeHead(200)
							res.end('success')
						})
					})
				})
				return ;
			case 'deleteTodo':
			/**
			 * mongodb删除的语句
			 * db.todo.update({name:'test1'},{$pull:{'data.todos':{uid:0.26773801942553255}}},{multi:true})
			 */
			 	if(!req.query.uid){
			 		// console.log('delete-todo必须指明删除的uid')
			 		res.write(404)
			 		res.end('delete-todo必须指明删除的uid')
			 		return;
			 	}
				MongoClient.connect(mongodbUrl,function(err,db){
					var collection = db.collection('todo');
					collection.updateMany({
						name:userId
					},{
						$pull:{'data.todos':{uid:parseFloat(req.query.uid)}}
					},{
						multi:true
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
				return;
			case 'clearCompleted':
				MongoClient.connect(mongodbUrl,function(err,db){
					var collection = db.collection('todo');
					collection.updateMany({
						name:userId
					},{
						$pull:{'data.todos':{completed:true}}
					},{
						multi:true
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
				return;
			case 'changeFilter':
				let filter = ''
				req.on('data',function(chunk){
					filter += chunk;
				})
				req.on('end',function(){
					MongoClient.connect(mongodbUrl,function(err,db){
						var collection = db.collection('todo');

						collection.updateMany({name:userId},{
							$set:{
								'data.filter':JSON.parse(filter)['filter']
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
				return;
			case 'changeTodoCompleted':
				let content2 = ''
				req.on('data',function(chunk){
					content2 += chunk;
				})
				req.on('end',function(){
					MongoClient.connect(mongodbUrl,function(err,db){
						var collection = db.collection('todo');
						var receiveData = JSON.parse(content2)
						collection.updateMany({name:userId,'data.todos.uid':receiveData.uid},{
							$set:{"data.todos.$.completed":receiveData.completed}
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
				return;
			case 'changeTodo':
				let content3 = ''
				req.on('data',function(chunk){
					content3 += chunk;
				})
				req.on('end',function(){
					MongoClient.connect(mongodbUrl,function(err,db){
						var collection = db.collection('todo');
						var receiveData = JSON.parse(content3)
						collection.updateMany({name:userId,'data.todos.uid':receiveData.uid},{
							$set:{"data.todos.$.descript":receiveData.newDes}
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
				return;

			case 'changeAllTodoCompleted':
			/**
			 * 测试的curl命令
			 * curl http://localhost:8082/todoControl/changeAllTodoCompleted --cookie 'userId=test2' -d '{"bol":false}'
			 */
				let content4 = ''
				req.on('data',function(chunk){
					content4 += chunk;
				})
				req.on('end',function(){
					MongoClient.connect(mongodbUrl,function(err,db){
						var collection = db.collection('todo');
						var receiveData = JSON.parse(content4)
						// console.log('接受的数据',receiveData)
						collection.findOne({name:userId},function(err,doc){
							let todos = doc.data.todos.map(function(todo){
								todo.completed = receiveData.bol;
								return todo;
							})
							collection.update({name:userId},{$set:{
								"data.todos":todos
							}},function(err,r){
								db.close();
								res.writeHead(200)
								res.end('success')
							})
						})

					})
				})
				return;

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

		}
	}
}).listen(8082,'127.0.0.1')

console.log("Server start on port 8082")

