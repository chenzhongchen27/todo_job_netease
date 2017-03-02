var defaultData = {
	todos:[{
		descript:'初始-第一条todo的项目'
		,completed:false
		,uid:Math.random()
	},{
		descript:'初始-第二条todo的项目'
		,completed:false
		,uid:Math.random()
	},{
		descript:'初始-第三条todo的项目'
		,completed:true
		,uid:Math.random()
	}]
	,editing:0.5647982430928387
	,filter:'all'
}

function reducer(state=defaultData,action){
	switch(action.type){
		case "fetch-all-data":
			return Object.assign({},defaultData,action.data)
		case 'add-todo':
			let todos = [action.data].concat(state.todos)
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
		case "change-todo-completed":
			let todo4 = state.todos.map(todo=>{
				if(todo.uid==action.uid){
					return Object.assign({},todo,{completed:action.completed})
				}else{
					return todo;
				};
			})
			return Object.assign({},state,{
				todos:todo4
			});	
		case "change-all-todo-completed":
			let todo5 = state.todos.map(todo=>{
				return Object.assign({},todo,{completed:action.bol})
			})
			return Object.assign({},state,{
				todos:todo5
			});	
		case "change-todo":
			let todo6 = state.todos.map(todo=>{
				if(todo.uid==action.uid){
					return Object.assign({},todo,{descript:action.newDes})
				}else{
					return todo;
				};
			})
			return Object.assign({},state,{
				todos:todo6
				,editing:''
			});	
		case "start-edit":
			return Object.assign({},state,{
				editing:action.uid
			});	
		default:
			return state;
	}
}

export default reducer