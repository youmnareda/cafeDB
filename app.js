// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const teamsPath = require( './routes/teams.js' );
const emailPath = require( './routes/email.js' );
const productPath = require('./routes/product.js');
const tableResPath = require('./routes/tableRes.js');
const feedbackPath = require('./routes/feedback.js');
//const customerPath = require('./routes/customer.js');
dotenv.config();
// connection to DB
async function connect(){
    let connection =  await mongoose.connect(process.env.MONGO_URL);
    if (!connection) {
    console.log('no connect');
    } else {
    console.log('connected to DB...');
}}
connect();

// ⁡⁣⁢Creating an Express application
const app = express();
// apply middlewares
app.use(express.json());

// Routes
app.use( "/api/teams", teamsPath); 
app.use( "/api/email", emailPath);
app.use('/api/products',productPath);
app.use('/api/tableRes',tableResPath);
app.use('/api/feedback',feedbackPath);
//app.use('/api/customer',customerPath);
app.use('/api/upload',require('./routes/upload'));

// Static Folder
app.use(express.static(path.join(__dirname,'images')));

// Running the server
// Defining the port on which the server will listen for incoming requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`); // Logging that the server is running
});
