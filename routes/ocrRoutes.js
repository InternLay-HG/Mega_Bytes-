// routes/ocrRoutes.js
const express = require('express');
const multer = require('multer');
const { processImageForOCR } = require('../controllers/ocrController');
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
      dest: 'uploads/',
      fileFilter: (req, file, cb) => {
          const fileTypes = /jpeg|jpg|png|gif/;
          const mimeType = fileTypes.test(file.mimetype);
          const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
          
          if (mimeType && extname) {
              return cb(null, true); // Accept the file
          } else {
              cb(new Error('Only image files are allowed!'), false); // Reject the file
          }
      }
     });

// Route for OCR processing
console.log("OCR Routes loaded");  //for debuging error
router.post('/process-image', upload.single('image'), processImageForOCR);

module.exports = router;
