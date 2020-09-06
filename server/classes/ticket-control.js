const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();

        let data = require('../data/data.json');
        this.tickets = [];
        this.ultimos4 = [];


        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {

        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay mas tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        //Elimina primera posicion de arreglo
        this.tickets.shift();

        //Creo un nuevo ticket que se va atender
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        //agrega ticket al inicio del arreglo
        this.ultimos4.unshift(atenderTicket);

        //verificar que solo existan 4 tickets en el arreglo ultimos4
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Borra el ultimo
        }

        console.log('Ultimos cuatro');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log("inicializado el sistema");

        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}



module.exports = {
    TicketControl
}