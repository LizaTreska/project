 document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('join-form');
    if (!joinForm) return;

    const nameInput = joinForm.querySelector('#name-join');
    const cityInput = joinForm.querySelector('#city');
    const messageInput = joinForm.querySelector('#message');
    const emailInput = joinForm.querySelector('#email-join');
    const expertiseCheckboxes = joinForm.querySelectorAll('input[name="expertise"]');

    const nameError = joinForm.querySelector('#nameError-join');
    const cityError = joinForm.querySelector('#cityError');
    const expertiseError = joinForm.querySelector('#expertiseError');
    const messageError = joinForm.querySelector('#messageError');
    const emailError = joinForm.querySelector('#emailError-join');

    function validateForm() {
        let valid = true;

        // Name
        if (!nameInput.value.trim()) {
            nameError.textContent = "Please enter your name!";
            valid = false;
        } else {
            nameError.textContent = "";
        }

        // City
        if (!cityInput.value.trim()) {
            cityError.textContent = "Please enter your city!";
            valid = false;
        } else {
            cityError.textContent = "";
        }

        // Expertise
        const anyChecked = Array.from(expertiseCheckboxes).some(cb => cb.checked);
        if (!anyChecked) {
            expertiseError.textContent = "Please select at least one expertise!";
            valid = false;
        } else {
            expertiseError.textContent = "";
        }

        // Message
        if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
            messageError.textContent = "Message must be at least 15 characters!";
            valid = false;
        } else {
            messageError.textContent = "";
        }

        // Email
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            emailError.textContent = "Email is required!";
            valid = false;
        } else if (!emailRegex.test(emailVal)) {
            emailError.textContent = "Enter a valid email!";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        return valid;
    }

    // Submit handler
    joinForm.addEventListener('submit', function(e) {
    e.preventDefault(); // зупиняє перезавантаження
    if (validateForm()) {
        alert("Form submitted successfully!");
        joinForm.reset();
    }
});

    // Події input/change для автоматичного зникнення помилок
    [nameInput, cityInput, messageInput, emailInput].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    expertiseCheckboxes.forEach(cb => {
        cb.addEventListener('change', validateForm);
    });
});