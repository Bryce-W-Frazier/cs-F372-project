// server.js
// Open and maintain TCP/HTTP contections
// Added: 2026-03-31

const express = require('express');
const path = require('path');
const auth = require('./auth.js');
const moviedata = require('./moviedata.js');

const app = express();

const WEB_ROOT = '/';
const INDEX_PAGE = 'index.html';
const LOGIN_PATH = '/login';
const SIGNUP_PAGE = 'signup.html';
const SIGNUP_PATH = '/signup';
const ADMIN_SIGNUP_PATH = '/adminSignup';
const MOVIE_API_PATH = '/api/moviedata';

// Front end files
app.use(express.static(__dirname));
app.use(express.json());

// localhost:3000 sends the login page
app.get(WEB_ROOT, (req, res) => {
    res.sendFile(path.join(__dirname, INDEX_PAGE));
});

// ###################################################################
// Account Management
// ###################################################################

// Login
app.post(LOGIN_PATH, async (req, res) => {
  const { email, password } = req.body;
  console.log(`\nLogin attempt from: ${email}`);
  const AUTHED_ROLE = await auth.authenticateCredentials(email, password);

  if (AUTHED_ROLE != 'auth-fail') {
    console.log(`User Verified.`);
    // Status 200 means success
    res.status(200).send({ message: "Login Successful", role: AUTHED_ROLE });
  } else {
    console.log(`Failed to verify user`);
    // Status 418 means...unauthorized
    res.status(418).send({ message: "Login Failed. Invalid username or password." }); 
  }
});

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
    console.log(`Failed to create user. Username may already exist, or there is a database error.`);
    // Status 418 means...teapot
    res.status(418).send({ message: "Signup Failed. Username already exists" }); 
  }
});

// Listen for admin sign ups
app.post(ADMIN_SIGNUP_PATH, async (req, res) => {
  const { role, email, password } = req.body;
  
  const is_created = await auth.newAccountAdmin(email, password, role);

  if (is_created) {
    console.log(`User created.`);
    // Status 201 means created
    res.status(201).send({ message: "Signup Successful!" }); 
  } else {
    console.log(`Failed to create user. Username may already exist, or there is a database error.`);
    // Status 418 means...teapot
    res.status(418).send({ message: "Signup Failed. Username already exists" }); 
  } 
});

// ###################################################################
// Movie API
// ###################################################################
app.get(MOVIE_API_PATH, async (req, res) => {
  console.log(await moviedata.getCollection());
  res.status(200).json(await moviedata.getCollection());
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



