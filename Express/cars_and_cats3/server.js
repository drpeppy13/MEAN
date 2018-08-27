var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/cars/new', function(req, res) {
    res.render("form")
})

app.get('/cars', function(req, res) {
    res.render("cars")
})
app.get('/cats', function(req, res) {
    res.render("cats")
})
app.use(express.static(__dirname + '/static'));

app.listen(8000, function() {
    console.log('listening on port 8000')
})
