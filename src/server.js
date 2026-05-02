// server.js
// Open and maintain TCP/HTTP contections.
// Added: 2026-03-31.

const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const auth = require('./auth.js');
const moviedata = require('./moviedata.js');

const app = express();

// Page Paths
const WEB_ROOT = '/';
const INDEX_PAGE = 'index.html';
const SIGNUP_PAGE = 'signup.html';


// API Paths
const LOGIN_PATH = '/login';
const SIGNUP_PATH = '/signup';
const ADMIN_SIGNUP_PATH = '/adminSignup';
const MOVIE_API_PATH = '/api/moviedata';
const UPLOAD_MOVIE_PATH = '/addContent';

// File Paths
const VIDEO_DIR = path.join(__dirname, 'videos');
const THUMB_DIR = path.join(__dirname, 'thumbnails');

// ###################################################################
// Storage Management
// ###################################################################

// Make directories if they don't exist.
[VIDEO_DIR, THUMB_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') cb(null, VIDEO_DIR);
    else if (file.fieldname === 'thumbnail') cb(null, THUMB_DIR);
    else cb(null, path.join(__dirname, 'uploads', 'other'));
  },
  filename: (req, file, cb) => {
    // sanitize / make unique. Example: timestamp + original name
    const safe = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, safe);
  }
});

// Accept only .webm for video and .png for thumbnail.
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'video') {
    cb(null, file.mimetype === 'video/webm');
  } else if (file.fieldname === 'thumbnail') {
    cb(null, file.mimetype === 'image/png');
  } else cb(null, false);
};

const upload = multer({ storage, fileFilter });



// ###################################################################
// Server Init
// ###################################################################

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

app.post('/addContent', 
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), 
(req, res) => {
  const { title, year } = req.body;

  // Uploaded files info:
  // req.files.video and req.files.thumbnail are arrays
  const videoFile = req.files?.video?.[0];
  const thumbFile = req.files?.thumbnail?.[0];

  if (!videoFile || !thumbFile) {
    return res.status(400).send('Both video and thumbnail are required.');
  }

  // videoFile.filename is what multer stored, e.g. "1677-name.webm"
      const videoFilename = videoFile.filename;
      const videoBase = path.parse(videoFilename).name; // "1677-name"
      const thumbExt = path.extname(thumbFile.originalname) || 
      	path.extname(thumbFile.filename) || '.png';

      // new thumbnail filename (keep thumbnail directory)
      const newThumbFilename = videoBase + thumbExt; // e.g. "1677-name.png"
      const oldThumbPath = thumbFile.path;
      const newThumbPath = path.join(path.dirname(oldThumbPath), newThumbFilename);

  // You can store metadata to DB or respond with file paths
  res.json({
    message: 'Upload successful',
    title,
    year,
    videoPath: path.relative(__dirname, videoFile.path),
    thumbnailPath: path.relative(__dirname, thumbFile.path)
  });
});


// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


