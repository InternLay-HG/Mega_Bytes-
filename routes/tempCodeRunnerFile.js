// routes/appointment.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Appointment = require('../models/appointment');
const { sendEmail } = require('../utils/emailservice');

// Schedule a new appointment
router.post('/', async (req, res) => {
    const { patientId, doctorId, date, patientEmail } = req.body;

    // Validate patient ID
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ message: 'Invalid patient ID' });
    }

    // Validate doctor ID
    if (!doctorId || typeof doctorId !== 'string') {
        return res.status(400).json({ message: 'Invalid doctor ID' });
    }

    // Create the new appointment
    try {
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            date,
        });

        await newAppointment.save();

        // Send an email after scheduling the appointment
        const emailSubject = 'Appointment Scheduled';
        const emailText = `
          Dear Patient,

          Your appointment has been successfully scheduled with doctor ID: ${doctorId}.

          Appointment Date: ${date}

          Thank you for using our service!

          Regards,
          Healthcare System Team
        `;

        // Call sendEmail function to send the email notification
        await sendEmail(patientEmail, emailSubject, emailText);

        res.status(201).json(newAppointment); // Send the created appointment back in the response
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(400).json({ message: error.message });
    }
});


// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific appointment by ID
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
