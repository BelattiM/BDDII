const Habitacion = require('./schemas/habitacion.entity');

const getHabitacionesModel = async ()=>{
    try {
        return await Habitacion.find();
    } catch (error) {
        console.error('Error buscar habitaciones: ', error.message);
        throw error;
    }
};
const getHabitacionModel = async (idHabitacion) =>{
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
const createHabitacionModel = async (nuevaHabitacion) =>{
    try {
        if (nuevaHabitacion instanceof Habitacion) {
            const resultado = await Habitacion.create(nuevaHabitacion); 
            console.log('Habitacion creada con exito' + resultado);
            return resultado;
        } else {
            console.log('debe ser parametro de habitacion si no no se puede crear');
        }
    } catch (error) {
        console.log('Error al crear la Habitacion: ' + error);
        throw error;
    }
};
const deleteHabitacionModel = async (idHabitacion) =>{
    try {
        const cuarto = await Habitacion.findByIdAndDelete(idHabitacion);
        if (cuarto === null) {
            console.log('No se encontro habitacion con ese ID');
            return cuarto;
        } else {
            const resultado = await Habitacion.deleteOne({_id : cuarto._id});
            return resultado;
        }
    } catch (error) {
        console.log('Error al eliminar la Habitacion: ' + error);
        throw error;
    }
};
const updateHabitacionModel = async (idHabitacion, nuevaHabitacion) =>{
    try {
        if (nuevaHabitacion instanceof Habitacion) {
            const cuarto = await Habitacion.findByIdAndUpdate(idHabitacion, nuevaHabitacion);
            if (cuarto === null) {
                console.log("No se encontro Habitacion para hacer cambios");
            } else {
                await cuarto.save();
                console.log('Cambios aplicados: ' + cuarto);
                return cuarto
            }
        } else {
            console.log('No mandaste una nueva habitacion');
        }
    } catch (error) {
        console.error('Error al actualizar habitación:', error.message);
        throw error;
    }
};

module.exports = {
    getHabitacionesModel,
    createHabitacionModel,
    deleteHabitacionModel,
    updateHabitacionModel
};