var actionCreators = {
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