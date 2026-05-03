// message.js 
// Handle message db between marketing manager 
// and content editor.
// Started: 2026-04-16

const sha256 = require('js-sha256');
const { MongoClient } = require('mongodb');

// MongoDB server info.
const DB_SERVER_URI    = 'mongodb://127.0.0.1:27017';
const DB_NAME          = 'fakeflix';
const COLLECTION_NAME  = 'marketing_messages';
const MONGO_CLIENT = new MongoClient(DB_SERVER_URI);

// For timedate
const TIME_ZONE = 'America/Anchorage'
const dt = new Date();
const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: false
});

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
async function send(subject, message) {
  try {
    const db_collection = await getCollectionObject();
 
    const NEW_MESSAGE = {
      timedate: fmt.format(dt),
      subject: subject,
      message: message,
    };

    const result = await db_collection.insertOne(NEW_MESSAGE);
    console.log(`New message sent, Object ID: ${result.insertedId}`);
    return true;
  } catch (error) {
      console.error(`Database Error: ${error}`);
      return false;
  }
}


// Export modules for server.js
module.exports = {
  getCollection,
  send,
};
