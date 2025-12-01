/*swipers*/

/*MAIN PAGE SWIPER*/

const coverflowSwiper = new Swiper(".swiper-coverflow", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 5,
  loop: true,
  coverflowEffect: {
    rotate: 0,
    depth: 200,
    modifier: 5,
    slideShadows: false,
  },
  
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
     mousewheel: {
        forceToAxis: true,   
        sensitivity: 1,
    },

  breakpoints: {
    560: {
      slidesPerView: 2,
      coverflowEffect: {
        rotate: 0,
        depth: 200,
        modifier: 2,
        slideShadows: false,
        stretch: 15,
      },
    },
    768: {
      slidesPerView: 2,
      coverflowEffect: {
        rotate: 0,
        depth: 200,
        modifier: 2,
        slideShadows: false,
        stretch: 10,
      },
    },
    1024: {
      slidesPerView: 2,
      coverflowEffect: {
        rotate: 0,
        depth: 200,
        modifier: 2,
        slideShadows: false,
        stretch: 5,
      },
    },
  },
});



/*ВЕРТИКАЛЬНИЙ СЛАЙДЕР ГАЛЕРЕЯ*/
document.addEventListener('DOMContentLoaded', function() {
    class VerticalSlider {
        constructor(containerSelector) {
            this.container = document.querySelector(containerSelector);
            if (!this.container) return;
            
            this.wrapper = this.container.querySelector('.swiper-wrapper-vertical');
            this.slides = this.container.querySelectorAll('.swiper-slide-vertical');
            this.currentIndex = 0;
            this.isAnimating = false;
            this.visibleSlides = 3;
            this.spaceBetween = 115;
            
            this.init();
            this.bindEvents();
        }
        
        init() {
            // Клонуємо слайди для безперервного циклу
            this.cloneSlides();
            this.updatePosition();
            
            this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }
        
        cloneSlides() {
            // Клонуємо перші слайди в кінець
            for (let i = 0; i < this.visibleSlides; i++) {
                const clone = this.slides[i].cloneNode(true);
                clone.classList.add('cloned');
                this.wrapper.appendChild(clone);
            }
            
            // Клонуємо останні слайди на початок
            for (let i = this.slides.length - 1; i >= this.slides.length - this.visibleSlides; i--) {
                const clone = this.slides[i].cloneNode(true);
                clone.classList.add('cloned');
                this.wrapper.insertBefore(clone, this.wrapper.firstChild);
            }
            
            // Оновлюємо колекцію слайдів
            this.allSlides = this.wrapper.querySelectorAll('.swiper-slide-vertical');
            this.totalSlides = this.allSlides.length;
            
            // Встановлюємо початкову позицію
            this.currentIndex = this.visibleSlides;
        }
        
        updatePosition() {
            if (!this.allSlides) return;
            
            const slideHeight = this.slides[0].offsetHeight;
            const translateY = -(this.currentIndex * (slideHeight + this.spaceBetween));
            this.wrapper.style.transform = `translateY(${translateY}px)`;
        }
        
        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            
            this.currentIndex++;
            this.updatePosition();
            
            setTimeout(() => {
                this.checkBounds();
                this.isAnimating = false;
            }, 800);
        }
        
        prev() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            
            this.currentIndex--;
            this.updatePosition();
            
            setTimeout(() => {
                this.checkBounds();
                this.isAnimating = false;
            }, 800);
        }
        
        checkBounds() {
            // Перевіряємо чи дійшли до кінця/початку і перестрибуємо
            if (this.currentIndex >= this.totalSlides - this.visibleSlides) {
                setTimeout(() => {
                    this.currentIndex = this.visibleSlides;
                    this.wrapper.style.transition = 'none';
                    this.updatePosition();
                    setTimeout(() => {
                        this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                    }, 50);
                }, 50);
            }
            
            if (this.currentIndex <= 0) {
                setTimeout(() => {
                    this.currentIndex = this.totalSlides - (2 * this.visibleSlides);
                    this.wrapper.style.transition = 'none';
                    this.updatePosition();
                    setTimeout(() => {
                        this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                    }, 50);
                }, 50);
            }
        }
        
        bindEvents() {
            // Стрілки клавіатури
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.next();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.prev();
                }
            });
            
            // Колесо миші
            this.container.addEventListener('wheel', (e) => {
                e.preventDefault();
                
                if (this.isAnimating) return;
                
                if (e.deltaY > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            });
            
            // Тач-свайп для мобільних пристроїв
            let startY = 0;
            
            this.container.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                this.wrapper.style.transition = 'none';
            });
            
            this.container.addEventListener('touchend', (e) => {
                const endY = e.changedTouches[0].clientY;
                const diff = startY - endY;
                
                this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                } else {
                    this.updatePosition();
                }
            });
            
            
        }
        
        startAutoPlay() {
            setInterval(() => {
                if (!this.isAnimating) {
                    this.next();
                }
            }, 4000); // Автопрокрутка кожні 4 секунди
        }
    }
    
    // Ініціалізація слайдера
    const verticalSlider = new VerticalSlider('.swiper-container-vertical');
    });


/*ГОРИЗОНТАЛЬНИЙ СЛАЙДЕР ДЛЯ ГАЛЕРЕЇ*/
/*ГОРИЗОНТАЛЬНИЙ СЛАЙДЕР ДЛЯ ГАЛЕРЕЇ*/
document.addEventListener('DOMContentLoaded', function() {

    class HorizontalSlider {
        constructor(containerSelector) {
            this.container = document.querySelector(containerSelector);
            if (!this.container) return; // Якщо контейнера немає, припиняємо ініціалізацію

            this.wrapper = this.container.querySelector('.swiper-wrapper-horizontal');
            if (!this.wrapper) return;

            this.slides = this.container.querySelectorAll('.swiper-slide-horizontal');

            if (!this.slides || this.slides.length === 0) return;

            this.currentIndex = 0;
            this.isAnimating = false;
            this.visibleSlides = 3;
            this.spaceBetween = 51;

            this.init();
            this.bindEvents();
        }

        init() {
            this.slideWidth = this.slides[0].offsetWidth;

            // Підвантажуємо всі зображення одразу
            this.preloadImages(this.slides);

            this.cloneSlides();

            // Після клонування оновлюємо колекцію слайдів
            this.allSlides = this.wrapper.querySelectorAll('.swiper-slide-horizontal');
            this.totalSlides = this.allSlides.length;

            this.currentIndex = this.visibleSlides;
            this.updatePosition();

            this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
            this.container.style.cursor = 'grab';
        }

        preloadImages(slides) {
            slides.forEach(slide => {
                const img = slide.querySelector('img');
                if (img) {
                    const src = img.getAttribute('data-src') || img.src;
                    img.src = src; // Примусово підвантажуємо
                }
            });
        }

        cloneSlides() {
            // Клонуємо останні слайди на початок
            for (let i = this.slides.length - 1; i >= this.slides.length - this.visibleSlides; i--) {
                const clone = this.slides[i].cloneNode(true);
                clone.classList.add('cloned');
                this.wrapper.insertBefore(clone, this.wrapper.firstChild);
            }

            // Клонуємо перші слайди в кінець
            for (let i = 0; i < this.visibleSlides; i++) {
                const clone = this.slides[i].cloneNode(true);
                clone.classList.add('cloned');
                this.wrapper.appendChild(clone);
            }

            // Підвантажуємо картинки в клонованих слайдах
            this.preloadImages(this.wrapper.querySelectorAll('.cloned'));
        }

        updatePosition() {
            const translateX = -(this.currentIndex * (this.slideWidth + this.spaceBetween));
            this.wrapper.style.transform = `translateX(${translateX}px)`;
        }

        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            this.currentIndex++;
            this.updatePosition();

            setTimeout(() => {
                this.checkBounds();
                this.isAnimating = false;
            }, 800);
        }

        prev() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            this.currentIndex--;
            this.updatePosition();

            setTimeout(() => {
                this.checkBounds();
                this.isAnimating = false;
            }, 800);
        }

        checkBounds() {
            // Якщо дійшли до клонів справа
            if (this.currentIndex >= this.totalSlides - this.visibleSlides) {
                this.wrapper.style.transition = 'none';
                this.currentIndex = this.visibleSlides;
                this.updatePosition();
                setTimeout(() => {
                    this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                }, 50);
            }

            // Якщо дійшли до клонів зліва
            if (this.currentIndex < this.visibleSlides) {
                this.wrapper.style.transition = 'none';
                this.currentIndex = this.totalSlides - (2 * this.visibleSlides);
                this.updatePosition();
                setTimeout(() => {
                    this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                }, 50);
            }
        }

        bindEvents() {
            // Клавіатура
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.next();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prev();
                }
            });

            // Колесо миші
            this.container.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (this.isAnimating) return;

                if (e.deltaY > 0 || e.deltaX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            });

            // Drag & Drop
            let isDragging = false;
            let startX = 0;
            let initialTranslate = 0;

            this.container.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                initialTranslate = this.currentIndex * (this.slideWidth + this.spaceBetween);
                this.wrapper.style.transition = 'none';
                this.container.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                const diff = startX - e.clientX;
                const resistance = 3;
                const translateX = -initialTranslate + (diff / resistance);
                this.wrapper.style.transform = `translateX(${translateX}px)`;
            });

            document.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;

                const diff = startX - e.clientX;
                this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                this.container.style.cursor = 'grab';

                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.next() : this.prev();
                } else {
                    this.updatePosition();
                }
            });

            this.container.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const diff = startX - e.touches[0].clientX;
                const resistance = 3;
                const translateX = -initialTranslate + (diff / resistance);
                this.wrapper.style.transform = `translateX(${translateX}px)`;
            });

            this.container.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;

                const diff = startX - e.changedTouches[0].clientX;
                this.wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';

                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.next() : this.prev();
                } else {
                    this.updatePosition();
                }
            });
        }
    }

    const containerExists = document.querySelector('.swiper-container-horizontal');
    if (containerExists) {
        new HorizontalSlider('.swiper-container-horizontal');
    }
});



/*SCROLL TO MAP FUNCTION FOR MAIN PAGE*/

function scrollToMap() {
    const mapSection = document.getElementById('map');
    if (mapSection) {
        mapSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}


//============================================================USER PROFILE PAGE====================================================

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.querySelector('.user-form');
    const headerAvatar = document.getElementById('headerAvatar');
    if (!headerAvatar) return;

    // ===== Header =====
    function updateHeader() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        headerAvatar.innerHTML = '';
        

        if (!currentUser || !currentUser.firstName || !currentUser.lastName) {
    headerAvatar.classList.remove('avatar-circle');
    headerAvatar.innerHTML = `<a href="./login.html" class="btn-header">Get in touch</a>`;
} else {
    const firstInitial = currentUser.firstName[0].toUpperCase();
    const lastInitial = currentUser.lastName[0].toUpperCase();

    headerAvatar.classList.add('avatar-circle');
    headerAvatar.innerHTML = `<a href="./user-profile.html">${firstInitial}${lastInitial}</a>`;
}


    }

    updateHeader();

    if (!profileForm) return;

    // ===== Elements =====
    const el = {
        editBtn: profileForm.querySelector('.edit'),
        logoutBtn: profileForm.querySelector('.logout'),
        avatar: profileForm.querySelector('#avatarDisplay'),
        avatarInput: profileForm.querySelector('#avatarInput'),
        buttonsContainer: profileForm.querySelector('.buttons-user'),
        nameDisplay: profileForm.querySelector('.card .name'),
        emailDisplay: profileForm.querySelector('.card .email'),
        firstNameInput: profileForm.querySelector('.info .form-row:nth-child(1) input'),
        lastNameInput: profileForm.querySelector('.info .form-row:nth-child(2) input'),
        emailInput: profileForm.querySelector('.info .form-row:nth-child(3) input'),
        phoneInputs: profileForm.querySelectorAll('.phone input'),
        dobInputs: profileForm.querySelectorAll('.dob input'),
        genderInputs: profileForm.querySelectorAll('input[name="gender"]'),
        errors: {
            firstName: profileForm.querySelector('#nameUser-error'),
            lastName: profileForm.querySelector('#LNameUser-error'),
            email: profileForm.querySelector('#emailUser-error'),
            phone: profileForm.querySelector('#phone-error'),
            dob: profileForm.querySelector('#date-error')
        }
    };

    let originalValues = {};

    // ===== Utilities =====
    const saveToLocalStorage = () => {
        const avatarImg = el.avatar.querySelector('img');
        const currentUser = {
            firstName: el.firstNameInput.value,
            lastName: el.lastNameInput.value,
            email: el.emailInput.value,
            avatar: avatarImg ? avatarImg.outerHTML : el.avatar.innerHTML,
            avatarType: avatarImg ? 'image' : 'text'
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateHeader();
    };

    const loadFromLocalStorage = () => JSON.parse(localStorage.getItem('currentUser')) || null;

    const disableForm = () => {
        [el.firstNameInput, el.lastNameInput, el.emailInput].forEach(i => i.disabled = true);
        el.phoneInputs.forEach(i => i.disabled = true);
        el.dobInputs.forEach(i => i.disabled = true);
        el.genderInputs.forEach(i => i.disabled = true);
        el.avatarInput.disabled = true;
        el.avatar.style.cssText = 'cursor: default; opacity: 0.7; pointer-events: none;';
        profileForm.querySelectorAll('.info input').forEach(i => i.style.backgroundColor = '#f5f5f5');
    };

    const enableForm = () => {
        [el.firstNameInput, el.lastNameInput, el.emailInput].forEach(i => i.disabled = false);
        el.phoneInputs.forEach(i => i.disabled = false);
        el.dobInputs.forEach(i => i.disabled = false);
        el.genderInputs.forEach(i => i.disabled = false);
        el.avatarInput.disabled = false;
        el.avatar.style.cssText = 'cursor: pointer; opacity: 1; pointer-events: auto;';
        profileForm.querySelectorAll('.info input').forEach(i => i.style.backgroundColor = '#fff');
    };

    const saveOriginalValues = () => {
        originalValues = {
            firstName: el.firstNameInput.value,
            lastName: el.lastNameInput.value,
            email: el.emailInput.value,
            phone: Array.from(el.phoneInputs).map(i => i.value),
            dob: Array.from(el.dobInputs).map(i => i.value),
            gender: profileForm.querySelector('input[name="gender"]:checked')?.value || '',
            avatar: el.avatar.innerHTML,
            nameDisplay: el.nameDisplay.textContent,
            emailDisplay: el.emailDisplay.textContent
        };
    };

    // ===== Validation =====
    const validateForm = () => {
        let valid = true;

        if (!el.firstNameInput.value.trim()) { el.errors.firstName.textContent = 'First name is required'; valid = false; } 
        else el.errors.firstName.textContent = '';

        if (!el.lastNameInput.value.trim()) { el.errors.lastName.textContent = 'Last name is required'; valid = false; } 
        else el.errors.lastName.textContent = '';

        const emailVal = el.emailInput.value.trim();
        if (!emailVal) { el.errors.email.textContent = 'Email is required'; valid = false; } 
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) { el.errors.email.textContent = 'Invalid email format'; valid = false; } 
        else el.errors.email.textContent = '';

        const phoneVals = Array.from(el.phoneInputs).map(i => i.value.trim());
        if (!phoneVals.every(v => v)) { el.errors.phone.textContent = 'Phone is required'; valid = false; } 
        else el.errors.phone.textContent = '';

        const day = parseInt(el.dobInputs[0].value, 10);
        const month = parseInt(el.dobInputs[1].value, 10);
        const year = parseInt(el.dobInputs[2].value, 10);
        const date = new Date(year, month - 1, day);

        if (!day || !month || !year || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) { 
            el.errors.dob.textContent = 'Invalid date'; valid = false; 
        } else el.errors.dob.textContent = '';

        return valid;
    };

    const attachInputValidation = () => {
        [el.firstNameInput, el.lastNameInput, el.emailInput, ...el.phoneInputs, ...el.dobInputs].forEach(i => {
            i.addEventListener('input', validateForm);
        });
    };

    // ===== Actions =====
    const startEdit = () => { saveOriginalValues(); enableForm(); createCancelSaveButtons(); attachInputValidation(); };

    const cancelEdit = () => {
        el.firstNameInput.value = originalValues.firstName;
        el.lastNameInput.value = originalValues.lastName;
        el.emailInput.value = originalValues.email;
        el.phoneInputs.forEach((i, idx) => i.value = originalValues.phone[idx]);
        el.dobInputs.forEach((i, idx) => i.value = originalValues.dob[idx]);
        el.genderInputs.forEach(i => i.checked = i.value === originalValues.gender);
        el.avatar.innerHTML = originalValues.avatar;
        el.nameDisplay.textContent = originalValues.nameDisplay;
        el.emailDisplay.textContent = originalValues.emailDisplay;
        disableForm();
        restoreOriginalButtons();
        validateForm();
    };

    const saveChanges = () => {
        if (!validateForm()) return;
        el.nameDisplay.textContent = `${el.firstNameInput.value} ${el.lastNameInput.value}`;
        el.emailDisplay.textContent = el.emailInput.value;
        saveToLocalStorage();
        disableForm();
        restoreOriginalButtons();
        alert('Changes saved successfully!');
    };

    const logoutUser = () => {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            updateHeader(); // оновити аватар або шапку
            window.location.href = './login.html';  // Переадресація на логін
        }
    };  

    const handleAvatarChange = e => {
        const file = e.target.files[0];
        if (!file?.type.match('image.*')) return alert('Please select an image file');
        const reader = new FileReader();
        reader.onload = ev => { el.avatar.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`; saveToLocalStorage(); };
        reader.readAsDataURL(file);
    };

    const createCancelSaveButtons = () => {
        el.buttonsContainer.innerHTML = '';
        const cancelBtn = document.createElement('button'); cancelBtn.type='button'; cancelBtn.textContent='Cancel'; cancelBtn.className='cancel';
        const saveBtn = document.createElement('button'); saveBtn.type='button'; saveBtn.textContent='Save changes'; saveBtn.className='save';
        el.buttonsContainer.append(cancelBtn, saveBtn);
        cancelBtn.addEventListener('click', cancelEdit);
        saveBtn.addEventListener('click', saveChanges);
    };

    const restoreOriginalButtons = () => {
        el.buttonsContainer.innerHTML = '';
        const logoutBtn = document.createElement('button'); logoutBtn.type='button'; logoutBtn.className='logout'; logoutBtn.textContent='Log out';
        const editBtn = document.createElement('button'); editBtn.type='button'; editBtn.className='edit'; editBtn.textContent='Edit profile';
        el.buttonsContainer.append(editBtn, logoutBtn);
        editBtn.addEventListener('click', startEdit);
        logoutBtn.addEventListener('click', logoutUser);
    };

    // ===== Initialization =====
const profileContainer = document.getElementById('profile-container');
const loadingMessage = document.getElementById('loading-message');

async function loadUserProfile() {
    // Ховаємо профіль і показуємо лоадер
    profileContainer.style.display = 'none';
    loadingMessage.style.display = 'block';

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        window.location.href = './login.html';
        return;
    }

    try {
        const res = await fetch(`http://99.253.170.119:5000/users/${userId}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const user = await res.json();

        // Оновлюємо UI
        el.firstNameInput.value = user.first_name;
        el.lastNameInput.value = user.last_name;
        el.emailInput.value = user.email;
        el.nameDisplay.textContent = `${user.first_name} ${user.last_name}`;
        el.emailDisplay.textContent = user.email;
        if(user.image_url) el.avatar.innerHTML = `<img src="${user.image_url}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;

        // Оновлюємо localStorage currentUser
        localStorage.setItem('currentUser', JSON.stringify({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            avatar: el.avatar.innerHTML,
        }));

        saveOriginalValues();
        disableForm();
        restoreOriginalButtons();

        // Показуємо профіль і ховаємо лоадер
        profileContainer.style.display = 'block';
        loadingMessage.style.display = 'none';

    } catch (e) {
        console.error(e);
        window.location.href = './login.html';
    }
}

loadUserProfile();
});





//=======================================================ITEM PAGE COMMENTS====================================================

const initialComments = [
    { id: 1, initials: "IK", text: "This reconstruction looks amazing! I love the historical details.", timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
    { id: 2, initials: "MS", text: "Great work! Can you provide the Blender file as well?", timestamp: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString() },
    { id: 3, initials: "PV", text: "This reconstruction looks amazing! I love the historical details.", timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() }
];

const MAX_COMMENTS = 3;

// Функція для отримання ініціалів
function getInitials(name) {
    if (!name) return 'UU';
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
}

// Формат часу
function formatTime(timestamp) {
    const now = new Date();
    const diff = Math.floor((now - new Date(timestamp)) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / 604800)} week${Math.floor(diff / 604800) > 1 ? 's' : ''} ago`;
}

// Відображення коментарів
function displayComments(comments) {
    const container = document.getElementById('commentsContainer');
    container.innerHTML = '';

    if (!comments || comments.length === 0) {
        container.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        return;
    }

    const commentsToShow = comments.slice(0, MAX_COMMENTS);

    commentsToShow.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-avatar">${comment.initials || getInitials(comment.name)}</div>
            <div class="comment-content">
                <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-time">${formatTime(comment.timestamp)}</div>
        `;
        container.appendChild(commentElement);
    });

    if (comments.length > MAX_COMMENTS) {
        const hiddenCount = comments.length - MAX_COMMENTS;
        const hiddenElement = document.createElement('div');
        hiddenElement.className = 'hidden-comments';
        hiddenElement.innerHTML = `<p>...and ${hiddenCount} more comments</p>`;
        container.appendChild(hiddenElement);
    }
}

// Додавання нового коментаря
function addNewComment(name, email, text) {
    const initials = getInitials(name);
    const newComment = {
        id: Date.now(),
        name,
        initials,
        text,
        timestamp: new Date().toISOString()
    };

    let comments = JSON.parse(localStorage.getItem('comments')) || [...initialComments];
    comments.unshift(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    displayComments(comments);
    return newComment;
}

// Валідація тексту коментаря
function validateForm(text) {
    const errors = [];
    if (!text.trim()) errors.push('Comment text is required');
    else if (text.trim().length < 5) errors.push('Comment must be at least 5 characters long');
    return errors;
}

// Показ повідомлення
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.classList.remove('hidden');
    setTimeout(() => messageDiv.classList.add('hidden'), 5000);
}

// Скидання форми
function resetForm() {
    const form = document.getElementById('commentForm');
    if (form) form.reset();
}

// Ініціалізація коментарів
// Ініціалізація коментарів
function initComments() {
    const commentsSection = document.querySelector('.comments');
    if (!commentsSection) return;

    const submitButton = document.getElementById('submitComment');
    const commentText = document.getElementById('commentText');
    const commentForm = document.getElementById('commentForm');

    if (submitButton && commentText) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Перевірка авторизації
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                showMessage('You must be logged in to post a comment.', 'error');
                return;
            }

            const text = commentText.value;
            const errors = validateForm(text);
            if (errors.length > 0) {
                showMessage(errors.join(', '), 'error');
                return;
            }

            addNewComment(currentUser.name, currentUser.email, text);
            showMessage('Comment added successfully!', 'success');
            resetForm();
        });

        commentText.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) submitButton.click();
        });
    }

    const savedComments = JSON.parse(localStorage.getItem('comments'));
    displayComments(savedComments && savedComments.length ? savedComments : initialComments);
}


document.addEventListener('DOMContentLoaded', initComments);

// API для зовнішнього доступу
window.commentManager = {
    addNewComment,
    displayComments,
    initComments,
    getInitials,
    MAX_COMMENTS
};



//=====================================перевірка для форм логіну та реєстрації=====================================
// document.addEventListener('DOMContentLoaded', function() {

//   // --- ЛОГІН ---
//   const loginForm = document.getElementById('login-form');
//   if (loginForm) {
//     const emailInput = loginForm.querySelector('#email-login');
//     const passwordInput = loginForm.querySelector('#password-login');
//     const emailError = loginForm.querySelector('#emailError-login');
//     const passwordError = loginForm.querySelector('#passwordError-login');

//     loginForm.addEventListener('submit', function(e) {
//       e.preventDefault();
//       let valid = true;

//       if (emailInput.value.trim() === '') {
//         emailError.textContent = "Email is required!";
//         valid = false;
//       } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
//         emailError.textContent = "Enter the correct email address! It must contain @ and .";
//         valid = false;
//       } else emailError.textContent = "";

//       const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
//       if (passwordInput.value.trim() === '') {
//         passwordError.textContent = "Password is required!";
//         valid = false;
//       } else if (!passwordPattern.test(passwordInput.value)) {
//         passwordError.textContent = "Password ≥6 characters, contains letters, numbers and special characters";
//         valid = false;
//       } else passwordError.textContent = "";

//       if (valid) {
//         const users = JSON.parse(localStorage.getItem('users') || '[]');
//         const user = users.find(u => u.email === emailInput.value.trim() && u.password === passwordInput.value);

//         if (user) {
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           window.location.href = "user-profile.html";
//         } else {
//           emailError.textContent = "Incorrect email or password!";
//         }
//       }
//     });
//   }

//   // --- РЕЄСТРАЦІЯ ---
//   const signupForm = document.getElementById('signup-form');
// if (signupForm) {
//   const firstName = signupForm.querySelector('#first-name');
//   const lastName = signupForm.querySelector('#last-name');
//   const email = signupForm.querySelector('#email-signup');
//   const password = signupForm.querySelector('#password-signup');
//   const confirmPassword = signupForm.querySelector('#confirm-password');

//   const firstNameError = signupForm.querySelector('#nameError');
//   const lastNameError = signupForm.querySelector('#LNameError');
//   const emailError = signupForm.querySelector('#emailError-signup');
//   const passwordError = signupForm.querySelector('#passwordError-signup');
//   const confirmPasswordError = signupForm.querySelector('#confirmPasswordError');

//   const submitBtn = signupForm.querySelector('#submitDetails');

//   signupForm.addEventListener('submit', function(e) {
//     e.preventDefault();
//     let valid = true;

//     if (firstName.value.trim() === '') {
//       firstNameError.textContent = "First name is required!";
//       valid = false;
//     } else firstNameError.textContent = "";

//     if (lastName.value.trim() === '') {
//       lastNameError.textContent = "Last name is required!";
//       valid = false;
//     } else lastNameError.textContent = "";

//     if (email.value.trim() === '') {
//       emailError.textContent = "Email is required!";
//       valid = false;
//     } else if (!email.value.includes('@') || !email.value.includes('.')) {
//       emailError.textContent = "Enter a valid email!";
//       valid = false;
//     } else emailError.textContent = "";

//     const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
//     if (password.value.trim() === '') {
//       passwordError.textContent = "Password is required!";
//       valid = false;
//     } else if (!passwordPattern.test(password.value)) {
//       passwordError.textContent = "Password must be ≥6 characters, contain letters, numbers, and special chars";
//       valid = false;
//     } else passwordError.textContent = "";

//     if (confirmPassword.value.trim() === '') {
//       confirmPasswordError.textContent = "Confirm your password!";
//       valid = false;
//     } else if (confirmPassword.value !== password.value) {
//       confirmPasswordError.textContent = "Passwords do not match!";
//       valid = false;
//     } else confirmPasswordError.textContent = "";

//     if (valid) {
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
//       if (users.find(u => u.email === email.value.trim())) {
//         emailError.textContent = "This email is already registered!";
//         return;
//       }

//       const newUser = {
//         firstName: firstName.value.trim(),
//         lastName: lastName.value.trim(),
//         email: email.value.trim(),
//         password: password.value
//       };

//       users.push(newUser);
//       localStorage.setItem('users', JSON.stringify(users));

//       alert("Registration successful!");
//       window.location.href = "login.html";
//     }
//   });

// };






/*
document.addEventListener('DOMContentLoaded', function() {
    const submitComment = document.getElementById('submitComment');
    const commentForm = document.getElementById('commentForm');
    const formMessage = document.getElementById('formMessage');

    // Припустимо, що у localStorage зберігаються користувачі та активна сесія
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Блокування форми для незареєстрованих
        commentForm.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
        submitComment.disabled = true;

        formMessage.textContent = "Тільки зареєстровані користувачі можуть залишати коментарі. Будь ласка, увійдіть.";
        formMessage.classList.remove('hidden');
        formMessage.style.color = "red";
    } else {
        // Для зареєстрованих користувачів — можна надсилати коментар
        submitComment.addEventListener('click', function() {
            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const text = document.getElementById('commentText').value.trim();

            if (!name || !email || !text) {
                formMessage.textContent = "Заповніть всі поля!";
                formMessage.style.color = "red";
                return;
            }

            const comment = { name, email, text, date: new Date().toLocaleString() };
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.push(comment);
            localStorage.setItem('comments', JSON.stringify(comments));

            displayComments(); // Функція для показу коментарів нижче
            commentForm.reset();
            formMessage.textContent = "Коментар надіслано!";
            formMessage.style.color = "green";
=======
document.addEventListener('DOMContentLoaded', function () {

  /* ================================
        Л О Г І Н
  ================================ */
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    const emailInput = loginForm.querySelector('#email-login');
    const passwordInput = loginForm.querySelector('#password-login');
    const emailError = loginForm.querySelector('#emailError-login');
    const passwordError = loginForm.querySelector('#passwordError-login');

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // --- EMAIL ---
      if (emailInput.value.trim() === '') {
        emailError.textContent = "Email is required!";
        valid = false;
      } else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        emailError.textContent = "Email must contain @ and .";
        valid = false;
      } else {
        emailError.textContent = "";
      }

      // --- PASSWORD ---
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

      if (passwordInput.value.trim() === '') {
        passwordError.textContent = "Password is required!";
        valid = false;
      } else if (!passwordPattern.test(passwordInput.value)) {
        passwordError.textContent =
          "Password must be at least 6 chars, contain letters, numbers and special symbol.";
        valid = false;
      } else {
        passwordError.textContent = "";
      }

      if (!valid) return;

      // ==========================
      //     FETCH LOGIN REQUEST
      // ==========================
      const loginData = {
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };

      fetch("http://99.253.170.119:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })
        .then((res) => res.json())
        .then((data) => {

          if (!data.success) {
            emailError.textContent = data.message || "Incorrect email or password!";
            return;
          }

          // Save token + user
          localStorage.setItem("token", data.token);
          localStorage.setItem("currentUser", JSON.stringify(data.user));

          window.location.href = "user-profile.html";
        })
        .catch((err) => {
          console.error(err);
          emailError.textContent = "Server connection error!";
        });
    });
  }

  /* ================================
        Р Е Є С Т Р А Ц І Я
  ================================ */
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

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // --- FIRST NAME ---
      if (firstName.value.trim() === '') {
        firstNameError.textContent = "First name is required!";
        valid = false;
      } else firstNameError.textContent = "";

      // --- LAST NAME ---
      if (lastName.value.trim() === '') {
        lastNameError.textContent = "Last name is required!";
        valid = false;
      } else lastNameError.textContent = "";

      // --- EMAIL ---
      if (email.value.trim() === '') {
        emailError.textContent = "Email is required!";
        valid = false;
      } else if (!email.value.includes('@') || !email.value.includes('.')) {
        emailError.textContent = "Enter a valid email!";
        valid = false;
      } else emailError.textContent = "";

      // --- PASSWORD ---
      const pwPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

      if (password.value.trim() === '') {
        passwordError.textContent = "Password is required!";
        valid = false;
      } else if (!pwPattern.test(password.value)) {
        passwordError.textContent =
          "Password must be ≥6 chars, include letters, numbers, and special chars";
        valid = false;
      } else passwordError.textContent = "";

      // --- CONFIRM PASSWORD ---
      if (confirmPassword.value.trim() === '') {
        confirmPasswordError.textContent = "Confirm your password!";
        valid = false;
      } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = "Passwords do not match!";
        valid = false;
      } else confirmPasswordError.textContent = "";

      if (!valid) return;

      // ==========================
      //     FETCH SIGN UP REQUEST
      // ==========================
      const newUser = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
      };

      fetch("http://99.253.170.119:5000/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            emailError.textContent = data.message || "Registration failed!";
            return;
          }

          alert("Registration successful!");
          window.location.href = "login.html";
        })
        .catch((err) => {
          console.error(err);
          emailError.textContent = "Server connection error!";
        });
    });
}







document.addEventListener('DOMContentLoaded', function () {
    const downloadLinks = document.querySelectorAll('.download-link');

    downloadLinks.forEach(link => {
        // Знаходимо span для повідомлення поруч з файлом
        const errorMessage = link.parentElement.querySelector('.error-message');

        link.addEventListener('click', function (e) {
            const currentUser = localStorage.getItem('currentUser');

            if (!currentUser) {
                e.preventDefault(); // Блокуємо завантаження

                if (errorMessage) {
                    errorMessage.textContent = "You must be logged in to download files.";
                    errorMessage.classList.add('visible'); // Додати клас для стилю

                    // Прибираємо повідомлення через 3 сек
                    setTimeout(() => {
                        errorMessage.textContent = "";
                        errorMessage.classList.remove('visible');
                    }, 3000);
                }
            }
        });
    });
});

// ====================SUBSCRIBE FORM MAIN ===================

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('subscribe-form');
    const nameInput = document.getElementById('name-sub');
    const emailInput = document.getElementById('email-sub');

    const nameError = document.getElementById('nameError-sub');
    const emailError = document.getElementById('emailError-sub');
    const successMessage = document.getElementById('successMessage-sub');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // зупиняємо стандартну відправку

        let valid = true;

        // Очищення попередніх повідомлень
        nameError.textContent = "";
        emailError.textContent = "";
        successMessage.textContent = "";

        // --- Перевірка імені ---
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            valid = false;
        }

        // --- Перевірка email ---
        const emailValue = emailInput.value.trim();

        if (emailValue === "") {
            emailError.textContent = "Please enter your email.";
            valid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            emailError.textContent = "Email must contain '@' and '.'.";
            valid = false;
        }

        // Якщо не валідно — зупиняємо
        if (!valid) return;

        // Якщо валідно — показуємо успіх
        successMessage.textContent = "You have successfully subscribed!";

        // Можна очистити поля
        form.reset();
    });
});



