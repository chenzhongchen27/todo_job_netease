var defaultData = {
	todos:[]
	,editing:''
	,filter:'all'
}
var dataBackup = {}

function reducer(state=defaultData,action){
	if(action.type.split('-').pop()==='request'){
		dataBackup[action.requestUid] = state;//进行备份，除了初始数据
	}
	switch(action.type){
		case 'add-todo-success':
		case 'delete-todo-success':
		case 'change-filter-success':
		case 'clear-completed-success':
		case 'change-todo-completed-success':
		case 'change-all-todo-completed-success':
			delete dataBackup[action.requestUid]
			return state;

		case 'add-todo-fail':
		case 'delete-todo-fail':
		case 'change-filter-fail':
		case 'clear-completed-fail':
		case 'change-todo-completed-fail':
		case 'change-all-todo-completed-fail':
			var lastState = dataBackup[action.requestUid];
			delete dataBackup[action.requestUid];
			return lastState;


		case "fetch-all-data-success":
			return Object.assign({},defaultData,action.response)
		/**
		 * 增加todo
		 */
		case 'add-todo-request':
			// dataBackup[action.requestUid] = state;
			var todos = [action.data].concat(state.todos)
			//保证每次return的都是不同的对象，这是redux原则
			return Object.assign({},state,{
				todos:todos
			});


		/**
		 * 删除todo
		 */
		case 'delete-todo-request':
			// dataBackup[action.requestUid] = state;
			var todos2 = state.todos.filter(todo=>todo.uid!==action.uid)
			return Object.assign({},state,{
				todos:todos2
			});				

		/**
		 * 修改过滤视图
		 */
		case 'change-filter-request':
			// dataBackup[action.requestUid] = state;
			var newstate = Object.assign({},state,{
				filter:action.filter
			})
			return newstate;


		/**
		 * 清楚所有已完成的todo
		 */
		case "clear-completed-request":
			// dataBackup[action.requestUid] = state;
			var todos3 = state.todos.filter(todo=>!todo.completed)
			return Object.assign({},state,{
				todos:todos3
			});	


		/**
		 * 改变某一个todo的完成状态
		 * 
		 */
		case "change-todo-completed-request":
			// dataBackup[action.requestUid] = state;
			var todo4 = state.todos.map(todo=>{
				if(todo.uid==action.uid){
					return Object.assign({},todo,{completed:action.completed})
				}else{
					return todo;
				};
			})
			console.info('---显示todo4，再是state.todo---')
			console.table(todo4)
			console.table(state.todos)
			return Object.assign({},state,{
				todos:todo4
			});	

		/**
		 * 改变所有todo的完成状态
		 */
		case "change-all-todo-completed-request":
			var todo5 = state.todos.map(todo=>{
				return Object.assign({},todo,{completed:action.bol})
			})
			return Object.assign({},state,{
				todos:todo5
			});	

		/**
		 * 修改todo内容
		 */
		case "change-todo-request":
			var todo6 = state.todos.map(todo=>{
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

		/**
		 * 正在编辑的todo标记
		 */
		case "start-edit":
			return Object.assign({},state,{
				editing:action.uid
			});	
		default:
			return state;
	}
}

export default reducer