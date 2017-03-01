var defaultData = {
	todos:[{
		descript:'初始-第一条todo的项目'
		,completed:true
		,uid:Math.random()
	},{
		descript:'初始-第二条todo的项目'
		,completed:true
		,uid:Math.random()
	},{
		descript:'初始-第三条todo的项目'
		,completed:true
		,uid:Math.random()
	}]
	,editing:null
	,filter:'active'
}

function reducer(state=defaultData,action){
	switch(action.type){
		case 'add-todo':
			let todos = [{
				descript:action.newTodo
				,completed:false
				,uid:Math.random()				
			}].concat(state.todos)
			//保证每次return的都是不同的对象，这是redux原则
			return Object.assign({},state,{
				todos:todos
			});
		case 'delete-todo':
			let todos2 = state.todos.filter(todo=>todo.uid!==action.uid)
			return Object.assign({},state,{
				todos:todos2
			});			
		case 'change-filter':
			let newstate = Object.assign({},state,{
				filter:action.filter
			})
			return newstate;
		case "clear-completed":
			let todos3 = state.todos.filter(todo=>!todo.completed)
			return Object.assign({},state,{
				todos:todos3
			});	
		default:
			return state;
	}
}

export default reducer