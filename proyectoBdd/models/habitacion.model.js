const Habitacion = require('./schemas/habitacion.entity');
const Reserva = require('./schemas/reservas.entity');

// Buscar todas las habitaciones
const getHabitacionesModel = async () => {
    try {
    return await Habitacion.find();
    } catch (error) {
    console.error('Error buscar habitaciones: ', error.message);
    throw error;
    }
};

// Buscar una habitación por ID
const getHabitacionModel = async (idHabitacion) => {
    try {
    const resultado = await Habitacion.findById(idHabitacion);
    if (resultado === null) {
        console.log('No se encontro Habitacion con ese ID');
        return resultado;
    } else {
        console.log(resultado);
        return resultado;
    }
    } catch (error) {
    console.error('Error buscar habitaciones: ', error.message);
    throw error;
    }
};

// Crear una habitación
const createHabitacionModel = async (nuevaHabitacion) => {
    try {
    if (nuevaHabitacion instanceof Habitacion || typeof nuevaHabitacion === 'object') {
        const resultado = await Habitacion.create(nuevaHabitacion);
        console.log('Habitacion creada con exito:', resultado);
        return resultado;
    } else {
        console.log('Debe ser un objeto de habitacion para crear');
    }
    } catch (error) {
    console.log('Error al crear la Habitacion:', error);
    throw error;
    }
};

// Eliminar una habitación
const deleteHabitacionModel = async (idHabitacion) => {
    try {
    const cuarto = await Habitacion.findByIdAndDelete(idHabitacion);
    if (cuarto === null) {
        console.log('No se encontro habitacion con ese ID');
        return cuarto;
    } else {
        return { message: 'Habitacion eliminada' };
    }
    } catch (error) {
    console.log('Error al eliminar la Habitacion:', error);
    throw error;
    }
};

// Actualizar una habitación
const updateHabitacionModel = async (idHabitacion, nuevaHabitacion) => {
    try {
    if (typeof nuevaHabitacion === 'object') {
        const cuarto = await Habitacion.findByIdAndUpdate(idHabitacion, nuevaHabitacion, { new: true });
        if (cuarto === null) {
        console.log('No se encontro Habitacion para hacer cambios');
        return null;
        } else {
        console.log('Cambios aplicados:', cuarto);
        return cuarto;
        }
    } else {
        console.log('Debe enviar un objeto con los cambios');
    }
    } catch (error) {
    console.error('Error al actualizar habitación:', error.message);
    throw error;
    }
};

const getHabitacionesDisponibles = async (fechaEntrada, fechaSalida, tipo, precioMax) => {
    try {
    const fechaEntradaDate = new Date(fechaEntrada);
    const fechaSalidaDate = new Date(fechaSalida);

    const reservasSuperpuestas = await Reserva.find({
        $or: [
        {
            fechaEntrada: { $lte: fechaSalidaDate },
            fechaSalida: { $gte: fechaEntradaDate }
        }
        ]
    });

    const habitacionesReservadasIds = reservasSuperpuestas.map(r => r.habitacion);

    const query = {
        _id: { $nin: habitacionesReservadasIds }
    };

    if (tipo) {
        query.tipo = tipo;
    }

    if (precioMax) {
        query.precio = { $lte: parseFloat(precioMax) };
    }

    const habitacionesDisponibles = await Habitacion.find(query);
    return habitacionesDisponibles;
    } catch (error) {
    console.error('Error al consultar habitaciones disponibles:', error.message);
    throw error;
    }
};

module.exports = {
    getHabitacionesModel,
    getHabitacionModel,
    createHabitacionModel,
    deleteHabitacionModel,
    updateHabitacionModel,
    getHabitacionesDisponibles
};