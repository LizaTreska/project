document.addEventListener("DOMContentLoaded", async () => {
    function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

const token = localStorage.getItem('token');
let userId = localStorage.getItem('userId');

if (!userId && token) {
    const payload = parseJwt(token);
    userId = payload?.id || null;
    if (userId) {
        localStorage.setItem('userId', userId);
    }
}

    if (!token || !userId) {
        window.location.href = "./login.html";
        return;
    }

    try {
        const response = await fetch(`http://99.253.170.119:5000/users/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error("Failed to load profile");
        }

        const user = await response.json();
        console.log("USER DATA:", user);

        // Поля з бекенду:
        // first_name, last_name, date_of_birth, gender, phone, email, image_url

        document.querySelector(".name").textContent = `${user.first_name} ${user.last_name}`;
        document.querySelector(".email").textContent = user.email;

        document.getElementById("name-user").value = user.first_name;
        document.getElementById("LNameUser").value = user.last_name;

        if (user.phone) {
            document.getElementById("phone-code").value = user.phone.slice(0, 4);
            document.getElementById("phone-number").value = user.phone.slice(4);
        }

        if (user.date_of_birth) {
            const [year, month, day] = user.date_of_birth.split("-");
            document.getElementById("day").value = day;
            document.getElementById("mounth").value = month;
            document.getElementById("year").value = year;
        }

        if (user.gender) {
            document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;
        }

        if (user.image_url) {
            document.getElementById("avatar").src = user.image_url;
        }

    } catch (err) {
        console.error(err);
        // window.location.href = "./login.html";
    }
});
