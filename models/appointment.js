const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctorId: String,
  date: Date,
  time: String,
  status: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
