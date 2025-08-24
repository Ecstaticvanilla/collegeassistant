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

    // Redirect to home.html
    window.location.href = "home.html";
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
