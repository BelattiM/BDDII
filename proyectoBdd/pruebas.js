const Huesped = require('./models/schemas/huesped.entity');
const Habitacion = require('./models/schemas/habitacion.entity');
const Reserva = require('./models/schemas/reservas.entity');

const crearReserva = async () => {
  try {
    // Crear huésped
    const huesped = await Huesped.create({
      nombre: 'Valentina Ruiz',
      email: 'valentina.ruiz@example.com',
      telefono: '5491133344455'
    });

    // Crear habitación
    const habitacion = await Habitacion.create({
      numero: '405',
      tipo: 'suite doble',
      capacidad: 4,
      precio: 14000,
      amenidades: ['Wi-Fi', 'Desayuno', 'Pileta', 'TV'],
      disponible: true
    });

    // Crear reserva
    const reserva = await Reserva.create({
      huesped: huesped._id,
      habitacion: habitacion._id,
      fechaEntrada: new Date('2025-08-10'),
      fechaSalida: new Date('2025-08-13'),
      noches: 3,
      precioTotal: habitacion.precio * 3,
      estado: 'confirmada',
      fechaReserva: new Date()
    });

    console.log('✅ Reserva creada:\n', reserva);
  } catch (error) {
    console.error('❌ Error al crear la reserva:', error.message);
  }
};

module.exports = crearReserva;