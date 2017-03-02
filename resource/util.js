exports.parseCookie = function(cookie){
	var cookies = {};
	if(!cookie){
		return cookies;
	}
	var list = cookie.split(';')
	for(var i = 0;i<list.length;i++){
		var pair = list[i].split('=');
		cookies[pair[0].trim()] = pair[1];
	}
	return cookies;
}

exports.serializeCookie = function (name,val){
	var pairs = [name + '=' + encodeURI(val)]
	pairs.push('Expires='+(new Date("January 1,2025")).toUTCString()) //默认cookie的有效期到2025年	
	return pairs.join('; ')
}