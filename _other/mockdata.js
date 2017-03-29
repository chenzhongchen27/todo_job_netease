var todos = [{
		uid:Math.random()
		,descript:'diyidier'
		,completed:false
	},{
		uid:Math.random()
		,descript:'diyidier'
		,completed:true
	},{
		uid:Math.random()
		,descript:'diyidier'
		,completed:true
	}]
module.exports={
	todos:todos
	,editing:todos[1].uid
	,filter:'all'
}