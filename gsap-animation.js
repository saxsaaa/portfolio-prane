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
// gsap.from(".hero-animation", {
//   delay: 1,

//   y: 1400,
//   stagger: 0.1,
//   onStart: function () {
//     // Set z-index to control stacking order before animation starts
//     gsap.set(".hero-animation", { zIndex: 1 });
//   },
// });

// tools and framework animation
gsap.from(".framework-title-animation-left", {
  delay: 1,
  duration: 1,
  xPercent: -10,
  opacity: 0,
  scrollTrigger: {
    trigger: ".framework-title",
    markers: false,
    start: "top 90%",
    end: " 40% 100%",
    scrub: true,
  },
});
gsap.from(".framework-title-animation-right", {
  delay: 1,
  duration: 1,
  xPercent: 10,
  opacity: 0,
  scrollTrigger: {
    trigger: ".framework-title",
    markers: false,
    start: "top 90%",
    end: " 40% 100%",
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
gsap.from(".project-title-animation-left", {
  delay: 1,
  duration: 1,
  xPercent: -10,
  opacity: 0,
  scrollTrigger: {
    trigger: ".project-area-trigger",
    markers: false,
    start: "top 90%",
    end: " 40% 100%",
    scrub: true,
  },
});
gsap.from(".project-title-animation-right", {
  delay: 1,
  duration: 1,
  xPercent: 10,
  opacity: 0,
  scrollTrigger: {
    trigger: ".project-area-trigger",
    markers: false,
    start: "top 90%",
    end: " 40% 100%",
    scrub: true,
  },
});
gsap.from(".project-item-animation-v1", {
  duration: 2,
  yPercent: 100,
  opacity: 0,

  scrollTrigger: {
    trigger: ".project-area-trigger",
    markers: false,
    start: "5% 100%",
    end: "27% 80%",
    scrub: true,
  },
});
gsap.from(".project-item-animation-v2", {
  duration: 2,
  yPercent: 100,
  opacity: 0,

  scrollTrigger: {
    trigger: ".project-item-animation-v2",
    markers: false,
    start: "-100% 100%",
    end: "-80% 80%",
    scrub: true,
  },
});

//about me animation
gsap.from(".about-text-animation", {
  duration: 2,
  yPercent: 100,
  opacity: 0,
  stagger: 3,
  scrollTrigger: {
    trigger: ".about-text-animation",
    markers: false,
    start: "-100% 100%",
    end: "400% 70%",
    scrub: true,
  },
});
gsap.from(".about-image-animation", {
  duration: 2,
  yPercent: 100,
  opacity: 0,
  stagger: 3,
  scrollTrigger: {
    trigger: ".about-image-animation",
    markers: false,
    start: "-100% 100%",
    end: "100% 70%",
    scrub: true,
  },
});
