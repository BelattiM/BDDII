const Huesped = require('./schemas/huesped.entity');

const getHuespedesModel = async () =>{
    try {
        return await Huesped.find();
    } catch (error) {
        console.error('Error al buscar Huespedes:', error.message);
        throw error;
    }
};
const getHuespedModel = async (name) => {
    try {
        return await Huesped.find({nombre : name});
    } catch (error) {
        console.error('Error al buscar Huesped por nombre:', error.message);
        throw error;        
    }
};
const createHuespedModel = async (nuevoHuesped) =>{
    try {
            if (nuevoHuesped instanceof Huesped) {
                const resultado = await Huesped.create(nuevaHabitacion); 
                console.log('Huesped creado con exito' + resultado);
                return resultado;
            } else {
                console.log('debe ser parametro de Huesped si no no se puede crear');
            }
        } catch (error) {
            console.log('Error al crear el Huesped: ' + error);
            throw error;
        }
};
const deleteHuespedModel = async (idHuesped) => {
    try {
        const resultado = await Huesped.findByIdAndDelete(idHuesped);
        if (resultado === null) {
            console.log('Huesped eliminado con exito');
            return resultado;
        } else {
            console.log('Huesped no fue encontrado');
            return resultado;
        }
    } catch (error) {
        console.error('Error al eliminar Huesped:', error.message);
        throw error;
    }
};
const updateHuespedModel = async (idHuesped, nuevoHuesped) =>{
    try {
        if (nuevoHuesped instanceof Huesped) {
            const resultado = await Huesped.findByIdAndUpdate(idHuesped, nuevoHuesped);
            if (resultado === null) {
                console.log('No se encontro Huesped para hacer cambios');
                return resultado;
            } else {
                await resultado.save();
                console.log('Cambios aplicados: ' + resultado);
                return resultado;
            }
        } else {
            console.log('Mandaste mal el Huesped');
        }
    } catch (error) {
        console.error('Error al actualizar Huesped: ', error.message);
        throw error;
    }
}
