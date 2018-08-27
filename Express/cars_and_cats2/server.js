var express = require('express');
var app = express();
// app.use(express.static(__dirname + '/static'));
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/static/index.html');
})
app.get('/form', function(request, response) {
    response.sendfile(__dirname + '/static/form.html');
})
app.get('/cars', function(request, response) {
    response.sendfile(__dirname + '/static/cars.html');
})
app.get('/cats', function(request, response) {
    response.sendfile(__dirname + '/static/cats.html');
})
app.use(express.static(__dirname + '/static'))
console.log(__dirname + '/static' )
app.listen(8000, function(){
    console.log('listening on port 8000');
})
