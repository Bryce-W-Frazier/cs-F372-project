// gallery.js
// Load movie thumbnails from server
// Started: 2026-04-08

// Element Names
const THUMB_TABLE = 'thumbnail_table';

// Data API paths
const MOVIE_DATA_PATH = '/api/moviedata';
const COUNT_API_PATH = '/api/countview';

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
    if (img_index+1 > MOVIE_DATA.length) {
      row_index = MAX_ROWS; //Quit row iteration
      break; // Quit col iteration
    }

    //Parase filename and init tooltip
    curr_img.title = MOVIE_DATA[img_index].title;

    //init other image atributes & link
    curr_img.src = img_paths[img_index];
    curr_img.alt = img_paths[img_index];
    curr_img.id = id;
    curr_img.name = id;
    curr_a.href = movie_paths[img_index];

    //Report views to server
    curr_a.addEventListener('click', async (e) => {
	countView(MOVIE_DATA[col_index].file_name);
    });

    //put image on column
    curr_a.appendChild(curr_img);
    curr_col.appendChild(curr_a);
    curr_row.appendChild(curr_col);
  }
}

// Function pullData()
// Pulls data from server.
async function pullData(data_path) {
  const res = await fetch(data_path);
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

// Function countView()
// Takes the filename of the movie and reports a view
// to the server.
async function countView(filename) {
  const data = { filename: filename, };

  fetch(COUNT_API_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}
