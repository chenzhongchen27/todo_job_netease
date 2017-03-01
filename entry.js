import { createStore,bindActionCreators } from 'redux'
require('./style/index.scss')

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
var store = createStore(counter)

var actionGenerators = {
	addTodo:function(newTodo){
		return {
			type:'add-todo'
			,newTodo:newTodo
		}
	}
}


var TodoMVC = Regular.extend({
	template:'#todomvc'
	,data:store.getState()
	,computed:{
		isAllCompleted:{
			get:function(){
				return this.data.todos.every(todo=>todo.completed);
			}
			,set:function(bol){this.data.todos.forEach(
				(todo)=>todo.completed = bol
			)}
		}
		,completedLength:function(){
			return this.data.todos.filter(todo=>todo.completed).length
		}
	}
	,actions:bindActionCreators(actionGenerators,store.dispatch)

})
TodoMVC.event('enter',function(elem,fire){
		function update(ev){
			if(ev.which == 13){
				ev.preventDefault();
				fire(ev)
			}
		}
		Regular.dom.on(elem,'keypress',update);
		return function destory(){
			dom.off(elem,'keypress',update)
		}
	}
)
var todoMVC = new TodoMVC()
todoMVC.$inject('#todoapp')
//保证每次newTodo改变后todoMVC
store.subscribe(function(){
	todoMVC.data = store.getState();
	todoMVC.$update()
})

