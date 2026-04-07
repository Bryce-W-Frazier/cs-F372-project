// auth.js 
// Handle authentication calls with mongodb on server end.
// Started: 2026-01-01

const sha256 = require('js-sha256');
const { MongoClient } = require('mongodb');

// MondoDB server info.
const DB_SERVER_URI    = 'mongodb://localhost:27017';
const DB_NAME          = 'fakeflix';
const COLLECTION_NAME  = 'useraccounts';
const MONGO_CLIENT = new MongoClient(DB_SERVER_URI);

// Helper function to grab database
async function getCollection() {
  await MONGO_CLIENT.connect();
  return MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME);
}

// Function newAccount()
// Checks if username is free, then pushes new 
// username and SHA256 hashed password.
async function newAccount(username, password) {
  try {
    const db_collection = await getCollection();
    const hashed_password = sha256(password);
 
    // Don't make an account with a duplicate username.
    if (await isValidUsername(username)) {
      // return false; // TODO Response to Client
    }

    const new_user = {
      username: username,
      password_sha256: hashed_password,
      role: 'viewer',
    };

    const result = await db_collection.insertOne(new_user);
    console.log(`Added new user, Object ID: ${result.insertedId}`);
    return true;
  } catch (error) {
      console.error(`Database Error: ${error}`);
      return false;
  }
}

// Function isValidUsername(username)
// Check if username is in account database. Returns Bool
async function isValidUsername(username) {
  try {
    const db_collection = await getCollection();
    const user = await db_collection.findOne({ username: username });
    
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Database Error: ${error}`);
    return false;
  }
}

// Function authenticateCredentials()
// Verifies if the incoming credentials
async function authenticateCredentials(username, password) {
  try {
    const db_collection = await getCollection();
    const hashed_password = sha256(password);
    
    const user = await db_collection.findOne({ 
      username: username,
      password_sha256: hashed_password
    });

    if (user) {
      console.log(`Authentication successful for: ${username}`);
      return true;
    } 
    
    console.log(`Authentication failed for: ${username}`);
    return false;

  } catch (error) {
    console.error(`Database Error: ${error}`);
    return false;
  }
}

// Export the artillery so server.js can use it!
module.exports = { newAccount, isValidUsername, authenticateCredentials };
