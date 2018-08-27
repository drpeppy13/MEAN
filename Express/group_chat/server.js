const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = process.env.PORT || 8000;

app.use(session({
    secret: 'asdfasdf',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:60000}
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});



const server = app.listen(port, () => console.log(`listening on port ${ port }`));
const io = require('socket.io')(server);

app.post('/users', function (req, res) {
    req.session.name = req.body.name;
    req.session.message = req.body.message;
    console.log("POST DATA \n\n", req.session.name)
    console.log(req.session.message)

    
})
const users = {};
const messages = [];
io.on('connection', socket=> {
    console.log('incoming socket connection');
    console.log(socket.id)
    socket.on('messageReceived', function(text) {
        console.log(text);
        console.log(messages);
        const user = users[socket.id];
        console.log(user);
        const message = new Message(text, user);
        messages.push(message);
        console.log(message);
        io.emit('updateMessage', message);
    });
    socket.on('new_user', function(name) {
        console.log(name);
        const user = new User(name, socket);
        console.log(user);
        users[user.id] = user 
        console.log(users);
        socket.broadcast.emit('got_new_user', user)
        socket.emit('existing_users', users)
        socket.emit('loggedMessages', messages)
        console.log(messages);
    });
    socket.on('disconnect', function(name) {
        console.log('closing connection')
        const user = users[socket.id]
        delete users[socket.id]
        io.emit('user_disconnected', user)
    })
    // socket.on('')
});

class User {
    constructor(name, socket) {
        this.name = name
        this.id = socket.id
    }
    // get id() {
    //     return this.socket.id; 
    // }
}
class Message {
    constructor(message, user) {
        this.message = message
        this.user = user 
        this.time = new Date();
    }
}

function messageUpdated(message) {
    io.emit('messageUpdated', messages);
}
