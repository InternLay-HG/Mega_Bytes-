// utils/ocrService.js
const Tesseract = require('tesseract.js');

const extractTextFromImage = (imagePath) => {
    return new Promise((resolve, reject) => {
        Tesseract.recognize(
            imagePath,
            'eng',  // Specify language
            {
                logger: (m) => console.log(m),  // Log progress for debugging
            }
        )
        .then(({ data: { text } }) => {
            if (text) {
                console.log('Extracted text:', text);  // Log extracted text for debugging
                resolve(text);
            } else {
                console.error('No text extracted');
                reject(new Error('No text extracted'));
            }
        })
        .catch((error) => {
            console.error('OCR Error:', error);
            reject(error);
        });
    });
};

module.exports = extractTextFromImage;
