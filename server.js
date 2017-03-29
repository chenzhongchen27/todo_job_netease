var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = 'mongodb://server.firstfly.cn:12345/todojob'

var util = require('./resource/util')
var todoControlActions = require('./resource/todoControlActions.js')
var http = require('http')
var fs = require('fs')
var url = require('url')
var assert = require('assert')



http.createServer(async function(req,res){
	let userId = ''
	req.cookies = util.parseCookie(req.headers.cookie)

	//求出userId
	if(!req.cookies.userId){
		userId = Math.random()
		res.setHeader('Set-cookie',util.serializeCookie('userId',userId))
	}else{
		userId = parseFloat(req.cookies.userId);
	}

	var urlParsed = url.parse(req.url,true);
	var pathname = urlParsed.pathname
	req.query = urlParsed.query;

	var paths = pathname.split('/') //todoControl与操作方法 
	var action = paths[2] //add,delete,modify,get

	if(paths[1]=='todoControl'){
		//微服务，通过URL的第二个参数来决定动作，动作写在resource/todoControlActions.js
		//
		//设置跨域
		res.setHeader('Access-Control-Allow-Origin','*')
		res.setHeader('Access-Control-Allow-Methods','*')

		if(todoControlActions[action]){
			//初始化数据库
			let { db,collection } = await util.initDB(MongoClient,mongodbUrl,userId)
			//用微服务进行处理
			todoControlActions[action](req,res,db,collection,userId)
		}else{
			res.writeHead(404);
			res.end('action错误: '+ action)
		}
		return;
	}else{
		//代理静态文件
		util.staticFile(req,res,pathname)
	}
}).listen(8082,'0.0.0.0')

console.log("Server start on port 8082，please open locaolhost:8082")

