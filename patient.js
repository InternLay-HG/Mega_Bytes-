const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  contactInfo: String,
  medicalHistory: [String],
  doctorId: String,
});

module.exports = mongoose.model('Patient', patientSchema);
