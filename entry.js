import { createStore,bindActionCreators,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import actionCreators from './redux/actionCreators' 
import reducer from './redux/reducer'

require('./style/index.scss')

var store = createStore(reducer,applyMiddleware(thunk))

var TodoMVC = Regular.extend({
	template:'#todomvc'
	,data:store.getState()
	,computed:{
		isAllCompleted:function(){
				return this.data.todos.every(todo=>todo.completed);
		}
		,completedLength:function(){
			return this.data.todos.filter(todo=>todo.completed).length
		}
		,visibleTodos:function(){
			return this.getVisibleTodos(this.data.filter)
		}
	}
	,actions:bindActionCreators(actionCreators,store.dispatch)
	,getVisibleTodos:function(filter){
		var todos = []
		if(filter=='active'){
			todos = this.data.todos.filter(todo=>!todo.completed)
		}else if(filter=='completed'){
			todos = this.data.todos.filter(todo=>todo.completed)
		}else{
			todos = this.data.todos;
		}
		return todos;
	}

})
TodoMVC.implement({
	events:{
		$init:function(){
			//取数据
			this.actions.fetchAllData();
			var self = this;
			//点击非编辑todo之外的地方时，取消editing字段，则可以清除编辑todo的效果
			document.addEventListener('click',function(e){
			   if(!e.target.className.indexOf('edittext')>-1){
			   		self.actions.startEdit('')
			   }
			})
		}
		// ,enter:function(elem,fire){
		// 	function update(ev){
		// 		if(ev.which == 13){
		// 			ev.preventDefault();
		// 			fire(ev)
		// 		}
		// 	}
		// 	Regular.dom.on(elem,'keypress',update);
		// 	return function destory(){
		// 		dom.off(elem,'keypress',update)
		// 	}
		// }
	}
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
			Regular.dom.off(elem,'keypress',update)
		}
	}
)
var todoMVC = new TodoMVC()
todoMVC.$inject('#todoapp')
//保证每次newTodo改变后todoMVC
store.subscribe(function(){
	todoMVC.data = store.getState()
	todoMVC.$update()
})


