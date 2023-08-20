const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);


// Product Carousel JS code:

document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".product-carousel");
  const prevButton = carouselContainer.querySelector(".carousel-control.prev");
  const nextButton = carouselContainer.querySelector(".carousel-control.next");
  const slidesContainer = carouselContainer.querySelector(".product-carousel__slides");
  const slides = carouselContainer.querySelectorAll(".product-carousel__slide");
  const hammer = new Hammer(carouselContainer);

  let visibleSlides = 5; // for larger screens
  if (window.innerWidth <= 768) {
    visibleSlides = 1; // for smaller screens
  }

  let currentIndex = 0;
  const slideWidth = carouselContainer.clientWidth / visibleSlides;

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  });

  // variables to track touch events
  let initialTouchX = 0;
  let touchDeltaX = 0;

  // swipe handlers
  hammer.on("panstart", (event) => {
    initialTouchX = event.center.x;
    touchDeltaX = 0;
  });

  hammer.on("panmove", (event) => {
    touchDeltaX = event.center.x - initialTouchX;
    const offset = -currentIndex * slideWidth + touchDeltaX;
    slidesContainer.style.transform = `translateX(${offset}px)`;
  });

  hammer.on("panend", () => {
    const swipedIndex = touchDeltaX > 0 ? -1 : 1;
    const targetIndex = currentIndex + swipedIndex;

    if (Math.abs(touchDeltaX) > slideWidth * 0.5) {
      currentIndex = Math.max(0, Math.min(targetIndex, slides.length - 1));
    }

    updateSlidePosition();
  });

  function updateSlidePosition() {
    const offset = -currentIndex * slideWidth;
    slidesContainer.style.transform = `translateX(${offset}px)`;
  }

  // to update visibleSlides on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      visibleSlides = 1;
    } else {
      visibleSlides = 5;
    }
    updateSlidePosition();
  });

  // initial slide position
  updateSlidePosition();
});