const mongoose = require('mongoose');
const huesped = require('./huesped.entity');
const habitacion = require('./habitacion.entity');

const reservaSchema = new mongoose.Schema({
    habitacion : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Habitacion'
    },
    huesped : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Huesped'
    },
    fechaEntrada : Date,
    fechaSalida : Date,
    noches : Number,
    precioTotal : Number,
    estado : {
        type : String,
        enum : ["pendiente", "confirmada", "cancelada"],
        default : "pendiente"
    },
    fechaReserva : Date
});
module.exports = mongoose.model('Reserva', reservaSchema );