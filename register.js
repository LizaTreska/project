// --- РЕЄСТРАЦІЯ ---
const signupForm = document.getElementById('signup-form');

if (signupForm) {
  const firstName = signupForm.querySelector('#first-name');
  const lastName = signupForm.querySelector('#last-name');
  const email = signupForm.querySelector('#email-signup');
  const password = signupForm.querySelector('#password-signup');
  const confirmPassword = signupForm.querySelector('#confirm-password');

  const firstNameError = signupForm.querySelector('#nameError');
  const lastNameError = signupForm.querySelector('#LNameError');
  const emailError = signupForm.querySelector('#emailError-signup');
  const passwordError = signupForm.querySelector('#passwordError-signup');
  const confirmPasswordError = signupForm.querySelector('#confirmPasswordError');

  signupForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    let valid = true;

    // --- Валідація ---
    if (firstName.value.trim() === '') {
      firstNameError.textContent = "First name is required!";
      valid = false;
    } else firstNameError.textContent = "";

    if (lastName.value.trim() === '') {
      lastNameError.textContent = "Last name is required!";
      valid = false;
    } else lastNameError.textContent = "";

    if (email.value.trim() === '') {
      emailError.textContent = "Email is required!";
      valid = false;
    } else if (!email.value.includes('@') || !email.value.includes('.')) {
      emailError.textContent = "Enter a valid email!";
      valid = false;
    } else emailError.textContent = "";

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    if (password.value.trim() === '') {
    passwordError.textContent = "Password is required!";
    valid = false;
    } else if (!passwordPattern.test(password.value)) {
    passwordError.textContent = "Password must be ≥6 characters, contain letters, numbers, and special characters";
    valid = false;
    } else {
    passwordError.textContent = "";
    }

    if (confirmPassword.value.trim() === '') {
      confirmPasswordError.textContent = "Confirm your password!";
      valid = false;
    } else if (confirmPassword.value !== password.value) {
      confirmPasswordError.textContent = "Passwords do not match!";
      valid = false;
    } else confirmPasswordError.textContent = "";

    if (!valid) return;

    // --- JSON для бекенду з snake_case ---
    const payload = {
      first_name: firstName.value.trim(),
      last_name: lastName.value.trim(),
      email: email.value.trim(),
      password: password.value
    };

    try {
      const response = await fetch("http://99.253.170.119:5000/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        emailError.textContent = data.message || "Registration error!";
        return;
      }

      alert("Registration successful!");
      window.location.href = "login.html";

    } catch (error) {
      console.error("Error:", error);
      emailError.textContent = "Server unavailable!";
    }
  });
}
