const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');

const publicPath = path.join(__dirname + '/../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


// app.get('/', (req, res) => {
//     res.sendFile(publicPath + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if ( !isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room name are required.');
        }
        socket.join(params.room);
        // corresponding method: socket.leave('Room Name');

        // ways to emit to specific room:
        // io.to('Room Name').emit
        // socket.broadcast.to('Room Name').emit
        // socket.emit <- to single user
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));    
        callback();
    });

    socket.on('createMessage', (newMsg, callback) => {
        console.log('createMessage', newMsg);
        io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));
        callback();
    });

    // socket.on('createLocationMessage', (coords) => {
    //     io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    // });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
        console.log('User disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};

