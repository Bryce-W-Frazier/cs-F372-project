// signup.js
// Wait for the registration form to be submitted.
// Added: 2026-04-07

const SIGNUP_PATH = '/signup';

document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // stops page from refreshing

  let email = document.getElementById('newEmail').value;
  let password = document.getElementById('newPass').value;

  console.log("Attempting to register recruit: " + email);
    
  const response = await fetch(SIGNUP_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json(); 

  if (response.ok) {
    console.log('Registration successful!');
    alert("Account created! Welcome to FakeFlix!");
    window.location.href = '/'; // Send them back to the login page
  } else {
    console.log('Registration failed!');
    alert("FAILED: " + data.message); // This will say "Username already exists!"
  }
});