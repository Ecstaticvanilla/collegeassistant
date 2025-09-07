// login/script.js

// Handle form submit and redirect
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in both username and password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Save user info to session storage
            sessionStorage.setItem('userRole', data.user.role);
            sessionStorage.setItem('studentId', data.user.student_id);

            // Redirect to the home page with the user's role
            window.location.href = `../home/home.html?role=${data.user.role}`;
        } else {
            alert("Login failed: " + data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Could not connect to the server.");
    }
});

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}
