const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
    numero : String,
    tipo : String,
    capacidad : Number,
    precio : Number,
    amenidades : [String],
    disponible : Boolean
});

module.exports = mongoose.model('Habitacion', habitacionSchema);
