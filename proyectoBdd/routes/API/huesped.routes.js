const express = require('express');
const router = express.Router();

const {
    getHuespedesModel,
    getHuespedModel,
    createHuespedModel,
    updateHuespedModel,
    deleteHuespedModel,
    registrarCheckIn,
    getReservasHuesped
} = require('../../models/huesped.model');

// Obtener todos los huéspedes
router.get('/', async (req, res) => {
    try {
        const huespedes = await getHuespedesModel();
        res.json(huespedes);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener huéspedes', error: err.message });
    }
});

// Obtener un huésped por ID
router.get('/:id', async (req, res) => {
    try {
        const huesped = await getHuespedModel(req.params.id);
        if (huesped) {
            res.json(huesped);
        } else {
            res.status(404).json({ message: 'Huesped no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al buscar huésped', error: err.message });
    }
});

// Crear un nuevo huésped
router.post('/', async (req, res) => {
    try {
        const nuevoHuesped = req.body;
        const resultado = await createHuespedModel(nuevoHuesped);
        res.status(201).json(resultado);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear huésped', error: err.message });
    }
});

// Actualizar un huésped
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await updateHuespedModel(req.params.id, req.body);
        if (actualizado) {
            res.json(actualizado);
        } else {
            res.status(404).json({ message: 'Huesped no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar huésped', error: err.message });
    }
});

// Eliminar un huésped
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await deleteHuespedModel(req.params.id);
        if (eliminado) {
            res.json({ message: 'Huesped eliminado' });
        } else {
            res.status(404).json({ message: 'Huesped no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar huésped', error: err.message });
    }
});

// Registrar entrada del huésped (check-in)
// Ejemplo: PUT /api/huespedes/checkin/:reservaId
router.put('/checkin/:reservaId', async (req, res) => {
    try {
        const resultado = await registrarCheckIn(req.params.reservaId);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ message: 'Error en check-in', error: err.message });
    }
});

// Obtener historial de reservas del huésped
// Ejemplo: GET /api/huespedes/historial/:huespedId
router.get('/historial/:huespedId', async (req, res) => {
    try {
        const historial = await getReservasHuesped(req.params.huespedId);
        res.json(historial);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener historial', error: err.message });
    }
});

module.exports = router;