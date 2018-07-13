var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Bar Bazz',
        text: 'Zzzzz'
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected.');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
});
