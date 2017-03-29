var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = 'mongodb://server.firstfly.cn:12345/todojob'
var http = require('http')

async function initDB(MongoClient,mongodbUrl,userId){
    debugger;
    let db = (await MongoClient.connect(mongodbUrl));
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
        db.clone();
        console.log('db查询出错出错')
        return flase;
    }
}

http.createServer(async function(req,res){
    let oo = (await initDB(MongoClient,mongodbUrl,'0.6666666'))
    debugger;
    console.log('实时')
}).listen(9008,'localhost')
// async userExistsInDB(email, password) {
//     let db = await MongoClient.connect('mongodb://127.0.0.1:27017/notificator');
//     try {
//         let collection = db.collection('users');
//         let userCount = (await collection.find(
//             {
//                 email: email,
//                 password: password
//             }).limit(1).count());
//         return userCount > 0;
//     } finally {
//         db.close();
//     }
// }