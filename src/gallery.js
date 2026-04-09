// gallery.js
// Load movie thumbnails from server
// Started: 2026-04-08

const MongoClient = require('mongodb');

// max dimentions for gallery
const max_rows = 5;
const max_cols = 4;
let thumbnails = new Array(max_cols * max_rows);

// Get filenames of images
const img_dir_name = '/thumbnails';
const img_filenames = get_img_filenames();

// Generate table for gallery
for (let row_index = 0; row_index < max_rows; row_index++) {
  //new row on thumbnail table
  let curr_row = document.createElement("tr");
  document.getElementById("thumbnail_table").appendChild(curr_row);

  for (let col_index = 0; col_index < max_cols; col_index++) {
    //init image and column
    let curr_col = document.createElement("td");
    let curr_img = document.createElement("img");

    // make keys for images
    let img_index = row_index * max_cols + col_index;
    let id = "thumbnail_" + img_index.toString();
    thumbnails.push(id);

    // Check if img_index is inbounds
    if (img_index > img_filenames.length) {
      row_index = max_rows; //Quit row iteration
      break; // Quit col iteration
    }

    //Parase filename and init tooltip
    curr_img.title = img_filenames[img_index]
      //filename => english
      .replace(img_dir_name, "")
      .replace(/-|_/g, " ")
      .replace(/.svg|/gi, "")
      //To title case
      .split(' ')
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    //init other image atributes
    curr_img.src = img_filenames[img_index];
    curr_img.alt = img_filenames[img_index];
    curr_img.id = id;
    curr_img.name = id;

    //put image on column
    curr_col.appendChild(curr_img);
    curr_row.appendChild(curr_col);
  }
}

// Function get_img_filenames()
// Connect to mongo db get filenames to thumbnails
async function get_img_filenames() {
  try {
    const DB_COLLECTION = await getCollection();
     
	   

}
