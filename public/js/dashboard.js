document.addEventListener('DOMContentLoaded', () => {
     const token = localStorage.getItem('token');
     if (!token) {
       alert('Please log in first');
       window.location.href = 'login.html';
     }
   
     // Event listener for adding a new patient record
     document.getElementById('addPatientForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      //const patientData = {
      //    name: document.getElementById('patientName').value,
       //   age: document.getElementById('patientAge').value,
       //   contactInfo: document.getElementById('patientContact').value,
       //   medicalHistory: document.getElementById('patientMedicalHistory').value,
       //   doctorId: '123456'  // Sample doctor ID; replace as needed
      //};

      const patientData = {
        name: document.getElementById('patientName').value,
        age: parseInt(document.getElementById('patientAge').value, 10), // Convert age to a number
        contactInfo: document.getElementById('patientContact').value,
        phoneNumber: document.getElementById('patientPhone').value, // Added phone number
        dob: document.getElementById('patientDob').value, // Added date of birth
        gender: document.getElementById('patientGender').value, // Added gender
        currentMedication: document.getElementById('patientCurrentMedication').value || '', // Added current medication
        medicalHistory: document.getElementById('patientMedicalHistory').value.split(','), // Split by commas to create an array
        doctorId: '123456', // Sample doctor ID; replace as needed
      };
  
      try {
          const response = await fetch('/patients', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  // Uncomment the following line if using token-based authentication
                  // Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(patientData),
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Something went wrong');
          }
  
          const createdPatient = await response.json();
          
          // Store the newly created patient's ID in sessionStorage
          sessionStorage.setItem('selectedPatientId', createdPatient._id);
          console.log('Patient added:', createdPatient);
          console.log('New Patient ID:', createdPatient._id);  // Log the new patient ID for verification
  
          alert('Patient added successfully!');
  
          // Optionally, redirect to the profile page
          window.location.href = '/profile.html';
          
          // Reset the form
          document.getElementById('addPatientForm').reset();
          
      } catch (error) {
          console.error('Error adding patient:', error);
          alert('Failed to add patient: ' + error.message);
      }
  });
  
  
     // Schedule an appointment
     document.getElementById('addAppointmentForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const appointmentData = {
          patientId: sessionStorage.getItem('selectedPatientId'),
          doctorId: document.getElementById('appointmentDoctorId').value,
          date: document.getElementById('appointmentDate').value,
      };
  
      try {
          const response = await fetch('/appointments', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Assuming token is defined elsewhere
              },
              body: JSON.stringify(appointmentData),
          });
  
          if (!response.ok) {
              // If the response is not ok, handle the error accordingly
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to schedule appointment');
          }
  
          const result = await response.json(); // Assuming a successful response returns appointment data
          alert('Appointment scheduled successfully!');
          console.log(result); // Log the result for debugging
  
      } catch (error) {
          console.error('Error scheduling appointment:', error);
          alert(`Error: ${error.message}`); // Alert user with the error message
      }
  });
  
   
     // Add a medical history event
     document.getElementById('addHistoryForm').addEventListener('submit', async (e) => {
       e.preventDefault();
       const historyData = {
         patientId: document.getElementById('historyPatientId').value,
         event: document.getElementById('medicalEvent').value,
       };
   
       await fetch('/medical-history', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(historyData),
       });
     });
   
     // Add a new prescription
     document.getElementById('addPrescriptionForm').addEventListener('submit', async (e) => {
       e.preventDefault();
       const prescriptionData = {
         patientId: document.getElementById('prescriptionPatientId').value,
         medication: document.getElementById('medication').value,
         dosage: document.getElementById('dosage').value,
         frequency: document.getElementById('frequency').value,
       };
   
       await fetch('/prescriptions', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(prescriptionData),
       });
     });
   
     // Logout function
     document.getElementById('logoutButton').addEventListener('click', () => {
       localStorage.removeItem('token');
       alert('Logged out successfully');
       window.location.href = 'login.html';
     });


     // adding ocr sccript code here...
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
             console.log('OCR Response:', result);  // Log the response for debugging
             //ocrResult.textContent = result.text || 'No text extracted';
             ocrResult.textContent = result.extractedText || 'galti dasbord js me hai';
         } catch (error) {
             console.error('Error:', error);
             alert('Failed to extract text');
         }
     });



   });
  

   //---------dom contentends here------------///
   //set 


   
   // adding js for view profile page button
   document.getElementById('viewProfileBtn').addEventListener('click', () => {
    const patientId = sessionStorage.getItem('selectedPatientId'); // Retrieve dynamically
    console.log('Patient ID:', patientId);
    if (patientId) {
        window.location.href = `/profile.html?patientId=${patientId}`;
    } else {
        alert('No patient selected');
    }
});
