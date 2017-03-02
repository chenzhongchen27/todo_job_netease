var actionCreators = {
	fetchAllData:function(){
		console.log('init时期准备取数据——action')
		return function(dispatch,getState){
			fetch('/todoControl/fetchAllData',{credentials:'include'}).then(function(response){return response.json()})
			.then(function(body){
				console.log('init时期准备取数据——action——dispatch之前',body)
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
		return {
			type:'add-todo'
			,newTodo:newTodo
		}
	}
	,deleteTodo:function(uid){
		return {
			type:'delete-todo'
			,uid:uid
		}
	}
	,changeFilter:function(filter){
		return {
			type:'change-filter'
			,filter:filter
		}
	}
	,clearCompleted:function(){
		return {
			type:'clear-completed'
		}
	}
}

module.exports = actionCreators;