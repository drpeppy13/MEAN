const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const { Schema } = mongoose;
const app = express();
const port = process.env.PORT || 8000;
// required dependencies 

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

//set up views 


mongoose.connect('mongodb://localhost:27017/message_board', {useNewUrlParser : true})
mongoose.connection.on('connected', () => console.log('Connected to Mongoose!'))

//connect mongoDB

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [ true, 'Name is required']},
    message: {type: String, required: [ true, 'message is required']},
    _comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const Message = mongoose.model('Message', MessageSchema);

//message schema with comment reference

const CommentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    comment: {type: String, required: true},
    _messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
})

const Comment = mongoose.model('Comment', CommentSchema);
// comment schema with message reference

app.get('/', function(request, response) {
    Message.find({}).populate('_comments').exec(function(error, messages){
        response.render('index', {messages: messages})
    })
})

//populate messages and comments on same page

app.post('/messages', function(request, response) {
    const newMessage = new Message({ name: request.body.name, message: request.body.message });
    newMessage.save(function(error) {
        if (error) { console.log(error) 
        } else {
            console.log("new message created");
            response.redirect('/');
        }
    })
})

//post messages to /messages using message schema

app.post('/comments/:id', function(request,response) {
    const messageId = request.params.id; 
    Message.findOne({ _id : messageId}, function(error, message){
        const newComment = new Comment({ name: request.body.name, comment: request.body.comment})
        newComment._messages = message._id;
        Message.update({_id: message._id}, { $push: {_comments: newComment }}, function(error) {

        });
        newComment.save(function(error) {
            if (error) {
                console.log(error);
                response.render('index.ejs', {errors: newComment.errors});
            } else {
                console.log('comment added');
                response.redirect('/');
            }
        })
    })
})

// post comments to individual request.params.id then use comment schema to build within messages.

app.listen(port, () => console.log(`listening on port ${ port }`));

// set up port. they can use 8000 or their own.