/*----------- LOGIN FORM + NESTJS API -----------*/

function initLoginForm() {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (!email || !password) {
            showMessage('Будь ласка, заповніть всі поля', 'error');
            return;
        }

        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://99.253.170.119:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json();
                showMessage(error.message || 'Помилка входу', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            const result = await response.json();
            console.log('LOGIN OK:', result);

            // ⬇️ Зберігаємо токен
            localStorage.setItem('token', result.token);

            showMessage('Успішний вхід!', 'success');

            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1200);

        } catch (err) {
            console.error(err);
            showMessage('Помилка з’єднання з сервером', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

document.addEventListener("DOMContentLoaded", initLoginForm);

