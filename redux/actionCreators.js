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
		return {
			type:'change-filter'
			,filter:filter
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
}


module.exports = actionCreators;