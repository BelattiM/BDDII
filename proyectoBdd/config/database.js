const mongoose = require('mongoose');

const connectDb = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/miHotelDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        console.log('Conectado a MongoDB');
        
    }catch (error) {
            console.error('Error de conexión:', error);
        }   
}
module.exports = connectDb;
