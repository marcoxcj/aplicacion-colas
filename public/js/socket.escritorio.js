// Comando para establecer la conexión

var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === 'No hay mas tickets') {
            label.text(res);
            alert(res);
            return;
        }

        label.text('Ticket ' + res.numero);
    });
})