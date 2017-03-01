var actionCreators = {
	addTodo:function(newTodo){
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
	,toggleOne:function(uid){
		return {
			type:'toggle-one'
			,uid:uid
		}
	}
}

module.exports = actionCreators;