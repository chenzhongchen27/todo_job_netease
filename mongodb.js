var MongoClient = require('mongodb').MongoClient
	,assert = require('assert')

var url = 'mongodb://localhost:12345/test2'

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

var findDocuments = function(db,callback){
	var collection = db.collection('documents')

	collection.find().toArray(function(err,docs){
		assert.equal(null,err)
		console.log('found the following records')
		console.log(docs)
		callback(docs)
	})
}


MongoClient.connect(url,function(err,db){
	assert.equal(null,err)
	console.log('Connected successfully to server mongodb 12345')

	insertDocuments(db,function(result){
		console.log(result)
		findDocuments(db, function(){
			db.close()
		})
	})

	// db.close()
})

