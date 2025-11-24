/*swipers*/

/*MAIN PAGE SWIPER*/

const swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  coverflowEffect: {
    rotate: 0,
    depth: 200,
    modifier: 2,
    slideShadows: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    thresholdDelta: true,
  },
  breakpoints: {
    560: {
      slidesPerView: 2,
      coverflowEffect: { stretch: 15 }, 
    },
    768: {
      slidesPerView: 2,
      coverflowEffect: { stretch: 10 },
    },
    1024: {
      slidesPerView: 2,
      coverflowEffect: { stretch: 5 },
    },
  },
});


/*ВЕРТИКАЛЬНИЙ СЛАЙДЕР ГАЛЕРЕЯ*/
document.addEventListener('DOMContentLoaded', function() {
    const swiperWrapper = document.querySelector('.swiper-wrapper-vertical');
    const slides = document.querySelectorAll('.swiper-slide-vertical');
    const slidesCount = slides.length;
    const visibleSlides = 3;
    let currentIndex = 0;
    let isScrolling = false;
    let scrollTimeout;
    
    function initSlider() {
        updateSliderPosition();
        
        swiperWrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        swiperWrapper.style.willChange = 'transform';
    }
    
    swiperWrapper.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        isScrolling = true;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        let newIndex = currentIndex;
        
        if (direction > 0 && currentIndex < slidesCount - visibleSlides) {
            newIndex = currentIndex + 1;
        } else if (direction < 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
        }
        
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateSliderPosition();
        }
        
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 400);
    });
    
    function updateSliderPosition() {
        const containerHeight = swiperWrapper.parentElement.offsetHeight;
        const totalGapHeight = 115 * (visibleSlides - 1);
        const slideHeight = (containerHeight - totalGapHeight) / visibleSlides;
        const gapPercentage = (115 / containerHeight) * 100;
        const slideHeightPercentage = (slideHeight / containerHeight) * 100;
        
        const translateY = -currentIndex * (slideHeightPercentage + gapPercentage);
        swiperWrapper.style.transform = `translateY(${translateY}%)`;
    }
    
    let startY = 0;
    let isTouching = false;
    
    swiperWrapper.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        isTouching = true;
        swiperWrapper.style.transition = 'none'; 
    });
    
    swiperWrapper.addEventListener('touchmove', function(e) {
        if (!isTouching) return;
        e.preventDefault();
        
        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        const dragPercentage = diff / swiperWrapper.offsetHeight * 100;
        
        if (Math.abs(dragPercentage) < 15) {
            const containerHeight = swiperWrapper.parentElement.offsetHeight;
            const totalGapHeight = 115 * (visibleSlides - 1);
            const slideHeight = (containerHeight - totalGapHeight) / visibleSlides;
            const gapPercentage = (115 / containerHeight) * 100;
            const slideHeightPercentage = (slideHeight / containerHeight) * 100;
            
            const baseTranslateY = -currentIndex * (slideHeightPercentage + gapPercentage);
            const dragTranslateY = baseTranslateY + (dragPercentage / 2);
            
            swiperWrapper.style.transform = `translateY(${dragTranslateY}%)`;
        }
    });
    
    swiperWrapper.addEventListener('touchend', function(e) {
        if (!isTouching) return;
        isTouching = false;
        
        swiperWrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;
        
        if (Math.abs(diff) > 40) {
            if (diff > 0 && currentIndex < slidesCount - visibleSlides) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
        }
        
        updateSliderPosition();
    });
    
    window.addEventListener('resize', function() {
        updateSliderPosition();
    });
    
    initSlider();
});

/*ГОРИЗОНТАЛЬНИЙ СЛАЙДЕР ДЛЯ ГАЛЕРЕЇ*/
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.swiper-wrapper-horizontal');
    const slides = Array.from(wrapper.children);
    const slidesCount = slides.length;
    const visibleSlides = 3; // скільки показувати одночасно
    let currentIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    // Ініціалізація
    function initSlider() {
        updateSliderPosition();
    }

    // Прокрутка мишкою
    wrapper.parentElement.addEventListener('wheel', function(e) {
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;
        clearTimeout(scrollTimeout);

        const direction = e.deltaY > 0 ? 1 : -1;
        let newIndex = currentIndex;

        if (direction > 0 && currentIndex < slidesCount - visibleSlides) {
            newIndex = currentIndex + 1;
        } else if (direction < 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
        }

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateSliderPosition();
        }

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 400);
    });

    // Функція оновлення позиції
    function updateSliderPosition() {
        const containerWidth = wrapper.parentElement.offsetWidth;
        const totalGap = 20 * (visibleSlides - 1);
        const slideWidth = (containerWidth - totalGap) / visibleSlides;
        const gapPercent = (20 / containerWidth) * 100;
        const slidePercent = (slideWidth / containerWidth) * 100;

        const translateX = -currentIndex * (slidePercent + gapPercent);
        wrapper.style.transform = `translateX(${translateX}%)`;
    }

    // Touch / swipe
    let startX = 0;
    let isTouching = false;

    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isTouching = true;
        wrapper.style.transition = 'none';
    });

    wrapper.addEventListener('touchmove', (e) => {
        if (!isTouching) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        const dragPercent = (diff / wrapper.offsetWidth) * 100;

        const containerWidth = wrapper.parentElement.offsetWidth;
        const totalGap = 20 * (visibleSlides - 1);
        const slideWidth = (containerWidth - totalGap) / visibleSlides;
        const gapPercent = (20 / containerWidth) * 100;
        const slidePercent = (slideWidth / containerWidth) * 100;

        const baseTranslate = -currentIndex * (slidePercent + gapPercent);
        const dragTranslate = baseTranslate + (dragPercent / 2);

        wrapper.style.transform = `translateX(${dragTranslate}%)`;
    });

    wrapper.addEventListener('touchend', () => {
        isTouching = false;
        wrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
        updateSliderPosition();
    });

    initSlider();
});


/*SCROLL TO MAP FUNCTION FOR MAIN PAGE*/

function scrollToMap() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}


/*USER PROFILE PAFE*/

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    
// Функція для оновлення аватара в header 

    function updateHeaderAvatar() {
        console.log('Updating header avatar...');
        const headerAvatar = document.getElementById('headerAvatar');
        
        if (!headerAvatar) {
            console.log('Header avatar element not found on this page');
            return;
        }
        
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            const userData = JSON.parse(savedData);
            
            if (userData.avatarType === 'image' && userData.avatar) {
                headerAvatar.innerHTML = userData.avatar;
                console.log('Header avatar updated to image');
            } else {
                const firstName = userData.firstName || 'S';
                const lastName = userData.lastName || 'P';
                const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
                headerAvatar.textContent = initials;
                console.log('Header avatar updated to initials:', initials);
            }
        } else {
            headerAvatar.textContent = 'SP'; 
            console.log('Header avatar set to default: SP');
        }
    }
    
    updateHeaderAvatar();
    
    const profilePage = document.querySelector('.user-form');
    if (!profilePage) {
        console.log('Not on profile page, skipping profile initialization');
        return; 
    }
    
    console.log('Initializing profile page...');
    

    const elements = {
        editBtn: document.querySelector('.edit'),
        logoutBtn: document.querySelector('.logout'),
        avatar: document.getElementById('avatarDisplay'),
        avatarInput: document.getElementById('avatarInput'),
        buttonsContainer: document.querySelector('.buttons-user'),
        nameDisplay: document.querySelector('.card .name'),
        emailDisplay: document.querySelector('.card .email'),
        firstNameInput: document.querySelector('.info .form-row:nth-child(1) input'),
        lastNameInput: document.querySelector('.info .form-row:nth-child(2) input'),
        emailInput: document.querySelector('.info .form-row:nth-child(3) input'),
        phoneInputs: document.querySelectorAll('.phone input'),
        dobInputs: document.querySelectorAll('.dob input'),
        genderInputs: document.querySelectorAll('input[name="gender"]')
    };
    
    console.log('Found elements:', elements);
    
    let originalValues = {};
    
    function saveToLocalStorage() {
        const firstName = elements.firstNameInput.value;
        const lastName = elements.lastNameInput.value;
        
        const avatarImg = elements.avatar.querySelector('img');
        const avatarType = avatarImg ? 'image' : 'text';
        const avatarContent = avatarImg ? avatarImg.outerHTML : elements.avatar.innerHTML;
        
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: elements.emailInput.value,
            avatar: avatarContent,
            avatarType: avatarType
        };
        localStorage.setItem('userProfile', JSON.stringify(userData));
        console.log('Data saved to localStorage:', userData);
        
        updateHeaderAvatar();
    }
    
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            const userData = JSON.parse(savedData);
            console.log('Data loaded from localStorage:', userData);
            return userData;
        }
        return null;
    }
    
    function saveOriginalValues() {
        originalValues.firstName = elements.firstNameInput.value;
        originalValues.lastName = elements.lastNameInput.value;
        originalValues.email = elements.emailInput.value;
        originalValues.phone = Array.from(elements.phoneInputs).map(input => input.value);
        originalValues.dob = Array.from(elements.dobInputs).map(input => input.value);
        originalValues.gender = document.querySelector('input[name="gender"]:checked').value;
        originalValues.avatar = elements.avatar.innerHTML;
        originalValues.name = elements.nameDisplay.textContent;
        originalValues.emailDisplay = elements.emailDisplay.textContent;
        originalValues.hasCustomAvatar = elements.avatar.querySelector('img') !== null;
    }
    
    function disableForm() {
        elements.firstNameInput.disabled = true;
        elements.lastNameInput.disabled = true;
        elements.emailInput.disabled = true;
        elements.phoneInputs.forEach(input => input.disabled = true);
        elements.dobInputs.forEach(input => input.disabled = true);
        elements.genderInputs.forEach(input => input.disabled = true);
        
        const existingAvatarControls = document.querySelector('.avatar-controls');
        if (existingAvatarControls) {
            existingAvatarControls.remove();
        }
        
        elements.avatarInput.disabled = true;
        
        elements.avatar.style.cursor = 'default';
        elements.avatar.style.opacity = '0.7';
        elements.avatar.style.pointerEvents = 'none';

        const allInputs = document.querySelectorAll('.info input');
        allInputs.forEach(input => {
            input.style.backgroundColor = '#f5f5f5';
            input.style.cursor = 'not-allowed';
        });
    }

    function enableForm() {
        elements.firstNameInput.disabled = false;
        elements.lastNameInput.disabled = false;
        elements.emailInput.disabled = false;
        elements.phoneInputs.forEach(input => input.disabled = false);
        elements.dobInputs.forEach(input => input.disabled = false);
        elements.genderInputs.forEach(input => input.disabled = false);
        
        elements.avatarInput.disabled = false;
        
        createAvatarControls();
        
        const allInputs = document.querySelectorAll('.info input');
        allInputs.forEach(input => {
            input.style.backgroundColor = '#ffffff';
            input.style.cursor = 'text';
        });
    }
    
    function createAvatarControls() {
        const existingAvatarControls = document.querySelector('.avatar-controls');
        if (existingAvatarControls) {
            existingAvatarControls.remove();
        }
        
        const avatarControls = document.createElement('div');
        avatarControls.className = 'avatar-controls';
        
        const uploadButton = document.createElement('button');
        uploadButton.type = 'button';
        uploadButton.className = 'upload-photo';
        uploadButton.textContent = 'Upload new photo';

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'remove-photo';
        removeButton.textContent = 'Remove';
        
        uploadButton.addEventListener('click', function() {
            elements.avatarInput.click();
        });
        
        removeButton.addEventListener('click', removeAvatar);
        
        avatarControls.appendChild(uploadButton);
        avatarControls.appendChild(removeButton);
        
        elements.avatar.parentNode.appendChild(avatarControls);
    }
    
    function removeAvatar() {
        if (confirm('Are you sure you want to remove your photo?')) {
            elements.avatar.innerHTML = 'SP';
            
            originalValues.avatar = 'SP';
            originalValues.avatarRemoved = true;
            
            saveToLocalStorage();
            
            alert('Photo removed successfully!');
        }
    }
    
    function createCancelSaveButtons() {
        elements.buttonsContainer.innerHTML = '';
        
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.className = 'cancel';
        cancelButton.textContent = 'Cancel';
        
        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.className = 'save';
        saveButton.textContent = 'Save changes';
        
        elements.buttonsContainer.appendChild(cancelButton);
        elements.buttonsContainer.appendChild(saveButton);
        
        cancelButton.addEventListener('click', cancelEdit);
        saveButton.addEventListener('click', saveChanges);
    }
    
    function restoreOriginalButtons() {
        elements.buttonsContainer.innerHTML = '';
        
        const logoutBtn = document.createElement('button');
        logoutBtn.type = 'button';
        logoutBtn.className = 'logout';
        logoutBtn.textContent = 'Log out';
        
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'edit';
        editBtn.textContent = 'Edit profile';
        
        elements.buttonsContainer.appendChild(logoutBtn);
        elements.buttonsContainer.appendChild(editBtn);
        
        editBtn.addEventListener('click', startEdit);
        logoutBtn.addEventListener('click', logoutUser);
    }
    
    function startEdit() {
        console.log('Starting edit mode');
        saveOriginalValues();
        enableForm();
        createCancelSaveButtons();
    }
    
    function cancelEdit() {
        console.log('Canceling edit');
        
        elements.firstNameInput.value = originalValues.firstName;
        elements.lastNameInput.value = originalValues.lastName;
        elements.emailInput.value = originalValues.email;
        
        elements.phoneInputs.forEach((input, index) => {
            input.value = originalValues.phone[index];
        });
        
        elements.dobInputs.forEach((input, index) => {
            input.value = originalValues.dob[index];
        });
        
        elements.genderInputs.forEach(input => {
            if (input.value === originalValues.gender) {
                input.checked = true;
            }
        });

        elements.avatar.innerHTML = originalValues.avatar;
        
        elements.nameDisplay.textContent = originalValues.name;
        elements.emailDisplay.textContent = originalValues.emailDisplay;
        
        disableForm();
        restoreOriginalButtons();
    }
    
    function saveChanges() {
        console.log('Saving changes');
        
        elements.nameDisplay.textContent = `${elements.firstNameInput.value} ${elements.lastNameInput.value}`;
        elements.emailDisplay.textContent = elements.emailInput.value;

        if (originalValues.avatarRemoved) {
            const firstName = elements.firstNameInput.value;
            const lastName = elements.lastNameInput.value;
            const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
            elements.avatar.innerHTML = initials;
            originalValues.avatar = initials;
        }
        
        saveOriginalValues();

        originalValues.avatarRemoved = false;
        
        saveToLocalStorage();
        
        disableForm();
        restoreOriginalButtons();
        
        alert('Changes saved successfully!');
    }
    
    function handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.match('image.*')) {
                alert('Please select an image file');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                elements.avatar.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                elements.avatar.appendChild(img);
                
                saveToLocalStorage();
            };
            reader.readAsDataURL(file);
        }
    }
    
    function logoutUser() {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('userProfile');
            alert('You have been logged out!');
            updateHeaderAvatar();
        }
    }
    
    function initProfile() {
        const savedData = loadFromLocalStorage();
        if (savedData) {
            elements.firstNameInput.value = savedData.firstName;
            elements.lastNameInput.value = savedData.lastName;
            elements.emailInput.value = savedData.email;
            elements.avatar.innerHTML = savedData.avatar;
            
            elements.nameDisplay.textContent = `${savedData.firstName} ${savedData.lastName}`;
            elements.emailDisplay.textContent = savedData.email;
        }
        
        saveOriginalValues();
        
        disableForm();
        
        elements.editBtn.addEventListener('click', startEdit);
        elements.logoutBtn.addEventListener('click', logoutUser);

        elements.avatarInput.addEventListener('change', handleAvatarChange);
        
        console.log('User profile initialized successfully');
    }
    initProfile();
});

console.log('=== SCRIPT LOADED ===');



/*ITEM PAGE COMMENTS*/

const initialComments = [
    {
        id: 1,
        initials: "IK",
        text: "This reconstruction looks amazing! I love the historical details.",
        time: "2 hours ago"
    },
    {
        id: 2,
        initials: "MS", 
        text: "Great work! Can you provide the Blender file as well?",
        time: "2 weeks ago"
    },
    {
        id: 3,
        initials: "PV",
        text: "This reconstruction looks amazing! I love the historical details.",
        time: "2 hours ago"
    }
];

const MAX_COMMENTS = 3; 

// Функція для отримання ініціалів з імені
function getInitials(name) {
    if (!name) return 'UU';
    
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    } else if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return 'UU';
}

// Функція для відображення коментарів
function displayComments(comments) {
    const container = document.getElementById('commentsContainer');
    console.log('Displaying comments, container:', container);
    
    if (!container) {
        console.error('❌ Comments container not found!');
        return;
    }
    
    container.innerHTML = '';

    if (comments.length === 0) {
        container.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        return;
    }

    const commentsToShow = comments.slice(0, MAX_COMMENTS);
    
    commentsToShow.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-avatar">
                ${comment.initials || getInitials(comment.name)}
            </div>
            <div class="comment-content">
                <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-time">${comment.time}</div>
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
    
    console.log('Comments displayed successfully, count:', commentsToShow.length);
}

// Функція для додавання нового коментаря
function addNewComment(name, email, text) {
    const initials = getInitials(name);
    
    const newComment = {
        id: Date.now(),
        name: name,
        initials: initials,
        text: text,
        time: 'Just now'
    };

    let comments = JSON.parse(localStorage.getItem('comments')) || [...initialComments];
    
    comments.unshift(newComment);
    
    if (comments.length > MAX_COMMENTS) {
        comments = comments.slice(0, MAX_COMMENTS);
        console.log(`📝 Limited comments to ${MAX_COMMENTS}, removed oldest ones`);
    }
    
    localStorage.setItem('comments', JSON.stringify(comments));
    
    console.log('💾 Saved to localStorage:', comments);
    
    displayComments(comments);
    
    return newComment;
}

// Функція для валідації форми
function validateForm(name, email, text) {
    const errors = [];

    if (!name.trim()) {
        errors.push('Name is required');
    }

    if (!email.trim()) {
        errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push('Email is invalid');
    }

    if (!text.trim()) {
        errors.push('Comment text is required');
    } else if (text.trim().length < 5) {
        errors.push('Comment must be at least 5 characters long');
    }

    return errors;
}

// Функція для показу повідомлення
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) {
        console.log('Message div not found');
        return;
    }
    
    messageDiv.textContent = message;
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.classList.remove('hidden');

    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

// Функція для скидання форми
function resetForm() {
    const form = document.getElementById('commentForm');
    if (form) {
        form.reset();
    }
}

// Ініціалізація коментарів
function initComments() {
    console.log('Initializing comments system...');
    
    const commentsSection = document.querySelector('.comments');
    if (!commentsSection) {
        console.log('Not on comments page, skipping comments initialization');
        return;
    }
    
    console.log('Found comments section, initializing...');

    const submitButton = document.getElementById('submitComment');
    const commentText = document.getElementById('commentText');
    
    if (submitButton && commentText) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Submit button clicked');

            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const text = document.getElementById('commentText').value;

            console.log('Form data:', { name, email, text });
            
            const errors = validateForm(name, email, text);
            
            if (errors.length > 0) {
                showMessage(errors.join(', '), 'error');
                return;
            }

            const newComment = addNewComment(name, email, text);
            
            showMessage('Comment added successfully!', 'success');
            
            resetForm();
        });

        commentText.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                document.getElementById('submitComment').click();
            }
        });
        
        console.log('Comment form initialized');
    } else {
        console.log(' Form elements not found:', {
            submitButton: !!submitButton,
            commentText: !!commentText
        });
    }

    try {
        const savedComments = JSON.parse(localStorage.getItem('comments'));
        console.log('📦 Saved comments from localStorage:', savedComments);
        
        if (savedComments && savedComments.length > 0) {
            displayComments(savedComments);
            console.log('Displayed saved comments');
        } else {
            console.log('Using initial comments');
            displayComments(initialComments);
            localStorage.setItem('comments', JSON.stringify(initialComments));
        }
    } catch (error) {
        console.error('❌ Error loading comments:', error);
        displayComments(initialComments);
    }
    
    console.log('✅ Comments system initialized successfully');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏠 DOM fully loaded and parsed');
    initComments();
});

function getCommentCount() {
    const comments = JSON.parse(localStorage.getItem('comments')) || initialComments;
    return comments.length;
}

function getAllComments() {
    return JSON.parse(localStorage.getItem('comments')) || initialComments;
}

function clearAllComments() {
    if (confirm('Are you sure you want to clear all comments?')) {
        localStorage.removeItem('comments');
        displayComments(initialComments);
        console.log('🗑️ All comments cleared');
    }
}

window.commentManager = {
    addNewComment,
    getCommentCount,
    getAllComments,
    clearAllComments,
    displayComments,
    initComments,
    getInitials,
    MAX_COMMENTS
};

console.log('✅ Comments module loaded');








/*FORM JOIN US */
   
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('join-form');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        city: document.getElementById('city').value,
                        expertise: Array.from(document.querySelectorAll('input[name="expertise"]:checked'))
                                     .map(checkbox => checkbox.value),
                        message: document.getElementById('message').value
                    };
                    
                    console.log('Дані форми:', formData);
                    submitForm(formData);
                }
            });

            function validateForm() {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                const checkboxes = document.querySelectorAll('input[name="expertise"]:checked');
                
                clearErrors();
                
                let isValid = true;
                
                if (name === '') {
                    showError('name', 'Будь ласка, введіть ваше ім\'я');
                    isValid = false;
                }
                
                if (!isValidEmail(email)) {
                    showError('email', 'Будь ласка, введіть коректний email');
                    isValid = false;
                }
                
                if (checkboxes.length === 0) {
                    showError('checkbox-group', 'Будь ласка, оберіть принаймні одну область експертизи');
                    isValid = false;
                }
                
                if (message.length < 10) {
                    showError('message', 'Повідомлення має містити принаймні 10 символів');
                    isValid = false;
                }
                
                return isValid;
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function showError(fieldId, message) {
                const field = document.getElementById(fieldId);
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = message;
                errorDiv.style.cssText = `
                    color: #e74c3c;
                    font-size: 14px;
                    margin-top: 20px;
                    font-weight: 500;
                `;
                
                if (field) {
                    field.parentNode.appendChild(errorDiv);
                    field.style.border = '2px solid #e74c3c';
                } else if (fieldId === 'checkbox-group') {
                    document.querySelector('.checkbox-group').parentNode.appendChild(errorDiv);
                }
            }

            function clearErrors() {
                const errors = document.querySelectorAll('.error-message');
                errors.forEach(error => error.remove());
                
                const fields = document.querySelectorAll('input, textarea');
                fields.forEach(field => field.style.border = '');
            }

            function submitForm(formData) {
                const submitBtn = document.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                // Імітація відправки
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Successfully sent!';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });
   
class FormAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.addInputAnimations();
        this.addScrollAnimations();
        this.addLoadingAnimation();
    }

    addInputAnimations() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });

            input.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
            });

            input.addEventListener('input', function() {
                if (this.value) {
                    this.style.background = 'rgba(255, 255, 255, 0.8)';
                } else {
                    this.style.background = 'rgba(255, 255, 255, 0.6)';
                }
            });
        });
    }

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const formElements = document.querySelectorAll('.form-section > *');
        formElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }

    addLoadingAnimation() {
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            const loader = document.createElement('div');
            loader.className = 'global-loader';
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, #939bbb, #4e5b8a);
                z-index: 9999;
                animation: loading 2s infinite;
            `;
            document.body.appendChild(loader);

            return originalFetch.apply(this, args).finally(() => {
                loader.remove();
            });
        };

        const style = document.createElement('style');
        style.textContent = `
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormAnimations();
});

function initScrollAnimations() {
    const titles = document.querySelectorAll('.title-cont');
    
    titles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateX(-100px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    function checkVisibility() {
        titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
            
            if (isVisible && title.style.opacity === '0') {
                title.style.opacity = '1';
                title.style.transform = 'translateX(0)';
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    
    checkVisibility();
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);


/*REGISTRATION FORM*/
function initRegistrationForm() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const first_name = formData.get('first_name');
            const last_name = formData.get('last_name');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirm_password = formData.get('confirm_password');
            
            console.log('Спроба реєстрації:', { first_name, last_name, email });

            if (!first_name || !last_name || !email || !password || !confirm_password) {
                showMessage('Будь ласка, заповніть всі поля', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Введіть коректний email', 'error');
                return;
            }

            if (password.length < 6) {
                showMessage('Пароль має містити щонайменше 6 символів', 'error');
                return;
            }

            if (password !== confirm_password) {
                showMessage('Паролі не співпадають', 'error');
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Реєстрація...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/sign_up', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        first_name, 
                        last_name, 
                        email, 
                        password, 
                        confirm_password 
                    })
                });

                console.log('Статус відповіді:', response.status);

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.error('Очікував JSON, але отримав:', text);
                    throw new Error('Сервер повернув некоректну відповідь');
                }

                const result = await response.json();
                console.log('Результат реєстрації:', result);

                if (result.success) {
                    showMessage(result.message, 'success');
                    
                    setTimeout(() => {
                        window.location.href = result.redirect || '/index.html';
                    }, 2000);
                } else {
                    showMessage(result.message, 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }

            } catch (error) {
                console.error('Помилка реєстрації:', error);
                showMessage('Помилка з\'єднання з сервером: ' + error.message, 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function initRegistrationRealTimeValidation() {
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const submitBtn = document.getElementById('submitDetails');
    
    if (!firstNameInput || !submitBtn) return;
    
    function validateRegistrationForm() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        
        const isFirstNameValid = firstName.length >= 2;
        const isLastNameValid = lastName.length >= 2;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = password.length >= 6;
        const isConfirmPasswordValid = password === confirmPassword && confirmPassword.length > 0;
        
        const isFormValid = firstName && lastName && email && password && confirmPassword && 
                           isFirstNameValid && isLastNameValid && isEmailValid && 
                           isPasswordValid && isConfirmPasswordValid;
        
        submitBtn.disabled = !isFormValid;
        submitBtn.style.opacity = isFormValid ? '1' : '0.6';
        submitBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
        
        firstNameInput.style.borderColor = firstName ? (isFirstNameValid ? '#4caf50' : '#f44336') : '#ccc';
        lastNameInput.style.borderColor = lastName ? (isLastNameValid ? '#4caf50' : '#f44336') : '#ccc';
        emailInput.style.borderColor = email ? (isEmailValid ? '#4caf50' : '#f44336') : '#ccc';
        passwordInput.style.borderColor = password ? (isPasswordValid ? '#4caf50' : '#f44336') : '#ccc';
        confirmPasswordInput.style.borderColor = confirmPassword ? (isConfirmPasswordValid ? '#4caf50' : '#f44336') : '#ccc';
        
        if (firstName && !isFirstNameValid) {
            firstNameInput.title = 'Ім\'я має містити щонайменше 2 символи';
        } else {
            firstNameInput.title = '';
        }
        
        if (password && !isPasswordValid) {
            passwordInput.title = 'Пароль має містити щонайменше 6 символів';
        } else {
            passwordInput.title = '';
        }
        
        if (confirmPassword && !isConfirmPasswordValid) {
            confirmPasswordInput.title = 'Паролі не співпадають';
        } else {
            confirmPasswordInput.title = '';
        }
    }
    
    [firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        if (input) {
            input.addEventListener('input', validateRegistrationForm);
        }
    });
    
    validateRegistrationForm();
}

// Анімація для сторінки реєстрації
function initRegistrationAnimations() {
    const formElements = document.querySelectorAll('.form-title, .form-section p, #registrationForm, #registrationForm input, #registrationForm .submit-btn, .login-links');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

function initRegistrationPage() {
    console.log('Ініціалізація сторінки реєстрації...');
    initRegistrationForm();
    initRegistrationRealTimeValidation();
    initRegistrationAnimations();
}

if (window.location.pathname.includes('regist.html') || document.querySelector('#registrationForm')) {
    document.addEventListener('DOMContentLoaded', initRegistrationPage);
}
function showMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    messageDiv.style.cssText = `
        padding: 12px 16px;
        margin: 16px 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = '#e8f5e8';
        messageDiv.style.color = '#2e7d32';
        messageDiv.style.border = '1px solid #c8e6c9';
    } else {
        messageDiv.style.background = '#ffebee';
        messageDiv.style.color = '#c62828';
        messageDiv.style.border = '1px solid #ffcdd2';
    }

    const formSection = document.querySelector('.form-section');
    if (formSection) {
        formSection.insertBefore(messageDiv, formSection.firstChild);
    }

    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

function initRealTimeValidation() {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (!emailInput || !passwordInput || !submitBtn) return;
    
    function validateForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isPasswordValid = password.length >= 6;
        const isFormValid = email && password && isEmailValid && isPasswordValid;
        
        submitBtn.disabled = !isFormValid;
        submitBtn.style.opacity = isFormValid ? '1' : '0.6';
        submitBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
        
        emailInput.style.borderColor = email ? (isEmailValid ? '#4caf50' : '#f44336') : '#ccc';
        passwordInput.style.borderColor = password ? (isPasswordValid ? '#4caf50' : '#f44336') : '#ccc';
    }
    
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    
    validateForm();
}

function initFormAnimations() {
    const formElements = document.querySelectorAll('.form-title, .form-section p, form, input, .submit-btn');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Ініціалізація форми реєстрації...');
    initRegistrationForm();
    initRealTimeValidation();
    initFormAnimations();
});

const style = document.createElement('style');
style.textContent = `
    .submit-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }
    
    .submit-btn:not(:disabled):hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
    
    input:focus {
        outline: none;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    }
    
    .form-message {
        animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);


/*FORM LOGIN*/

function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const email = formData.get('email');
            const password = formData.get('password');
            
            console.log('Спроба входу:', email);

            if (!email || !password) {
                showMessage('Будь ласка, заповніть всі поля', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Введіть коректний email', 'error');
                return;
            }

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Вхід...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                console.log('Статус відповіді:', response.status);

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.error('Очікував JSON, але отримав:', text);
                    throw new Error('Сервер повернув некоректну відповідь');
                }

                const result = await response.json();
                console.log('Результат входу:', result);

                if (result.success) {
                    showMessage(result.message, 'success');
                    
                    setTimeout(() => {
                        window.location.href = result.redirect || '/index.html';
                    }, 1500);
                } else {
                    showMessage(result.message, 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }

            } catch (error) {
                console.error('Помилка входу:', error);
                showMessage('Помилка з\'єднання з сервером: ' + error.message, 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    messageDiv.style.cssText = `
        padding: 12px 16px;
        margin: 16px 0;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    if (type === 'success') {
        messageDiv.style.background = '#e8f5e8';
        messageDiv.style.color = '#2e7d32';
        messageDiv.style.border = '1px solid #c8e6c9';
    } else {
        messageDiv.style.background = '#ffebee';
        messageDiv.style.color = '#c62828';
        messageDiv.style.border = '1px solid #ffcdd2';
    }

    const formSection = document.querySelector('.form-section');
    if (formSection) {
        formSection.insertBefore(messageDiv, formSection.firstChild);
    }

    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

function initLoginRealTimeValidation() {
    const emailInput = document.querySelector('#loginForm input[type="email"]');
    const passwordInput = document.querySelector('#loginForm input[type="password"]');
    const submitBtn = document.querySelector('#loginForm .submit-btn');
    
    if (!emailInput || !passwordInput || !submitBtn) return;
    
    function validateLoginForm() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isFormValid = email && password && isEmailValid;
        
        submitBtn.disabled = !isFormValid;
        submitBtn.style.opacity = isFormValid ? '1' : '0.6';
        submitBtn.style.cursor = isFormValid ? 'pointer' : 'not-allowed';
        
        emailInput.style.borderColor = email ? (isEmailValid ? '#4caf50' : '#f44336') : '#ccc';
        passwordInput.style.borderColor = password ? '#4caf50' : '#ccc';
    }
    
    emailInput.addEventListener('input', validateLoginForm);
    passwordInput.addEventListener('input', validateLoginForm);
    
    validateLoginForm();
}



// Анімація для сторінки логіну
function initLoginAnimations() {
    const formElements = document.querySelectorAll('.form-title, .form-section p, #loginForm, #loginForm input, #loginForm .submit-btn, .login-links');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

function initLoginPage() {
    console.log('Ініціалізація сторінки логіну...');
    initLoginForm();
    initLoginRealTimeValidation();
    initLoginAnimations();
}

if (window.location.pathname.includes('login.html') || document.querySelector('#loginForm')) {
    document.addEventListener('DOMContentLoaded', initLoginPage);
}