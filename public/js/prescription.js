// public/js/prescription.js
document.addEventListener('DOMContentLoaded', async () => {
     const prescriptionId = sessionStorage.getItem('selectedPrescriptionId'); // Save prescription ID in sessionStorage before navigation
   
     if (prescriptionId) {
       try {
         const response = await fetch(`/prescriptions/${prescriptionId}`);
         if (!response.ok) {
           throw new Error('Failed to fetch prescription data');
         }
         const prescription = await response.json();
   
         const prescriptionDetailsDiv = document.getElementById('prescriptionDetails');
         prescriptionDetailsDiv.innerHTML = `
           <p><strong>Patient ID:</strong> ${prescription.patientId}</p>
           <p><strong>Medication Name:</strong> ${prescription.medication}</p>
           <p><strong>Dosage:</strong> ${prescription.dosage}</p>
           <p><strong>Frequency:</strong> ${prescription.frequency}</p>
           <p><strong>Instructions:</strong> ${prescription.instructions || 'N/A'}</p>
           <p><strong>Date Issued:</strong> ${new Date(prescription.dateIssued).toLocaleDateString()}</p>
         `;
       } catch (error) {
         console.error('Error displaying prescription:', error);
       }
     } else {
       console.error('No prescription ID provided');
     }
   });
    

   // Function to view a specific prescription
function viewPrescription(prescriptionId) {
     sessionStorage.setItem('selectedPrescriptionId', prescriptionId);
     window.location.href = 'prescription.html';
   }
   