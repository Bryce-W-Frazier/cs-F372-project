// server.js
// Open and maintain TCP/HTTP contections
// Added: 2026-03-31

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Web content filesystem
const WEB_ROOT = '/';
const INDEX_PAGE = 'index.html';
const LOGIN_PATH = '/login';

// front end files
app.use(express.static(__dirname));

// localhost:3000 sends the login page
app.get(WEB_ROOT, (req, res) => {
    res.sendFile(path.join(__dirname, INDEX_PAGE));
});

// Listen for login requests
app.use(bodyPaser.json());
app.post(LOGIN_PATH, (req, res) => {
  const { email, password } = req.body;
  // auth.authenticate(email, password) TODO
}

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("Waiting to connect to mongo next iteration...");
});
