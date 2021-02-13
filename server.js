const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');         // Built-In Module

// Initializing Express 
const app = express();

// Setting Up the Port
const PORT = process.env.PORT || 8080;

// HTTP Request Logger that would log all our HTTP Requests in the Console.
app.use(morgan('tiny'));

// ENDPOINTS
app.get('/api', (req, res) => {
    const data = {
        username: "abc",
        age: 5
    };
    res.json(data);
});

app.get('/api/name', (req, res) => {
    const data = {
        username: "abcdeffg",
        age: 10
    };
    res.json(data);
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`The application started successfully on port ${PORT}`);
});