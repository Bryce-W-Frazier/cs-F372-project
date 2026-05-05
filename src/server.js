// server.js
// Open and maintain TCP/HTTP contections.
// Added: 2026-03-31.

// npm & node Modules
const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Local Modules
const auth = require('./auth.js');
const moviedata = require('./moviedata.js');
const messagejs = require('./message.js');

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
const MSG_API_PATH = '/api/msgdata';
const VIEW_COUNTING_PATH = '/api/countview';
const UPLOAD_MOVIE_PATH = '/addContent';
const MSG_TO_EDIT = '/message-to-editor';
const MSG_TO_MARKETING = '/message-to-marketing';
const DEL_MOVIE_PATH = '/delContent';

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
app.use(express.urlencoded({ extended: false }));
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
    res.status(200).send({ message: "Login Successful", role: AUTHED_ROLE });
  } else {
    console.log(`Failed to verify user`);
    res.status(401).send(
      { message: "Login Failed. Invalid username or password." }
    ); 
  }
});

//Handle Signup requests
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
    res.status(201).send({ message: "Signup Successful!" }); 
  } else {
    console.log(
      `Failed to create user. Username may already exist, 
       or there is a database error.`
    );
    res.status(401).send(
      { message: "Signup Failed. Username already exists" }
    ); 
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
    console.log(
      `Failed to create user. Username may already exist, 
      or there is a database error.`
    );
    res.status(401).send(
      { message: "Signup Failed. Username already exists" }
    ); 
  } 
});


// ###################################################################
// Movie API
// ###################################################################
app.get(MOVIE_API_PATH, async (req, res) => {
  res.status(200).json(await moviedata.getCollection());
});

// Note: adds files movie locally, calls moviedata for mongodb.
app.post('/addContent', 
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), 
async (req, res) => {
  try {
    const { title, year } = req.body;

    // Uploaded files info:
    // req.files.video and req.files.thumbnail are arrays
    const VIDEO_FILE = req.files?.video?.[0];
    const THUMB_FILE = req.files?.thumbnail?.[0];

    if (!VIDEO_FILE || !THUMB_FILE) {
      return res.status(400).send('Both video and thumbnail are required.');
    }

    // Get video filename...
    const VIDEO_FILENAME = VIDEO_FILE.filename;
    const VIDEO_BASE = path.parse(VIDEO_FILENAME).name;
    const THUMB_EXT = path.extname(THUMB_FILE.originalname) || 
      path.extname(THUMB_FILE.filename) || '.png';
    // ...and rename thumbnail to the same name but preserve minetype.
    const NEW_THUMB_FILENAME = VIDEO_BASE + THUMB_EXT;
    const OLD_THUMB_PATH = THUMB_FILE.path;
    const NEW_THUMB_PATH = path
      .join(path.dirname(OLD_THUMB_PATH), NEW_THUMB_FILENAME);
	
    // Wait for file ops then add to db
    await fs.promises.rename(OLD_THUMB_PATH, NEW_THUMB_PATH);
    await moviedata.addMovie(title, year, VIDEO_BASE);
    return res.redirect(302, req.get('Referer') || '/');

  } catch (err) {
    console.log(err);
    return res.status(500).send('Upload error');
  }
});


app.post(VIEW_COUNTING_PATH, async (req, res) => {
  const { filename } = req.body;

  moviedata.countView(filename);
 
  res.redirect(302, req.get('Referer') || '/');
});

// Note: deletes movie files locally calls moviedata for mongodb.
app.post(DEL_MOVIE_PATH, async (req, res) => {
  const { filename } = req.body;

  moviedata.delMovie(filename);

  try {
    fs.unlinkSync(`${VIDEO_DIR}/${filename}.webm`);
    fs.unlinkSync(`${THUMB_DIR}/${filename}.png`);
  } catch {
    console.log('Movie already removed');
  }

  res.status(200);
});



// ###################################################################
// Message board
// ###################################################################

app.post(MSG_TO_EDIT, (req, res) => {
  const ROLE = 'Marketing Management';
  const { subject, message } = req.body;

  // Basic validation
  if (!subject.trim() || !message.trim()) {
    return res.status(400).send('Subject and message are required.');
  }

  messagejs.send(subject, message, ROLE);

  res.redirect(302, req.get('Referer') || '/');
});

app.post(MSG_TO_MARKETING, (req, res) => {
  const ROLE = 'Content Editoral';
  const { subject, message } = req.body;

  // Basic validation
  if (!subject.trim() || !message.trim()) {
    return res.status(400).send('Subject and message are required.');
  }

  messagejs.send(subject, message, ROLE);

  res.redirect(302, req.get('Referer') || '/');
});


app.get(MSG_API_PATH, async (req, res) => {
  res.status(200).json(await messagejs.getCollection());
});

// start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


