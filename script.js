document.addEventListener("DOMContentLoaded", function () {
    const formElements = document.querySelectorAll("input, select");
    const submitButton = document.querySelector(".btn-primary");

    // Function to check if all fields are valid
    function validateForm() {
        let isValid = true;

        formElements.forEach(input => {
            const errorElement = document.getElementById(input.id + "Error");
            
            // Check if there is any error message or if the field is empty
            if (input.value === "" || (errorElement && errorElement.textContent !== "")) {
                isValid = false;
            }
        });

        submitButton.disabled = !isValid;
    }

    // Event listener to validate name
    document.getElementById('name').addEventListener('input', function () {
        const nameField = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        const regex = /^[a-zA-Z\s]{2,30}$/;

        if (!regex.test(nameField.value)) {
            nameError.textContent = "Name must be between 2 and 30 characters and cannot contain numbers or special characters.";
            nameField.style.border = "1px solid red";
        } else {
            nameError.textContent = "";
            nameField.style.border = "1px solid green";
        }
        validateForm();
    });

    // Event listener to validate email
    document.getElementById('email').addEventListener('input', function () {
        const emailField = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(emailField.value)) {
            emailError.textContent = "Please enter a valid email address.";
            emailField.style.border = "1px solid red";
        } else {
            emailError.textContent = "";
            emailField.style.border = "1px solid green";
        }
        validateForm();
    });

    // phone number validation +xxx xxx xxxxx
    document.getElementById('phone').addEventListener('input', function () {
        const phoneField = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const regex = /^\+\d{1,3}\s\d{3}\s\d{5}$/;
        
        if (!regex.test(phoneField.value)) {
            phoneError.textContent = "Please enter a valid phone number. Must start with + followed by country code. Example: +123 456 78901";
            phoneField.style.border = "1px solid red";
        } else {
            phoneError.textContent = "";
            phoneField.style.border = "1px solid green";
        }
        validateForm();
    });

    // Event listener to validate password
    document.getElementById('password').addEventListener('input', function () {
        const passwordField = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        const password = passwordField.value;

        const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!strengthRegex.test(password)) {
            passwordError.textContent = "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.";
            passwordField.style.border = "1px solid red";
        } else {
            passwordError.textContent = "";
            passwordField.style.border = "1px solid green";
        }
        validateForm();
    });

    // Event listener to validate repeat password
    document.getElementById('rPassword').addEventListener('input', function () {
        const passwordField = document.getElementById('password');
        const rPasswordField = document.getElementById('rPassword');
        const rPasswordError = document.getElementById('rPasswordError');
        const password = passwordField.value;
        const rPassword = rPasswordField.value;

        if (password !== rPassword) {
            rPasswordError.textContent = "Passwords do not match.";
            rPasswordField.style.border = "1px solid red";
        } else {
            rPasswordError.textContent = "";
            rPasswordField.style.border = "1px solid green";
        }
        validateForm();
    });

    // Event listener to validate birth date (age >= 18)
    const monthDropdown = document.getElementById("month");
    const dayDropdown = document.getElementById("day");
    const yearDropdown = document.getElementById("year");

    // Set the years dynamically
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 18; year >= currentYear - 120; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    }

    function validateAge() {
        const day = parseInt(dayDropdown.value);
        const month = parseInt(monthDropdown.value) - 1;
        const year = parseInt(yearDropdown.value);
        const errorMessage = document.getElementById("error-message");

        if (!day || !month || !year) {
            errorMessage.textContent = "Please fill in all fields.";
            return;
        }

        const birthDate = new Date(year, month, day);
        const age = calculateAge(birthDate);

        if (age < 18 || age > 120) {
            errorMessage.textContent = "Age must be between 18 and 120 years.";
        } else {
            errorMessage.textContent = "";
        }
        validateForm();
    }

    // Helper function to calculate age
    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Validate age on change
    monthDropdown.addEventListener("change", validateAge);
    dayDropdown.addEventListener("change", validateAge);
    yearDropdown.addEventListener("change", validateAge);

    // Initial validation on page load
    validateForm();
});
