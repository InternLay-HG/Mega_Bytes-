document.addEventListener('DOMContentLoaded', () => {
     const extractTextBtn = document.getElementById('extractTextBtn');
     const ocrImageInput = document.getElementById('ocrImageInput');
     const ocrResult = document.getElementById('ocrResult');
 
     extractTextBtn.addEventListener('click', async () => {
         if (ocrImageInput.files.length === 0) {
             alert('Please select an image file');
             return;
         }
 
         const formData = new FormData();
         formData.append('image', ocrImageInput.files[0]);
 
         try {
             const response = await fetch('/api/ocr/process-image', {
                 method: 'POST',
                 body: formData,
             });
 
             if (!response.ok) {
                 throw new Error('OCR extraction failed');
             }
 
             const result = await response.json();
             console.log('OCR Response:', result); // Log the response for debugging
             ocrResult.textContent = result.extractedText || 'Error: No text extracted';
         } catch (error) {
             console.error('Error:', error);
             alert('Failed to extract text');
         }
     });
 });
 