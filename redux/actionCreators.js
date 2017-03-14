import { CALLFETCH } from './fetchMiddleware.js'

var actionCreators = {
	fetchAllData:function(){
		return {
			[CALLFETCH]:{
				method:'GET'
				,url:'/todoControl/fetchAllData'
				,types:['fetch-all-data-request','fetch-all-data-success','fetch-all-data-fail']
			}
		}
		/*return function(dispatch,getState){
			fetch('/todoControl/fetchAllData',{credentials:'include'}).then(function(response){return response.json()})
			.then(function(data){
				dispatch({
					type:'fetch-all-data'
					,data:data
				})
			})
		}*/

	},

	addTodo:function(ev){
		let newTodo = ev.target.value;
		ev.target.value = '' //清空
		let data = {
			descript:newTodo
			,completed:false
			,uid:Math.random()				
		}
		return {
			[CALLFETCH]:{
				url:'/todoControl/addTodo'
				,types:['add-todo-request','add-todo-success','add-todo-fail']
				,method:'POST'
				,body:JSON.stringify(data)
				,data:data
			}
		}
/*		return function(dispatch,getState){
			let data = {
				descript:newTodo
				,completed:false
				,uid:Math.random()				
			}
			fetch('/todoControl/addTodo',{
				credentials:'include'
				,method:'POST'
				,headers:{
					'Content-Type':'application/json'
				}
				,body:JSON.stringify(data)
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'add-todo'
					,data:data
				})
			}).catch(function(error){
				console.error('addTodo中fetch函数出错')
			})
		}*/
	}
	,deleteTodo:function(uid){
		return {
			[CALLFETCH]:{
				url:'/todoControl/deleteTodo?uid='+uid
				,types:['delete-todo-request','delete-todo-success','delete-todo-fail']
				,method:'GET'
				,body:JSON.stringify(uid)
				,uid:uid
			}
		}
/*		return function(dispatch,getState){
			fetch('/todoControl/deleteTodo?uid='+uid,{
				credentials:'include'
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'delete-todo'
					,uid:uid
				})
			}).catch(function(error){
				console.error('deletoTodo中fetch函数出错')
			})
		}*/
	}
	,changeFilter:function(filter){
		return {
			[CALLFETCH]:{
				url:'/todoControl/changeFilter'
				,types:['change-filter-request','change-filter-success','change-filter-fail']
				,method:'POST'
				,body:JSON.stringify({filter})
				,filter:filter
			}
		}
/*		return function(dispatch,getState){
			fetch('/todoControl/changeFilter',{
				credentials:'include'
				,method:'POST'
				,headers:{
					'Content-Type':'application/json'
				}
				,body:JSON.stringify({filter:filter})
			}).then(function(response){
				return response.text()
			}).then(function(body){
				console.log('设置的过滤条件为：',filter)
				dispatch({
					type:'change-filter'
					,filter:filter
				})
			}).catch(function(error){
				console.error('changeFilter中fetch函数出错')
			})
		}*/
	}
	,clearCompleted:function(){
		return {
			[CALLFETCH]:{
				url:'/todoControl/clearCompleted'
				,types:['clear-completed-request','clear-completed-success','clear-completed-fail']
				,method:'GET'
			}
		}
/*		return function(dispatch,getState){
			fetch('/todoControl/clearCompleted',{
				credentials:'include'
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'clear-completed'
				})
			})
		}*/
	}
	,changeTodoCompleted:function(uid,completed){
		let data = {
			uid:uid
			,completed:!completed
		}
		return {
			[CALLFETCH]:{
				url:'/todoControl/changeTodoCompleted'
				,types:['change-todo-completed-request','change-todo-completed-success','change-todo-completed-fail']
				,method:'POST'
				,body:JSON.stringify(data)
				,...data
			}
		}
/*		return function(dispatch,getState){
			fetch('/todoControl/changeTodoCompleted',{
				credentials:'include'
				,method:'POST'
				,headers:{
					'Content-Type':'application/json'
				}
				,body:JSON.stringify({
					uid:uid
					,completed:!completed
				})
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'change-todo-completed'
					,uid:uid
					,completed:!completed
				})
			}).catch(function(error){
				console.error('changeTodoCompleted中fetch函数出错')
			})
		}*/
	}
	,changeAllTodoCompleted:function(bol){
		return {
			[CALLFETCH]:{
				url:'/todoControl/changeAllTodoCompleted'
				,types:['change-all-todo-completed-request','change-all-todo-completed-success','change-all-todo-completed-fail']
				,method:'POST'
				,body:JSON.stringify({bol})
				,bol:bol
			}
		}
/*		return function(dispatch,getState){
			fetch('/todoControl/changeAllTodoCompleted',{
				credentials:'include'
				,method:'POST'
				,headers:{
					'Content-Type':'application/json'
				}
				,body:JSON.stringify({
					bol:bol
				})
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'change-all-todo-completed'
					,bol:bol
				})
			}).catch(function(error){
				console.error('changeAllTodoCompleted中fetch函数出错')
			})
		}*/
	}
	,changeTodo:function(ev,uid,oldValue){

		let newDes=ev.target.value;
		ev.target.value=''
		let data= {
			uid:uid
			,newDes:newDes
		}
		return {
			[CALLFETCH]:{
				url:'/todoControl/changeTodo'
				,types:['change-todo-request','change-todo-success','change-todo-fail']
				,method:'POST'
				,body:JSON.stringify(data)
				,...data
			}
		}
		/*return function(dispatch,getState){
			fetch('/todoControl/changeTodo',{
				credentials:'include'
				,method:'POST'
				,headers:{
					'Content-Type':'application/json'
				}
				,body:JSON.stringify({
					uid:uid
					,newDes:newDes
				})
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'change-todo'
					,uid:uid
					,newDes:newDes
				})
			}).catch(function(error){
				console.error('changeTodo中fetch函数出错')
			})
		}*/

		// return {
		// 	type:'change-todo'
		// 	,newDes:newDes
		// 	,uid:uid
		// }
	}
	,startEdit:function(uid){
		//editing不在云端存储
		return {
			type:'start-edit'
			,uid:uid
		}
	}

}


module.exports = actionCreators;