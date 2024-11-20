// routes/prescription.js
const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescription');

// Add a new prescription
router.post('/', async (req, res) => {
    try {
        const newPrescription = new Prescription(req.body);
        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all prescriptions
router.get('/', async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific prescription by ID
router.get('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id);
        if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
        res.json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a prescription
router.put('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
        res.json(prescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a prescription
router.delete('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
        res.json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
