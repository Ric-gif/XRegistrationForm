document.addEventListener("DOMContentLoaded", function () {
    const formElements = document.querySelectorAll("input, select");
    const submitButton = document.querySelector(".btn-primary");

    // Function to check if all fields are valid
    function validateForm() {
        let isValid = true;

        formElements.forEach(input => {
            const errorElement = document.getElementById(input.id + "Error");

            // Check if there is any error message or if the field is empty
            if (input.value.trim() === "" || (errorElement && errorElement.textContent !== "")) {
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

    // Phone number validation
    document.getElementById('phone').addEventListener('input', function () {
        const phoneField = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const regex = /^\+\d{1,3}(?:\s?\d{3})?(?:\s?\d{5,})$/;
    
        if (!regex.test(phoneField.value)) {
            phoneError.textContent = "Please enter a valid phone number. Must start with + followed by country code. Example: +123 456 78901 or +12345678901";
            phoneField.style.border = "1px solid red";
        } else {
            phoneError.textContent = "";
            phoneField.style.border = "1px solid green";
        }
        validateForm();
    });
    


    // Password validation
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

    // Repeat password validation
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

    // Age validation
    const month = document.getElementById('month');
    const day = document.getElementById('day');
    const year = document.getElementById('year');

    // All fields are select type, so we can use the same event listener
    month.addEventListener('change', validateAge);
    day.addEventListener('change', validateAge);
    year.addEventListener('change', validateAge);

    // Dynamic Year select
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }

    // Dynamic day select depending on the month
    month.addEventListener('change', function () {
        const selectedMonth = month.value;
        const selectedYear = year.value;

        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

        day.innerHTML = "";
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            day.appendChild(option);
        }
    });

    function validateAge() {
        const month = document.getElementById('month').value;
        const day = document.getElementById('day').value;
        const year = document.getElementById('year').value;
        const ageError = document.getElementById('ageError');

        const date = new Date(year, month - 1, day);
        const age = new Date(new Date() - date).getFullYear() - 1970;

        if (age < 18) {
            ageError.textContent = "You must be at least 18 years old to register.";
            submitButton.disabled = true;
        } else {
            ageError.textContent = "";
            validateForm();
        }
    }

    // Correcting day when month or year changes to avoid invalid dates
    // Example: February 30th does not exist and should be corrected to February 28th
    year.addEventListener('change', function () {
        const selectedMonth = month.value;
        const selectedYear = year.value;
        const selectedDay = day.value;

        if (selectedMonth) {
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

            // Adjust the days in the day select dropdown
            day.innerHTML = "";
            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                day.appendChild(option);
            }

            // Ensure the selected day is valid
            if (selectedDay > daysInMonth) {
                day.value = daysInMonth;
            } else {
                day.value = selectedDay;
            }
        }
    });
});
