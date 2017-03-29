export const CALLFETCH = Symbol('callFetchSign')
export default store => next => action => {
	if(!action[CALLFETCH]){
		next(action)
		return ;
	}

	//用于fetch请求的参数等 提取数据
	var fetchOpt = action[CALLFETCH]
	let { types,url,method,body="",headers={},...otherFetchOpt }  = fetchOpt;
	let [requestType,successType,failType] = types;

	let defaultHeaders = {
	    'Content-Type': 'application/json; charset=utf-8'
	}
	//通用配置
	let fetchConf = {
		credentials:'include'
		,headers:Object({},defaultHeaders,headers)
	}
	//根据方法等个性化配置
	if(method == 'GET'){
		//get暂时没有需要做的处理
	}else{
		fetchConf.method = method;
		fetchConf.body = body;
	}

	//先发出request等action
	next({ //发出request的action
		type:requestType
		,...otherFetchOpt
	})
	console.log('具体请求配置',fetchConf)
	//发出正式的网络请求，并处理成功与失败的action
	fetch(url,fetchConf).then(function(response){
		console.log(url,fetchConf,response,response.body)
		return response.json() //解析数据，默认为json格式
	}).then(function(data){
		console.log('call fetch中间件——success')

		next({
			type:successType
			,response:data
			,...otherFetchOpt
		})
	}).catch(function(err){
		console.log('call fetch中间件——fail',err,err.message)
		let resetAction = url.split('/').pop();
		alert(resetAction+"请求失败，将数据恢复！")
		next({
			type:failType
			,error:err
			,...otherFetchOpt
			
		})
	})

/*	{
		[CALLFETCH]:{
			method:'get'
			,url:''
			,types:['request','success','fail']
			,body:''
			,'headers':
		}
	}*/

	/**
	 * 			fetch('/todoControl/addTodo',{
				credentials:'include'
				,method:'POST'
				,headers:{
					'Content-Type':'application/json'
				}
				,body:JSON.stringify(data)
	 */


}