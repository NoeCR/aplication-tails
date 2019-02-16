const { io } = require('../server');
const { TicketControl } = require('../clasess/ticket-control')

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log('El siguiente ticket es:', siguiente);
        callback(siguiente);
    });

    // emitir evento llamado estadoActual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let aternderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(aternderTicket);
        //emitir ultimos4
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });
    });
});