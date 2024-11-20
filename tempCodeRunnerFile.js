const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/user');
const patientRoutes = require('./routes/patientroutes');
const appointmentRoutes = require('./routes/appointmentroutes');
const prescriptionRoutes = require('./routes/prescriptionroutes');
const labRoutes = require('./routes/labroutes');
const prescriptioncontroller = require('./controllers/prescriptioncontroller');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: './uploads/userdata' });
const ocrRoutes = require('./routes/ocrRoutes');
dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
});


//app.get('/prescriptions/:id', prescriptioncontroller.getPrescriptionById);

// Use API routes
app.use('/auth', userRoutes); // This mounts '/auth/register', '/auth/login', etc.
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/lab-results', labRoutes);
app.use('/api/ocr', ocrRoutes);
console.log("OCR Routes are being used at /api/ocr");
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
