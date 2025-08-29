// Handle form submit and redirect
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent default form submission

    // Basic validation check
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in both username and password.");
        return;
    }

    // A simple check to determine user role.
    // In a real application, this would be handled by a secure backend.
    if (username === "teacher") {
        window.location.href = "../home/home.html?role=teacher";
    } else if (username === "student") {
        window.location.href = "../home/home.html?role=student";
    } else {
        alert("Invalid username or password.");
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
