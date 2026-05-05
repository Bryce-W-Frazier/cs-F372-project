// moviedata.js 
// Handle moive data calls with mongodb on server end.
// Started: 2026-04-16

const sha256 = require('js-sha256');
const { MongoClient } = require('mongodb');

// MongoDB server info.
const DB_SERVER_URI    = 'mongodb://127.0.0.1:27017';
const DB_NAME          = 'fakeflix';
const COLLECTION_NAME  = 'videos';
const MONGO_CLIENT = new MongoClient(DB_SERVER_URI);

// Function getCollection()
// Helper function to grab database collection
async function getCollection() {
  await MONGO_CLIENT.connect();
  const collection = MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME);

  const cursor = collection.find();
  const docs = await cursor.toArray();
  return docs;
}

// Function getCollectionObject()
// Grabs an interactable collection object
async function getCollectionObject() {
  await MONGO_CLIENT.connect();
  return MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME);
}

// Function addMovie()
// Takes title, year, and filename then adds the movie to 
// collection with timestamp.
async function addMovie(title, year, filename) {
  const COLLECTION = await getCollectionObject();
 
  const NEW_MOVIE = {
    title: title,
    relese_year: year,
    date_added: Math.floor(Date.now() / 1000),
    file_name: filename,
    views: 0,
   };

   await COLLECTION.insertOne(NEW_MOVIE);
}

// Function countView()
// Takes the filename of the movie and incurments the 
// number of views.
async function countView(filename) {
  const COLLECTION = await getCollectionObject();

  const FILTER = `file_name: "${filename}"`;                     
  const UPDATE = { $inc: { "views": 1 } };
  const OPTIONS = { upsert: true }; 

  await COLLECTION.updateOne({file_name: filename}, UPDATE, OPTIONS);
}

// Function countView()
// Takes the filename of the movie and removes it from the 
// colleciton.
async function delMovie(filename) {
  const COLLECTION = await getCollectionObject();

  await COLLECTION.deleteOne({file_name: filename});
}


// Export modules for server.js
module.exports = {
  getCollection,
  addMovie,
  countView,
  delMovie,
};
