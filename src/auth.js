// auth.js 
// Handle authentication calls with mongodb on server end.
// Started: 2026-01-01

import { sha256 } from 'js-sha256';
import { mongoose } from 'mongoose';

// Function newAccount()
// Checks if username is free, then pushes new 
// username and SHA256 hashed password.
function newAccount(username, password) {
  if (!isVaildUsername(username)) {
    // Response to Client
  }
  // TODO
  console.assert(false, "newAccount(): not implemented");
}

// Function isVaildUsername(username)
// Check if username is in account database.
function isVaildUsername(username) {
  // TODO
  console.assert(false, "isVaildUsername: not implemented");
}
