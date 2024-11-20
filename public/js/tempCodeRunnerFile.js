document.addEventListener('DOMContentLoaded', () => {
     const token = localStorage.getItem('token');
     if (!token) {
       alert('Please log in first');
       window.location.href = 'login.html';
     }
   
     // Event listener for adding a new patient record
     document.getElementById('addPatientForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const patientData = {
          name: document.getElementById('patientName').value,
          age: document.getElementById('patientAge').value,
          contactInfo: document.getElementById('patientContact').value,
          medicalHistory: document.getElementById('patientMedicalHistory').value,
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
          console.log('Patient added:', createdPatient);
          alert('Patient added successfully!');
          // Optionally, reset the form or navigate to another page
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
         patientId: document.getElementById('appointmentPatientId').value,
         doctorId: document.getElementById('appointmentDoctorId').value,
         date: document.getElementById('appointmentDate').value,
       };
   
       await fetch('/appointments', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(appointmentData),
       });
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
   });

   //set 
   function selectPatient(patientId) {
    sessionStorage.setItem('selectedPatientId', patientId);
    alert('Patient selected successfully!');
}

   
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
