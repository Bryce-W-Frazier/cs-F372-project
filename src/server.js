// server.js
// Open and maintain TCP/HTTP contections
// Added: 2026-03-31

const express = require('express');
const app = express();
const path = require('path');

// Web content filesystem
const WEB_ROOT = '/';
const INDEX_PAGE = 'index.html';

// front end files
app.use(express.static(__dirname));

// localhost:3000 sends the login page
app.get(WEB_ROOT, (req, res) => {
    res.sendFile(path.join(__dirname, INDEX_PAGE));
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("Waiting to connect to mongo next iteration...");
});
