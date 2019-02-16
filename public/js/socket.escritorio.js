var socket = io();

var serarchParams = new URLSearchParams(window.location.search);

if (!serarchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesatio');
}

var escritorio = serarchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert('No hay más tickets');
            return;
        }
        label.text(' Ticket: ' + resp.numero)
    });
});