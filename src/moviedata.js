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

// Helper function to grab database collection
async function getCollection() {
  await MONGO_CLIENT.connect();
  const collection = MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME);

  const cursor = collection.find();
  const docs = await cursor.toArray();
  return docs;
}

// Grabs an interactable collection object
async function getCollectionObject() {
  await MONGO_CLIENT.connect();
  return MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME);
}

// Function addMovie
async function addMovie(title, year, filename) {
  try {
    const db_collection = await getCollectionObject();
 
    const NEW_MOVIE = {
      title: title,
      relese_year: year,
      data_added: Math.floor(Date.now() / 1000),
      file_name: filename,
    };

    const result = await db_collection.insertOne(NEW_MOVIE);
    console.log(`Added new movie, Object ID: ${result.insertedId}`);
    return true;
  } catch (error) {
      console.error(`Database Error: ${error}`);
      return false;
  }
}


// Export modules for server.js
module.exports = {
  getCollection,
  addMovie
};
