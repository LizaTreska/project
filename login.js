document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    const emailInput = loginForm.querySelector('#email-login');
    const passwordInput = loginForm.querySelector('#password-login');
    const emailError = loginForm.querySelector('#emailError-login');
    const passwordError = loginForm.querySelector('#passwordError-login');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        let valid = true;

        // --- Email validation ---
        if (emailInput.value.trim() === '') {
            emailError.textContent = "Email is required!";
            valid = false;
        } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            emailError.textContent = "Enter a correct email address!";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        // --- Password validation ---
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

        if (passwordInput.value.trim() === '') {
            passwordError.textContent = "Password is required!";
            valid = false;
        } else if (!passwordPattern.test(passwordInput.value)) {
            passwordError.textContent = "Password ≥6 characters, contains letters, numbers and special characters";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        if (!valid) return;

        // --- Submit button handling ---
        const submitBtn = loginForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
 
        try {
            const response = await fetch('http://99.253.170.119:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput.value.trim(),
                    password: passwordInput.value.trim(),
                }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Unknown error' }));
                console.log('Error status:', response.status, error);
                emailError.textContent = error.message || 'Login failed';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            const result = await response.json();
            console.log("LOGIN SUCCESS:", result);

            localStorage.setItem('token', result.token);

            window.location.href = "/index.html";

        } catch (err) {
            console.error(err);
            emailError.textContent = "Connection error with server";
        }

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });

    console.log("Login form initialized");
});
