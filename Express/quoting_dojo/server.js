const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const { Schema } = mongoose;

const port = process.env.PORT || 8000;

app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/quoting_dojo', {useNewUrlParser : true});
mongoose.connection.on('connected', () => console.log(`Connected to mongoose!`));

const quoteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    },    
})

const Quote = mongoose.model('quotes', quoteSchema);
const quote = new Quote({
    name: 'Kyle',
    quote: 'I love coding!'
})
app.get('/', function(_request, response) {
    response.render('index')
});
app.get('/quotes', function(_request, response) {
    Quote.find({})
        .then( quotes => response.render('index', { quotes }))
        .catch(console.log)
});
app.post('/quotes', function(request, response) {
    Quote.create(request.body)
        .then(quotes => {
            console.log('created quote', quotes);
            response.redirect('/quotes');
        })
        .catch(error => {
            const errors = Object.keys(error.errors)
                .map(key => error.errors[key].message)
            response.render('/quotes', { errors });
        })
})
app.listen(port, () => console.log(`Express server listening on port ${port}`));
// quote.save()
//     .then(function(error, saved) )

// console.log(quote);
