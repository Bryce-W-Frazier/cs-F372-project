// server.js
// Open and maintain TCP/HTTP contections
// Added: 2026-03-31

const express = require('express');
const path = require('path');
const auth = require('./auth.js');

const app = express();

// Web content filesystem
const WEB_ROOT = '/';
const INDEX_PAGE = 'index.html';
const LOGIN_PATH = '/login';

// Front end files
app.use(express.static(__dirname));

// localhost:3000 sends the login page
app.get(WEB_ROOT, (req, res) => {
    res.sendFile(path.join(__dirname, INDEX_PAGE));
});

// Listen for login requests
app.use(express.json());

app.post(LOGIN_PATH, async (req, res) => {
  const { email, password } = req.body;
  console.log(`\nLogin attempt from: ${email}`);
  const is_authenticated = await auth.authenticateCredentials(email, password);
  
  if (is_authenticated) {
    console.log(`User Verified.`);
    // Status 200 means success
    res.status(200).send({ message: "Login Successful!" }); 
  } else {
    console.log(`Failed to verify user`);
    // Status 418 means...unauthorized
    res.status(418).send({ message: "Login Failed." }); 
  }
});


const SIGNUP_PAGE = 'signup.html';
const SIGNUP_PATH = '/signup';

app.get(SIGNUP_PATH, (req, res) => {
    res.sendFile(path.join(__dirname, SIGNUP_PAGE));
});

// Listen for sign up requests
app.post(SIGNUP_PATH, async (req, res) => {
  const { email, password } = req.body;
  console.log("Signup attempt: " + email);
  
  const is_created = await auth.newAccount(email, password);
  
  if (is_created) {
    console.log(`User created.`);
    // Status 201 means created
    res.status(201).send({ message: "Signup Successful!" }); 
  } else {
    console.log(`Failed to create user`);
    // Status 418 means...teapot
    res.status(418).send({ message: "Signup Failed." }); 
  }
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
