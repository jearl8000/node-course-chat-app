var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

});
socket.on('disconnect', function() {
    console.log('Disconnected.');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Something something'
// }, function(data) {
//     console.log('message acknowledged, ', data);
// });

jQuery('#message-form').on('submit', function(evt) {
    evt.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});
