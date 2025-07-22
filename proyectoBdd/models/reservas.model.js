const Reserva = require('./schemas/reservas.entity');
const Habitacion = require('./schemas/habitacion.entity');
const Huesped = require('./schemas/huesped.entity');


const createReservaModel = async (reservaData) =>{
    try {
        const resultado = await Reserva.create(reservaData);
        if (resultado === null) {
            console.log('Error al crear la reserva');
            return resultado;
        } else {
            console.log('Reserva creada con exito');
            return resultado;
        }
    } catch (error) {
        console.log('Error al crear la Reserava:', error);
        throw error;
    }
};
const cancelarReservaModel = async (reservaId) =>{
    try {
        const turno = await Reserva.findById(reservaId);
        if (turno === null) {
            console.log('No se encontro reserva para cancelar');
            return turno;
        } else if (turno.estado === 'pendiente') {
            turno.estado = 'cancelada';
            turno.save()
            return turno;
        }
    } catch (error) {
        console.log('Error al cancelar la Reserava:', error);
        throw error;
    }
}


const registrarCheckIn = async (reservaId) => {
    try {
        // Buscar la reserva
        const reserva = await Reserva.findById(reservaId);
        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }
        reserva.estado = 'en servicio'; 
        reserva.fechaIngreso = new Date();
        await reserva.save();
        return { message: 'Check-in registrado correctamente', reserva };
    } catch (error) {
        console.error('Error en registrar check-in:', error.message);
        throw error;
    }
};
const getReservasModel = async()=>{
    try {
        const reservas = await Reserva.find();
        return reservas;
    } catch (error) {
        console.error('Error al obtener reservas del huésped:', error.message);
        throw error;
    }
}
const getReservasHuesped = async (huespedId) => {
    try {
        const reservas = await Reserva.find({ 'huesped._id': huespedId });
        return reservas;
    } catch (error) {
        console.error('Error al obtener reservas del huésped:', error.message);
        throw error;
    }
};
const getHabitacionesDisponibles = async (fechaEntrada, fechaSalida, tipo) => {
    try {
        if (fechaEntradaDate >= fechaSalidaDate) {
            throw new Error('La fecha de entrada debe ser anterior a la de salida');
        };
        const fechaEntradaDate = new Date(fechaEntrada);
        const fechaSalidaDate = new Date(fechaSalida);

        const disponibleHabitacion = await Reserva.find({
                fechaEntrada: { $lte: fechaSalidaDate },
                fechaSalida: { $gte: fechaEntradaDate }
        });

        const disponibles = disponibleHabitacion.map(r => r.habitacion);
        const query = {
            _id: { $nin: disponibles }
        };
        if (tipo) {
            query.tipo = tipo;
        }
        const habitacionesDisponibles = await Habitacion.find(query);
        return habitacionesDisponibles;
    } catch (error) {
    console.error('Error al consultar habitaciones disponibles:', error.message);
    throw error;
    }
};
const getReservaIdModel = async (idReserva)=>{
        try {
        const reservas = await Reserva.findById(idReserva);
        return reservas;
    } catch (error) {
        console.error('Error al obtener reservas del huésped:', error.message);
        throw error;
    }
}


module.exports = {
    registrarCheckIn,
    getReservasHuesped,
    cancelarReservaModel,
    createReservaModel,
    getHabitacionesDisponibles,
    getReservasModel,
    getReservaIdModel
};