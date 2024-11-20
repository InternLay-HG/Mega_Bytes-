// utils/emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other service like 'Outlook', 'Yahoo', etc.
    auth: {
        user: 'sunnysinghchauhan082@gmail.com', // Replace with your email
        pass: 'mabickybketkwhwr', // Replace with your email password or app-specific password
    },
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: 'sunnysinghchauhan082@gmail.com', // sender address
            to:'sunny.2023ug1009@iiitranchi.ac.in', // receiver address
            subject,
            text, // plain text body
            html, // html body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = {
    sendEmail,
};
