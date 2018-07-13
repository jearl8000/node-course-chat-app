const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');


const publicPath = path.join(__dirname + '/../public');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


// app.get('/', (req, res) => {
//     res.sendFile(publicPath + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    socket.on('createMessage', (newMsg, callback) => {
        console.log('createMessage', newMsg);
        io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: newMsg.from,
        //     text: newMsg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};

