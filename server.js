const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const net = require('net');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Головний маршрут
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});
// Маршрут для обробки логіну
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Отримано дані для логіну:', { email, password: '***' });

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Будь ласка, заповніть email та пароль' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Введіть коректний email' 
            });
        }

        const user = await findUserByEmail(email);
        
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: 'Користувача з таким email не знайдено' 
            });
        }

        if (user.password !== password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Невірний пароль' 
            });
        }

        console.log('Успішний вхід для:', email);

        await saveLoginSession({ 
            email, 
            timestamp: new Date().toISOString(),
            status: 'success'
        });

        res.json({ 
            success: true, 
            message: 'Успішний вхід! Ласкаво просимо.',
            redirect: '/index.html',
            user: { email: user.email, name: user.name }
        });

    } catch (error) {
        console.error('Помилка логіну:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Помилка сервера під час входу' 
        });
    }
});

// Функція для пошуку користувача по email
async function findUserByEmail(email) {
    try {
        const fs = require('fs').promises;
        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);
        return users.find(user => user.email === email);
    } catch (error) {
        return null;
    }
}

// Функція для збереження сесії логіну
async function saveLoginSession(loginData) {
    try {
        const fs = require('fs').promises;
        let sessions = [];
        
        try {
            const existingData = await fs.readFile('login_sessions.json', 'utf8');
            sessions = JSON.parse(existingData);
        } catch (error) {
            console.log('Створюємо новий файл login_sessions.json');
        }

        sessions.push(loginData);
        await fs.writeFile('login_sessions.json', JSON.stringify(sessions, null, 2));
        
        console.log('Сесію логіну збережено');
    } catch (error) {
        console.error('Помилка збереження сесії:', error);
    }
}
app.post('/sign_up', async (req, res) => {
    try {
        const { first_name, last_name, email, password, confirm_password } = req.body;

        console.log('Отримано дані для реєстрації:', { 
            first_name, 
            last_name, 
            email, 
            password: '***' 
        });

        if (!first_name || !last_name || !email || !password || !confirm_password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Будь ласка, заповніть всі поля' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Введіть коректний email' 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                success: false, 
                message: 'Пароль має містити щонайменше 6 символів' 
            });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Паролі не співпадають' 
            });
        }

        const isEmailTaken = await checkIfEmailExists(email);
        if (isEmailTaken) {
            return res.status(400).json({ 
                success: false, 
                message: 'Цей email вже зареєстрований' 
            });
        }

        const user = await saveUser({ 
            first_name,
            last_name,
            email, 
            password, 
            createdAt: new Date().toISOString(),
            role: 'user'
        });

        console.log('Успішна реєстрація для:', email);

        res.json({ 
            success: true, 
            message: 'Реєстрація успішна! Ласкаво просимо.',
            redirect: '/index.html',
            user: { 
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email 
            }
        });

    } catch (error) {
        console.error('Помилка реєстрації:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Помилка сервера під час реєстрації' 
        });
    }
});

async function checkIfEmailExists(email) {
    try {
        const fs = require('fs').promises;
        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);
        return users.some(user => user.email === email);
    } catch (error) {
        return false;
    }
}

// Функція для збереження користувача
async function saveUser(userData) {
    try {
        const fs = require('fs').promises;
        let users = [];
        
        try {
            const existingData = await fs.readFile('users.json', 'utf8');
            users = JSON.parse(existingData);
        } catch (error) {
            console.log('Створюємо новий файл users.json');
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        await fs.writeFile('users.json', JSON.stringify(users, null, 2));
        
        console.log('Користувача збережено:', newUser.email);
        return newUser;
    } catch (error) {
        console.error('Помилка збереження користувача:', error);
        throw error;
    }
}

// Маршрут для отримання списку користувачів (для адміністратора)
app.get('/api/users', async (req, res) => {
    try {
        const fs = require('fs').promises;
        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);
        
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.json(usersWithoutPasswords);
    } catch (error) {
        res.json([]);
    }
});

// Функція для збереження даних
async function saveToDatabase(formData) {
    const data = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
    };

    try {
        let submissions = [];
        try {
            const existingData = await fs.readFile('submissions.json', 'utf8');
            submissions = JSON.parse(existingData);
        } catch (error) {
            console.log('Створюємо новий файл submissions.json');
        }

        submissions.push(data);
        await fs.writeFile('submissions.json', JSON.stringify(submissions, null, 2));
        console.log('Дані збережено успішно');
    } catch (error) {
        console.error('Помилка збереження:', error);
        throw error;
    }
}

// API маршрут для форми
app.post('/api/submit-form', async (req, res) => {
    try {
        const { name, email, city, expertise, message } = req.body;

        if (!name || !email || !message || !expertise || expertise.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Будь ласка, заповніть всі обов\'язкові поля' 
            });
        }

        await saveToDatabase(req.body);
        
        res.json({ 
            success: true, 
            message: 'Форма успішно відправлена!' 
        });

    } catch (error) {
        console.error('Помилка сервера:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Внутрішня помилка сервера' 
        });
    }
});

// Функція для знаходження вільного порту
function findFreePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(findFreePort(startPort + 1));
            } else {
                reject(err);
            }
        });
        
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => {
                resolve(port);
            });
        });
    });
}

// Запуск сервера
findFreePort(3000).then(port => {
    app.listen(port, () => {
        console.log(`🚀 Сервер запущено на http://localhost:${port}`);
        console.log(`📁 Поточна папка: ${__dirname}`);
    });
}).catch(err => {
    console.error('Помилка запуску сервера:', err);
});

