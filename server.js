// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body (for data sent by the frontend Fetch API)
app.use(express.json());

// Serve static files (optional, but needed if you want to host your HTML)
app.use(express.static('public'));


// 1. Create a Nodemailer transporter
// This object handles the connection to the SMTP server (e.g., Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for simplicity, or specify host/port for others
    auth: {
        user: process.env.SENDER_EMAIL, // Your sending email address
        pass: process.env.SENDER_PASSWORD  // Your App Password
    }
});

// 2. Define the form submission endpoint
app.post('/contact', async (req, res) => {
    const { full_name, email, message } = req.body;
    
    // Simple validation
    if (!full_name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // 3. Define the email content
    const mailOptions = {
        from: `"${full_name}" <${process.env.SENDER_EMAIL}>`, // Appears as sent from your name
        to: `<${process.env.MY_EMAIL}>`, // CHANGE THIS to where you want to receive the email
        subject: `New Contact from Portfolio: ${full_name}`,
        text: `
            Name: ${full_name}
            Contact: ${email}
            
            Message:
            ${message}
        `,
        // You can also add HTML content here if you want formatted emails
        // html: `<h1>...</h1>`
    };

    // 4. Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Message sent successfully!');
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});