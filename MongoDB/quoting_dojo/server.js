const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const port = process.env.PORT || 8000; 

app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/quoting_dojo', {useNewUrlParser: true});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB!'));

const quoteSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    quote: {
        type: String,
        required: true,
    }
})
const Quote = mongoose.model('Quote', quoteSchema);
app.get('/', function(request, response) {
    response.render('index');
});
app.post('/quotes', function(request, response) {
    console.log(request.body)
    Quote.create(request.body, function(err) {
        if (err) { console.log(err)
        } else {
            console.log('successfully added quote')
            response.redirect('/');
        } 

    })
});
app.get('/quotes', function(request, response) {
    Quote.find({}, function(err, quotes) {
        if (err) { console.log(err); }
        response.render('quotes', {quotes: quotes})
    })
});

app.listen(port, () => console.log(`Listening on ${port}`));