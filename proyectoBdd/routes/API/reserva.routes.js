const express = require('express');
const router = express.Router();

const {
    getReservasModel,
    getReservaModel,
    createReservaModel,
    updateReservaModel,
    deleteReservaModel
} = require('../../models/schemas/reservas.entity');

// Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
    const reservas = await getReservasModel();
    res.json(reservas);
    } catch (err) {
    res.status(500).json({ message: 'Error al obtener reservas', error: err.message });
    }
});

// Obtener reserva por ID
router.get('/:id', async (req, res) => {
    try {
    const reserva = await getReservaModel(req.params.id);
    if (reserva) {
        res.json(reserva);
    } else {
        res.status(404).json({ message: 'Reserva no encontrada' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Error al buscar reserva', error: err.message });
    }
});

// Crear reserva
router.post('/', async (req, res) => {
    try {
    const nuevaReserva = req.body;
    const resultado = await createReservaModel(nuevaReserva);
    res.status(201).json(resultado);
    } catch (err) {
    res.status(500).json({ message: 'Error al crear reserva', error: err.message });
    }
});

// Actualizar reserva
router.put('/:id', async (req, res) => {
    try {
    const actualizada = await updateReservaModel(req.params.id, req.body);
    if (actualizada) {
        res.json(actualizada);
    } else {
        res.status(404).json({ message: 'Reserva no encontrada' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Error al actualizar reserva', error: err.message });
    }
});

// Eliminar reserva
router.delete('/:id', async (req, res) => {
    try {
    const eliminado = await deleteReservaModel(req.params.id);
    if (eliminado) {
        res.json({ message: 'Reserva eliminada' });
    } else {
        res.status(404).json({ message: 'Reserva no encontrada' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Error al eliminar reserva', error: err.message });
    }
});

module.exports = router;