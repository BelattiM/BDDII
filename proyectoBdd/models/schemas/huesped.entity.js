const mongoose = require('mongoose');

const huespedSchema = new mongoose.Schema({
    nombre : String,
    email : String,
    telefono : String
});

module.exports = mongoose.model('Huesped', huespedSchema);