import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling using Lenis library
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e); // Log scroll events
});

// RequestAnimationFrame for smooth scrolling
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Preloader functionality
window.onload = function () {
  try {
    // Hide preloader once the page content is loaded
    document.getElementById("preloader").style.display = "none";

    // Start loader animation after the preloader is hidden
    startLoaderAnimation();
  } catch (error) {
    console.error("Error in preloader functionality:", error);
  }
};

// Function to animate loader using GSAP
function startLoaderAnimation() {
  gsap.to(".bar", {
    duration: 2,
    height: 0,

    ease: "power4.inOut",
  });
}

// Reset preloader animation before page reload
window.addEventListener("beforeunload", function () {
  var preloader = document.getElementById("preloader");
  preloader.style.display = "block";
  window.scrollTo(0, 0); // Scroll to top when refreshed
  // Hide the preloader after a short delay
  setTimeout(function () {
    preloader.style.display = "none";
  }, 100);
});

// animationssss
//hero section
gsap.from(".hero-animation", {
  delay: 1,

  y: 1400,
  stagger: 0.1,
});

// tools and framework animation
gsap.from(".framework-title", {
  delay: 1,
  duration: 1,
  y: 1000,

  scrollTrigger: {
    trigger: ".framework-title",
    markers: false,
    start: "top 90%",
    end: " bottom -500px",
    scrub: true,
  },
});
gsap.from(".tools-image", {
  delay: 1,
  duration: 1,
  y: 1000,

  scrollTrigger: {
    trigger: ".tools-image",
    markers: false,
    start: "top 95%",
    end: " bottom -500px",
    scrub: true,
  },
});

gsap.from(".tech-item", {
  delay: 1,
  duration: 5,
  y: 1000,
  stagger: 3,
  scrollTrigger: {
    trigger: ".tools-image",
    markers: false,
    start: "top 80%",
    end: "15% center",
    scrub: true,
  },
});

//project area animation
gsap.from(".project-title", {
  delay: 1,
  duration: 1,
  y: 1000,

  scrollTrigger: {
    trigger: ".project-area-trigger",
    markers: false,
    start: "top 100%",
    end: "top 80%",
    scrub: true,
  },
});
gsap.from(".project-item", {
  delay: 1,
  duration: 1,
  y: 1000,

  scrollTrigger: {
    trigger: ".project-area-trigger",
    markers: true,
    start: "20% 100%",
    end: "20% 80%",
    scrub: true,
  },
});
