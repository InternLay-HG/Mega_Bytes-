// models/Prescription.js
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true,
    },
    medication: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assum kiya hai abhi ki  we  have a User model for doctors
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Prescription model
module.exports = mongoose.model('Prescription', prescriptionSchema);
