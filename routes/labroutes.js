// routes/lab.js
const express = require('express');
const router = express.Router();
const LabResult = require('../models/labresult');
const multer = require('multer');
const path = require('path');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    },
});
const upload = multer({ storage: storage });

// Upload a lab result
router.post('/', upload.single('labResultFile'), async (req, res) => {
    try {
        const labResult = new LabResult({
            patientId: req.body.patientId,
            filePath: req.file.path,
            fileType: req.file.mimetype,
        });
        await labResult.save();
        res.status(201).json(labResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all lab results
router.get('/', async (req, res) => {
    try {
        const labResults = await LabResult.find();
        res.json(labResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific lab result by ID
router.get('/:id', async (req, res) => {
    try {
        const labResult = await LabResult.findById(req.params.id);
        if (!labResult) return res.status(404).json({ message: 'Lab result not found' });
        res.json(labResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a lab result
router.delete('/:id', async (req, res) => {
    try {
        const labResult = await LabResult.findByIdAndDelete(req.params.id);
        if (!labResult) return res.status(404).json({ message: 'Lab result not found' });
        res.json({ message: 'Lab result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
