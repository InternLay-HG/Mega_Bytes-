// models/LabResult.js
const mongoose = require('mongoose');

const labResultSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Refere to the Patient model
        required: true,
    },
    filePath: {
        type: String,
        required: true, // Path to the uploaded lab result file
    },
    fileType: {
        type: String,
        required: true, // MIME type of the file  'application/pdf' hai
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the LabResult model
module.exports = mongoose.model('LabResult', labResultSchema);
