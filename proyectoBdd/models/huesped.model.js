const Huesped = require('./schemas/huesped.entity');

const getHuespedesModel = async () =>{
    return await Huesped.find();
}
const getHuespedModel = async (name) => {
    return await Huesped.find({nombre : name});
}
const deleteHuespedModel = async (name) => {
    return await Huesped.deleteOne({nombre : name});
}
const updateHuespedModel = async (name,  )