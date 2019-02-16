// comando para establecer la comunicacion 
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});
// Listener 
socket.on('estadoActual', function(resp) {
    label.text(resp.actual)
});
//Listener para los botones
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});