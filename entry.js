import { createStore,bindActionCreators } from 'redux'
import actionCreators from './redux/actionCreators' 
import reducer from './redux/reducer'

require('./style/index.scss')

var store = createStore(reducer)

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
	,actions:bindActionCreators(actionCreators,store.dispatch)

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

