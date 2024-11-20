document.addEventListener('DOMContentLoaded', () => {
     const token = localStorage.getItem('token'); // Fetch the token from local storage
 
     // Event listener for scheduling an appointment
     document.getElementById('addAppointmentForm').addEventListener('submit', async (e) => {
         e.preventDefault();
 
         const appointmentData = {
             patientId: sessionStorage.getItem('selectedPatientId'), // Retrieve patient ID from session storage
             doctorId: document.getElementById('appointmentDoctorId').value,
             date: document.getElementById('appointmentDate').value,
         };
 
         try {
             const response = await fetch('/appointments', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`, // Include token for authentication
                 },
                 body: JSON.stringify(appointmentData),
             });
 
             if (!response.ok) {
                 // If the response is not ok, handle the error
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Failed to schedule appointment');
             }
 
             const result = await response.json(); // Parse the successful response
             alert('Appointment scheduled successfully!');
             console.log(result); // Log the result for debugging
         } catch (error) {
             console.error('Error scheduling appointment:', error);
             alert(`Error: ${error.message}`); // Alert user with the error message
         }
     });
 });
 