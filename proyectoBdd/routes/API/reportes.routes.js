const express = require('express');
const router = express.Router();
const Reserva = require('../../models/schemas/reservas.entity');

// Reporte: cantidad de reservas en un mes
router.get('/ocupacion-mensual', async (req, res) => {
    try {
        const { mes, año } = req.query; // por ejemplo: mes=9 año=2023
        const fechaInicio = new Date(año, mes - 1, 1);
        const fechaFin = new Date(año, mes, 0, 23, 59, 59);
        const reservas = await Reserva.find({
            fechaEntrada: { $gte: fechaInicio, $lte: fechaFin }
        });
        res.json({ totalReservas: reservas.length, reservas });
    } catch (err) {
        res.status(500).json({ message: 'Error al generar reporte', error: err.message });
    }
});

module.exports = router;