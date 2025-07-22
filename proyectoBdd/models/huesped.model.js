const Huesped = require('./schemas/huesped.entity');
const Reserva = require('./schemas/reservas.entity');

const getHuespedesModel = async () => {
    try {
        return await Huesped.find();
    } catch (error) {
        console.error('Error al buscar Huespedes:', error.message);
        throw error;
    }
};

const getHuespedModel = async (name) => {
    try {
        return await Huesped.find({ nombre: name });
    } catch (error) {
        console.error('Error al buscar Huesped por nombre:', error.message);
        throw error;
    }
};

const createHuespedModel = async (nuevoHuesped) => {
    try {
        if (nuevoHuesped instanceof Huesped || typeof nuevoHuesped === 'object') {
            const resultado = await Huesped.create(nuevoHuesped);
            console.log('Huesped creado con exito:', resultado);
            return resultado;
        } else {
            console.log('Debe ser un objeto de Huesped para crear');
            return null;
        }
    } catch (error) {
        console.log('Error al crear el Huesped:', error);
        throw error;
    }
};

const deleteHuespedModel = async (idHuesped) => {
    try {
        const resultado = await Huesped.findByIdAndDelete(idHuesped);
        if (resultado === null) {
            console.log('Huesped no fue encontrado');
            return null;
        } else {
            console.log('Huesped eliminado con éxito');
            return resultado;
        }
    } catch (error) {
        console.error('Error al eliminar Huesped:', error.message);
        throw error;
    }
};

const updateHuespedModel = async (idHuesped, nuevoHuesped) => {
    try {
        if (typeof nuevoHuesped === 'object') {
            const resultado = await Huesped.findByIdAndUpdate(idHuesped, nuevoHuesped, { new: true });
            if (resultado === null) {
                console.log('No se encontró Huesped para hacer cambios');
                return null;
            } else {
                console.log('Cambios aplicados:', resultado);
                return resultado;
            }
        } else {
            console.log('Mandaste mal el Huesped');
            return null;
        }
    } catch (error) {
        console.error('Error al actualizar Huesped:', error.message);
        throw error;
    }
};

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

const getReservasHuesped = async (huespedId) => {
    try {
        const reservas = await Reserva.find({ 'huesped._id': huespedId });
        return reservas;
    } catch (error) {
        console.error('Error al obtener reservas del huésped:', error.message);
        throw error;
    }
};

module.exports = {
    getHuespedesModel,
    getHuespedModel,
    createHuespedModel,
    deleteHuespedModel,
    updateHuespedModel,
    registrarCheckIn,
    getReservasHuesped
};