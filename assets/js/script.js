"use strict";

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * add event listener on multiple elements
 */

const addEventOnElements = (elements, eventType, callback) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// Navbar

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

// Header & Back to top btn

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = () => {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Hero
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = () => {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSliderPos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSliderPos];
};

const slideNext = () => {
  if (currentSliderPos >= heroSliderItems.length - 1) {
    currentSliderPos = 0;
  } else {
    currentSliderPos++;
  }

  updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = () => {
  if (currentSliderPos <= 0) {
    currentSliderPos = heroSliderItems.length - 1;
  } else {
    currentSliderPos--;
  }

  updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto Slide

let autoSlideInterval;

const autoSlide = () => {
  autoSlideInterval = setInterval(() => {
    slideNext();
  }, 7000);
};

addEventOnElements([heroSliderPrevBtn, heroSliderNextBtn], "mouseover", () => {
  clearInterval(autoSlideInterval);
});

addEventOnElements(
  [heroSliderPrevBtn, heroSliderNextBtn],
  "mouseout",
  autoSlide
);

window.addEventListener("load", autoSlide);

// Parallax effect

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", (e) => {
  x = (e.clientX / window.innerWidth) * 10 - 5;
  y = (e.clientY / window.innerHeight) * 10 - 5;

  // reverse the number ex) 20 -> -20, -5 -> 5
  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0; i < parallaxItems.length; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);

    parallaxItems[i].style.transform = `translate3D(${x}px, ${y}px, 0px)`;
  }
});
