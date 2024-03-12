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
