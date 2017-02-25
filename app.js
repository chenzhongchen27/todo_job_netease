var routers = []
var app = {}

app.use = function(path,action){
	routers.push([path,action])
}
app.routers =routers;

module.exports = app 