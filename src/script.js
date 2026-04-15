// script.js
// Wait for the form to be submitted.
// Added: 2026-03-31

const LOGIN_PATH = '/login';

// Login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // stops page from refreshing

  let email = document.getElementById('userEmail').value;
  let password = document.getElementById('userPass').value;

  const response = await fetch(LOGIN_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });

  const data = await response.json();

  if (response.ok) {
    // Redirect to the gallery upon successful login
    window.location.href = '/gallery.html';
  } else {
    // Alerts the user why they cannot access the account
    alert("Login Error: " + data.message);
  }
});
