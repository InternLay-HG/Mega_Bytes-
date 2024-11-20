// Function to fetch and display patient data on the profile page
async function loadPatientData(patientId) {
    try {
        const response = await fetch(`/patients/${patientId}`); // Fetch data from the backend API
        if (!response.ok) {
            throw new Error('Failed to fetch patient data');
        }
        const patientData = await response.json();

        // Display data in the profile fields
        document.getElementById('displayPatientName').textContent = patientData.name || 'N/A';
        document.getElementById('displayPatientAge').textContent = patientData.age || 'N/A';
        document.getElementById('displayPatientContact').textContent = patientData.contactInfo || 'N/A';
        document.getElementById('displayPatientPhone').textContent = patientData.phoneNumber || 'N/A';
        document.getElementById('displayPatientDob').textContent = patientData.dob || 'N/A';
        document.getElementById('displayPatientGender').textContent = patientData.gender || 'N/A';
        document.getElementById('displayPatientMedication').textContent = patientData.currentMedication || 'None';
        document.getElementById('displayPatientHistory').textContent = 
          patientData.medicalHistory && patientData.medicalHistory.length 
            ? patientData.medicalHistory.join(', ') 
            : 'No medical history available';
        
        // Display patient ID and doctor ID
        document.getElementById('patientIdDisplay').textContent = `Patient ID: ${patientData._id}`;
        document.getElementById('doctorIdDisplay').textContent = `Doctor ID: ${patientData.doctorId}`;

        // If appointments and lab reports are stored as arrays, display them as lists
        displayList('patientAppointments', patientData.appointments);
        displayList('patientLabReports', patientData.labReports);
    } catch (error) {
        console.error('Error fetching patient data:', error);
        document.getElementById('patientIdDisplay').textContent = 'Patient ID: N/A';
        document.getElementById('doctorIdDisplay').textContent = 'Doctor ID: N/A';
    }
}

// Helper function to display lists like appointments and lab reports
function displayList(elementId, items) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = ''; // Clear any existing content

    if (items && items.length > 0) {
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listElement.appendChild(listItem);
        });
    } else {
        listElement.innerHTML = '<li>No records found</li>';
    }
}

// Load the patient data once the page has loaded
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('patientId'); // Get patient ID from query parameters
    
    if (patientId) {
        loadPatientData(patientId); // Call the function to load data
    } else {
        console.error('No patient ID found in URL');
    }
});
