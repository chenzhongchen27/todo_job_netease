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

async function initDB(MongoClient,mongodbUrl,userId){
    debugger;
    let db = await MongoClient.connect(mongodbUrl);
    let collection = db.collection('todo');
        
    try{
        let userCount = (await collection.find({
            name:userId
        }).limit(1).count());
        if(userCount>0){
            //如果存在，则数据库中有该数据
            return {
                db:db,
                collection:collection
            }
        }else{
            await collection.insert({name:userId,data:{todos:[],filter:'all'}})
            return {
                db:db,
                collection:collection
            }
        }
    }catch(e){
        db.close();
        console.log('db查询出错出错')
        return flase;
    }
}

exports.initDB = initDB;

let fs = require('fs')
exports.staticFile = function(req,res,pathname){
	if(pathname=='/'||pathname=='/index.html'){
		fs.readFile('index.html',function(err,data){
			res.setHeader('Content-Type','text/html')
			res.writeHead(200)
			res.end(data)
		})			
	}else{
		if(fs.existsSync('.'+pathname)){
			if(pathname.lastIndexOf('.js')>0){
				res.setHeader('Content-Type','application/x-javascript')
			}else if(pathname.lastIndexOf('.css')>0){
				res.setHeader('Content-Type','text/css')
			}else if(pathname.lastIndexOf('.css')>0){
				res.setHeader('Content-Type','text/html')
			}
			res.writeHead(200)
			fs.createReadStream('.'+pathname).pipe(res)
		}else{
			res.writeHead(404)
			res.end('无此资源')				
		}

	}
}