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
