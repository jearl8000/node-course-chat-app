const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('createMessage', (newMsg) => {
        console.log('createMessage', newMsg);
        io.emit('newMessage', {
            from: newMsg.from,
            text: newMsg.text,
            createdAt: new Date().getTime()
        });
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

