var defaultData = {
	todos:[{
		descript:'初始-第一条todo的项目'
		,completed:true
		,uid:new Date().getTime()
	},{
		descript:'初始-第二条todo的项目'
		,completed:false
		,uid:new Date().getTime()
	},{
		descript:'初始-第三条todo的项目'
		,completed:true
		,uid:new Date().getTime()
	}]
	,editing:null
	,filter:'all'
	,newTodo:''
}
function counter(state=defaultData,action){
	switch(action.type){
		case 'add-todo':
			let todos = [{
				descript:action.newTodo
				,completed:false
				,uid:new Date().getTime()				
			}].concat(state.todos)
			//保证每次return的都是不同的对象，这是redux原则
			return Object.assign({},state,{
				todos:todos
				,newTodo:''
			});
		default:
			return state;
	}
}
var store = Redux.createStore(counter)

var actionGenerators = {
	addTodo:function(newTodo){
		return {
			type:'add-todo'
			,newTodo:newTodo
		}
	}
}

