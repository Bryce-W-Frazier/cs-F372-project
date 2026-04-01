// server.js
const express = require('express');
const app = express();
const path = require('path');

// front end files
app.use(express.static(__dirname));

// localhost:3000 sends the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("Waiting to connect to mongo next iteration...");
});