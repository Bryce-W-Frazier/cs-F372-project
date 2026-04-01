// script.js
// wait for the form to be submitted
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); // stops page from refreshing

    let email = document.getElementById('userEmail').value;
    let pass = document.getElementById('userPass').value;

    console.log("User tried to login with: " + email);
    
    // just an alert for iteration 1 since db isn't hooked up yet
    alert("Login button clicked! Authentication logic coming in Iteration 2.");
});