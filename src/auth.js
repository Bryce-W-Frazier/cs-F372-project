// auth.js 
// Handle authentication calls with mongodb on server end.
// Started: 2026-01-01

const sha256 = require('js-sha256');
const { MongoClient } = require('mongodb');

// MongoDB server info.
const DB_SERVER_URI    = 'mongodb://127.0.0.1:27017';
const DB_NAME          = 'fakeflix';
const COLLECTION_NAME  = 'useraccounts';
const MONGO_CLIENT = new MongoClient(DB_SERVER_URI);

// Helper function to grab database collection
async function getCollection() {
  await MONGO_CLIENT.connect();
  return MONGO_CLIENT.db(DB_NAME).collection(COLLECTION_NAME);
}

// Function newAccount()
// Creates a standard viewer account.
async function newAccount(username, password) {
  return await newAccountAdmin(username, password, 'viewer');
}

// Function newAccountAdmin()
// Checks if username is free, then pushes new 
// username, SHA256 hashed password, and role.
async function newAccountAdmin(username, password, role) {
  try {
    const db_collection = await getCollection();
    const hashed_password = sha256(password);
 
    // Prevent duplicate accounts from crashing the system
    if (await isValidUsername(username)) {
      return false; 
    }

    const new_user = {
      username: username,
      password_sha256: hashed_password,
      role: role,
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
// Check if username is in account database. Returns boolean.
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

// Export modules for server.js
module.exports = {
  newAccount,
  newAccountAdmin,
  isValidUsername,
  authenticateCredentials
};
