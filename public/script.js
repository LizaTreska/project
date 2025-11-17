/*swiper*/

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
      coverflowEffect: { stretch: 15 }, // окремо для цього breakpoint
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

function scrollToMap() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
        mapSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}


const editBtn = document.querySelector(".edit");
const logoutBtn = document.querySelector(".logout");
const form = document.querySelector(".user");
const avatarInput = document.querySelector("#avatarInput");
const avatarDisplay = document.querySelector("#avatarDisplay");

// ====== EDIT / SAVE / CANCEL FUNCTIONALITY ======
editBtn.addEventListener("click", () => {
  if (editBtn.classList.contains("edit")) {
    // Change to edit mode
    editBtn.textContent = "Save changes";
    editBtn.classList.remove("edit");
    editBtn.classList.add("save");

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel";
    cancelBtn.type = "button";
    editBtn.parentElement.insertBefore(cancelBtn, editBtn);

    cancelBtn.addEventListener("click", () => {
      // Restore original state
      cancelBtn.remove();
      editBtn.textContent = "Edit profile";
      editBtn.classList.remove("save");
      editBtn.classList.add("edit");
      alert("Changes canceled.");
    });

    editBtn.addEventListener("click", saveChanges);
  }
});

function saveChanges() {
  alert("Profile changes saved!");
  location.reload();
}

// ====== LOGOUT BUTTON ======
logoutBtn.addEventListener("click", () => {
  alert("You logged out!");
});

// ====== AVATAR UPLOAD ======
avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarDisplay.innerHTML = `<img src="${reader.result}" alt="Avatar">`;
    };
    reader.readAsDataURL(file);
  }
});
