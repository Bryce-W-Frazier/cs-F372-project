// auth.js 
// Handle authentication calls with mongodb on server end.
// Started: 2026-01-01

const sha256 = require('js-sha256');
const MongoClient = require('mongodb');

// MondoDB server info.
const DB_SERVER_URI    = 'localhost';
const DB_NAME          = 'fakeflix';
const COLLECTION_NAME  = 'useraccounts';


// Function newAccount()
// Checks if username is free, then pushes new 
// username and SHA256 hashed password.
async function newAccount(username, password) {
  const Client = new MongoClient(DB_SERVER_URI); 
  try {
    // Connect to collection
    await Client.connect();
    const Database = Client.db(DB_NAME);
    const Collection = Database.collection(COLLECTION_NAME);
 
    // Don't make an account with a duplicate username.
    if (isVaildUsername(username)) {
      // TODO Response to Client
    }

    const NEWUSER = {
      username: username,
      password_sha256: password,
      role: 'viewer',
    };

    const RESULT = await collection.insertOne(NEWUSER);
    console.log('Added new user, Object ID: ${RESULT.insertedID}');
    // TODO Respone to Client
  } finally {
    await Client.close();
  }
}

// Function isVaildUsername(username)
// Check if username is in account database. Returns Bool
async function isVaildUsername(username) {
  let result = false;
  const Client = new MongoClient(DB_SERVER_URI); 
  try {
    // Connect to collection
    await Client.connect();
    const Database = Client.db(DB_NAME);
    const Collection = Database.collection(COLLECTION_NAME);
 
    const USER = await collection.findOne({username: username});

    if (USER) {
      result = true;
    } else {
      result = false;
    }

  } finally {
    await Client.close();
  }
  return result;
}


