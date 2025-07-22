const express = require('express');
const router = express.Router();
const {
    getHabitacionesModel,
    getHabitacionModel,
    createHabitacionModel,
    updateHabitacionModel,
    deleteHabitacionModel
} = require('../../models/habitacion.model');

// GET /api/habitaciones - list all
router.get('/', async (req, res) => {
    try {
    const habitaciones = await getHabitacionesModel();
    res.json(habitaciones);
    } catch (err) {
    res.status(500).json({ message: 'Error al obtener habitaciones', error: err.message });
    }
});

// GET: habitaciones disponibles en rango sin reserva
router.get('/disponibles', async (req, res) => {
    const { fechaEntrada, fechaSalida, tipo, precioMax } = req.query;
  // Aquí llamaremos a una función que devolverá habitaciones disponibles
  // Esto lo hacemos después en el modelo
    const disponibles = await getHabitacionesDisponibles(fechaEntrada, fechaSalida, tipo, precioMax);
    res.json(disponibles);
});

// GET /api/habitaciones/:id - get by ID
router.get('/:id', async (req, res) => {
    try {
        const habitacion = await getHabitacionModel(req.params.id);
    if (habitacion) {
        res.json(habitacion);
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Error al buscar la habitación', error: err.message });
    }
});

// POST /api/habitaciones - crear una
router.post('/', async (req, res) => {
    try {
    const nuevaHabitacion = req.body;
    const resultado = await createHabitacionModel(nuevaHabitacion);
    res.status(201).json(resultado);
    } catch (err) {
    res.status(500).json({ message: 'Error al crear la habitación', error: err.message });
    }
});

// PUT /api/habitaciones/:id - actualizar
router.put('/:id', async (req, res) => {
    try {
    const actualizado = await updateHabitacionModel(req.params.id, req.body);
    if (actualizado) {
        res.json(actualizado);
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Error al actualizar', error: err.message });
    }
});

// DELETE /api/habitaciones/:id - eliminar
router.delete('/:id', async (req, res) => {
    try {
    const eliminado = await deleteHabitacionModel(req.params.id);
    if (eliminado) {
        res.json({ message: 'Habitación eliminada' });
    } else {
        res.status(404).json({ message: 'Habitación no encontrada' });
    }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar', error: err.message });
    }
});

module.exports = router;