// script.js
// Wait for the form to be submitted.
// Added: 2026-03-31

const URI = window.location.href;
const LOGIN_PATH = 'login';
const LOGIN_URI = URI.concat(LOGIN_PATH));

// Login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // stops page from refreshing

  let email = document.getElementById('userEmail').value;
  let password = document.getElementById('userPass').value;

  console.log("User tried to login with: " + email);
    
  const response = await fetch(URI.concat(LOGIN_PATH), {
    method: 'POST',
    headers: {
      Content_type: 'application/json',
    },
    body: JSON.stringify({email, password}),
  });

  await respone.json();

  if (response.ok) {
    console.log('Login successful!');
  } else {
    console.log('Login failed!');
  }
});
