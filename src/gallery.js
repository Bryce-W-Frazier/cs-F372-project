// gallery.js
// Load movie thumbnails from server
// Started: 2026-04-08

// max dimentions for gallery
const MAX_ROWS = 5;
const MAX_COLS = 4;
let thumbnails = new Array(MAX_COLS * MAX_ROWS);

// Get movie data
const IMG_DIR_NAME = '/thumbnails';
let  filenames = get_img_filenames();
for (let filename in filenames) {
  filename.concat('.png');
}
const IMG_FILENAMES = IMG_DIR_NAME.concat(filenames);

// Generate table for gallery
for (let row_index = 0; row_index < MAX_ROWS; row_index++) {
  //new row on thumbnail table
  let curr_row = document.createElement("tr");
  document.getElementById("thumbnail_table").appendChild(curr_row);

  for (let col_index = 0; col_index < MAX_COLS; col_index++) {
    //init image and column
    let curr_col = document.createElement("td");
    let curr_img = document.createElement("img");

    // make keys for images
    let img_index = row_index * MAX_COLS + col_index;
    let id = "thumbnail_" + img_index.toString();
    thumbnails.push(id);

    // Check if img_index is inbounds
    if (img_index > IMG_FILENAMES.length) {
      row_index = MAX_ROWS; //Quit row iteration
      break; // Quit col iteration
    }

    //Parase filename and init tooltip
    curr_img.title = IMG_FILENAMES[img_index]
      //filename => english
      .replace(IMG_DIR_NAME, "")
      .replace(/-|_/g, " ")
      .replace(/.svg|/gi, "")
      //To title case
      .split(' ')
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    //init other image atributes
    curr_img.src = IMG_FILENAMES[img_index];
    curr_img.alt = IMG_FILENAMES[img_index];
    curr_img.id = id;
    curr_img.name = id;

    //put image on column
    curr_col.appendChild(curr_img);
    curr_row.appendChild(curr_col);
  }
}

// Function getMovieData()
// Pulls movie data from server.
async function getMovieData() {
  const RES = await fetch('/api/moviedata');
  return await RES.json();
}

// Function get_IMG_FILENAMES()
// Gets filenames from movie data.
function get_IMG_FILENAMES(data) {
  return data.map(item => item.file_name);
}
