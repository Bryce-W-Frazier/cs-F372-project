// gallery.js
// Load movie thumbnails from server
// Started: 2026-04-08

// Element Names
const THUMB_TABLE = 'thumbnail_table';
const MSG_BOX = 'messages_box';

// Data API paths
const MOVIE_DATA_PATH = '/api/moviedata';
const MSG_DATA_PATH = '/api/msgdata':

// max dimentions for gallery
const MAX_ROWS = 5;
const MAX_COLS = 4;
let thumbnails = new Array(MAX_COLS * MAX_ROWS);

// Get movie data
const IMG_DIR_NAME = '/thumbnails/';
const MOVIE_DIR = '/videos/';
const MOVIE_DATA = await pullData(MOVIE_DATA_PATH);
let  filenames = getImgFilenames(MOVIE_DATA);

let img_paths = [];
for (let filename in filenames) {
  img_paths.push(IMG_DIR_NAME + filenames[filename] + '.png');
}

let movie_paths = [];
for (let filename in filenames) {
  movie_paths.push(MOVIE_DIR + filenames[filename] + '.webm');
}

// Get Messages
const MSG_DATA = await pullData(MSG_DATA_PATH);

// Generate table for gallery
for (let row_index = 0; row_index < MAX_ROWS; row_index++) {
  //new row on thumbnail table
  let curr_row = document.createElement("tr");
  document.getElementById("thumbnail_table").appendChild(curr_row);

  for (let col_index = 0; col_index < MAX_COLS; col_index++) {
    //init image and column
    let curr_col = document.createElement("td");
    let curr_a   = document.createElement("a");
    let curr_img = document.createElement("img");

    // make keys for images
    let img_index = row_index * MAX_COLS + col_index;
    let id = "thumbnail_" + img_index.toString();
    thumbnails.push(id);

    // Check if img_index is inbounds
    if (img_index > img_paths.length) {
      row_index = MAX_ROWS; //Quit row iteration
      break; // Quit col iteration
    }

    //Parase filename and init tooltip
    curr_img.title = img_paths[img_index]
      //filename => english
      .replace(IMG_DIR_NAME, "")
      .replace(/-|_/g, " ")
      .replace(/.png|/gi, "")
      //To title case
      .split(' ')
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');


    //init other image atributes & link
    curr_img.src = img_paths[img_index];
    curr_img.alt = img_paths[img_index];
    curr_img.id = id;
    curr_img.name = id;
    curr_a.href = movie_paths[img_index];

    //put image on column
    curr_a.appendChild(curr_img);
    curr_col.appendChild(curr_a);
    curr_row.appendChild(curr_col);
  }
}

// Dispaly messages
for (const MSG of MSG_DATA) {
  let timedate = document.createElement("h4");
  let subject = document.createElement("h4");
  let message = document.createElement("p");
  let lineBreak = document.createElement("br");

  timedate.textContent = MSG.timedate;
  subject.textContent = MSG.subject;
  message.textContent = MSG.message;

  document.getElementById(MSG_BOX).appendChild(timedate);
  document.getElementById(MSG_BOX).appendChild(subject);
  document.getElementById(MSG_BOX).appendChild(message);
  document.getElementById(MSG_BOX).appendChild(lineBreak);
}


// Function pullData()
// Pulls data from server.
async function pullData(data_path) {
  const res = await fetch(MOVIE_DATA_PATH);
  if (!res.ok) throw new Error(res.status);
  const data = await res.json();
  return data;
}


// Function getImgFilenames()
// Gets filenames from movie data.
function getImgFilenames(data) {
  let filenames = [];
  for (const movie of data) {
    filenames.push(movie.file_name);
  }
  return filenames;
}
