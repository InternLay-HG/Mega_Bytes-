const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contactInfo: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Added for phone number
  dob: { type: Date, required: true }, // Added for date of birth
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Added for gender
  currentMedication: { type: String, default: '' }, // Added for current medication (optional)
  medicalHistory: { type: [String], default: [] }, // Array of strings for medical history
  doctorId: { type: String, required: true }, // Assuming a doctor ID is always required
});

module.exports = mongoose.model('Patient', patientSchema);
