exports.fetchAllData = async function(req,res,db,collection,userId){
	collection.findOne({name:userId},(function(err,result){
		db.close();
		res.writeHead(200)
		res.end(JSON.stringify((result&&result.data)||{
			todos:[]
			,filter:'active'
		}))
	}))
}

exports.addTodo = async function(req,res,db,collection,userId){
	let content = ''
	req.on('data',function(chunk){
		content += chunk;
	})
	req.on('end',function(){
		// console.log('数据接收完',content,JSON.parse(content),'nam是',userId)		
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
			res.end(JSON.stringify('success'))
		})
	})
}
exports.deleteTodo = async function(req,res,db,collection,userId){
 	if(!req.query.uid){
 		// console.log('delete-todo必须指明删除的uid')
 		db.close();
 		res.write(404)
 		res.end('delete-todo必须指明删除的uid')
 		return;
 	}
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
		res.end(JSON.stringify('success'))
	})
}
exports.clearCompleted = async function(req,res,db,collection,userId){
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
		res.end(JSON.stringify('success'))
	})
}
exports.changeFilter = async function(req,res,db,collection,userId){
	let filter = ''
	req.on('data',function(chunk){
		filter += chunk;
	})
	req.on('end',function(){
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
			res.end(JSON.stringify('success'))
		})
	})
}
exports.changeTodoCompleted = async function(req,res,db,collection,userId){
	let content2 = ''
	req.on('data',function(chunk){
		content2 += chunk;
	})
	req.on('end',function(){
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
			res.end(JSON.stringify('success'))
		})
	})
}
exports.changeTodo = async function(req,res,db,collection,userId){
	let content3 = ''
	req.on('data',function(chunk){
		content3 += chunk;
	})
	req.on('end',function(){
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
			res.end(JSON.stringify('success'))
		})
	})
}
exports.changeAllTodoCompleted = async function(req,res,db,collection,userId){
	let content4 = ''
	req.on('data',function(chunk){
		content4 += chunk;
	})
	req.on('end',function(){
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
				res.end(JSON.stringify('success'))
			})
		})
	})
}
