// server.js - M-Pesa GlobalPay Integration
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// M-Pesa API Credentials
const consumerKey = "wSPXuwHOtkGmojAa6g25eUtIZ6VDvHeAbrcNQZIqbTIZv6Ap";  // Replace with actual Consumer Key
const consumerSecret = "bQhjYKtAwPAg0WVvnq0GP1L72fGnU4IA3hmqKcspyGK0EuMkxA5awv1P6CbboOoA"; // Replace with actual Consumer Secret

// Function to get an access token from M-Pesa
async function getAccessToken() {
    const apiUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = 'Basic ' + Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    try {
        const response = await axios.get(apiUrl, {
            headers: { 'Authorization': auth }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

// Route to initiate M-Pesa GlobalPay transaction
app.post('/mpesa-globalpay', async (req, res) => {
    const { phone, amount, email } = req.body;

    // Get access token
    const accessToken = await getAccessToken();
    if (!accessToken) {
        return res.status(500).json({ success: false, message: 'Failed to authenticate with M-Pesa.' });
    }

    const paymentUrl = 'https://sandbox.safaricom.co.ke/mpesa/globalpay/v1/payments'; // Replace with actual endpoint if in production
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    const payload = {
        PhoneNumber: phone,
        Amount: amount,
        Email: email,
        CallbackURL: 'https://2318-197-237-225-28.ngrok-free.app',  // Replace with actual callback URL
        TransactionDesc: 'GlobalPay Payment for order'
    };

    try {
        const response = await axios.post(paymentUrl, payload, { headers });
        res.json({ success: true, message: 'Payment request sent.', data: response.data });
    } catch (error) {
        console.error('Error sending GlobalPay request:', error);
        res.status(500).json({ success: false, message: 'Error processing payment' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
