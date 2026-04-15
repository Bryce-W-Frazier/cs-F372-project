// signup.js
// Wait for the registration form to be submitted.
// Added: 2026-04-07

const SIGNUP_PATH = '/signup';

document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // stops page from refreshing

  let email = document.getElementById('newEmail').value;
  let password = document.getElementById('newPass').value;

  // Enforce strict username formatting
  if (email.length < 8 || email.length > 16) {
      alert("Registration Failed: Username/Email must be between 8 and 16 characters.");
      return;
  }

  // Enforce strict password formatting using RegEx (Regular Expression) method .test()
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
  if (!passwordRegex.test(password)) {
      alert("Registration Failed: Password must be 8-16 characters, contain at least one uppercase letter, one lowercase letter, and one special character.");
      return;
  }

  console.log("Attempting to register user: " + email);
    
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
    window.location.href = '/'; // Redirects user back to login page
  } else {
    console.log('Registration failed!');
    alert("FAILED: " + data.message);
  }
});
