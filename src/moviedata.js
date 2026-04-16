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


// Export modules for server.js
module.exports = {
  getCollection,
};
