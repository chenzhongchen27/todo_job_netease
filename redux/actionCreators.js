var actionCreators = {
	fetchAllData:function(){
		return function(dispatch,getState){
			fetch('/todoControl/fetchAllData',{credentials:'include'}).then(function(response){return response.json()})
			.then(function(body){
				dispatch({
					type:'fetch-all-data'
					,data:body.data
				})
			})
		}
	},

	addTodo:function(ev){
		let newTodo = ev.target.value;
		ev.target.value = '' //清空
		return function(dispatch,getState){
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
		}
	}
	,deleteTodo:function(uid){
		return function(dispatch,getState){
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
		}
	}
	,changeFilter:function(filter){
		return function(dispatch,getState){
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
		}
	}
	,clearCompleted:function(){
		return function(dispatch,getState){
			fetch('/todoControl/clearCompleted',{
				credentials:'include'
			}).then(function(response){
				return response.text()
			}).then(function(body){
				dispatch({
					type:'clear-completed'
				})
			})
		}
	}
	,changeTodoCompleted:function(uid,completed){
		return function(dispatch,getState){
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
		}
	}
}


module.exports = actionCreators;