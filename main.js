import { gsap } from "gsap";

const navToggle = document.querySelector(".mobile-nav-toggle");
const menuToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

const logoLink = document.querySelector(".logo");

let isNavigationInProgress = false;
let isNavItemsAnimationInProgress = false;

navToggle.addEventListener("click", () => {
  if (isNavigationInProgress || isNavItemsAnimationInProgress) {
    return;
  }

  // Toggles navigation animation status
  console.log(`Navigation Animation status before: ${isNavigationInProgress ? "In progress" : "Not in progress"}`);
  console.log(`Nav-Items Animation status before: ${isNavItemsAnimationInProgress ? "In progress" : "Not in progress"}`);

  isNavigationInProgress = true;

  const isNavVisible = primaryNav.hasAttribute("data-visible");
  navToggle.setAttribute("aria-expanded", !isNavVisible);
  primaryNav.toggleAttribute("data-visible");
  menuToggle.setAttribute("aria-expanded", !isNavVisible);

  const spanElement = menuToggle.querySelector("span");
  spanElement.textContent = isNavVisible ? "Menu" : "Close";

  if (!isNavVisible) {
    // Create a timeline for opening the navigation
    var tl = gsap.timeline();
    tl.to(".primary-navigation", {
      duration: 1,
      y: 0,
      visibility: "visible",
      onComplete: () => {
        isNavigationInProgress = false; // Reset flag when animation is complete
        console.log("Navigation Animation completed");
      },
    });
    tl.play(); // Play the timeline
  } else {
    // Create a timeline for closing the navigation
    var tl = gsap.timeline();
    tl.to(".primary-navigation", {
      duration: 1,
      y: -2000,
      onComplete: () => {
        // After animation, reset position and visibility
        gsap.set(".primary-navigation", {
          y: 1000,
          visibility: "hidden",
          onComplete: () => {
            isNavigationInProgress = false; // Reset flag when animation is complete
            console.log("Navigation Animation completed");
          },
        });
      },
    });
    tl.play(); // Play the timeline
  }

  // Set flag for nav-items animation
  isNavItemsAnimationInProgress = true;
  gsap.from(".nav-item", {
    duration: 0.8,
    stagger: 0.1,
    opacity: 0,
    x: 600,
    onComplete: () => {
      isNavItemsAnimationInProgress = false; // Reset flag when animation is complete
      console.log("Nav-Items Animation completed");
    },
  });

  // Toggle aria-expanded attribute for logo
  const isLogoExpanded = logoLink.getAttribute("aria-expanded") === "true";
  logoLink.setAttribute("aria-expanded", String(!isLogoExpanded));

  // Change src attribute based on aria-expanded value
  const logoImage = logoLink.querySelector("img");
  if (isLogoExpanded) {
    setTimeout(() => {
      logoImage.src = "images/logo.png"; // Change to original source when not expanded
    }, 350); // Add a delay
  } else {
    setTimeout(() => {
      logoImage.src = "images/logo-white.png"; // Change to new source when expanded
    }, 700); // Add a delay
  }
});

$(document).ready(function () {
  $("li").click(function (event) {
    var socialMediaLink = $(this).find("a").attr("href");
    if (socialMediaLink) {
      event.preventDefault();
      window.open(socialMediaLink, "_blank");
    }
  });
});

// makes the project grid center the last item if i have odd number of projects
window.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");

  function updateGrid() {
    if (projectItems.length % 2 !== 0) {
      // If the number of items is odd, center the last item
      projectItems[projectItems.length - 1].style.gridColumn = "1 / span 2";
      projectItems[projectItems.length - 1].style.justifySelf = "center";
    } else {
      // Reset styles if there are even number of items
      projectItems.forEach((item) => {
        item.style.gridColumn = "";
        item.style.justifySelf = "";
      });
    }
  }

  // Call the function initially
  updateGrid();
});

window.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero-area");

  function logFontSize() {
    const computedStyle = window.getComputedStyle(heroTitle);
    const fontSize = computedStyle.getPropertyValue("font-size");
    console.log("Font size of .hero-area:", fontSize);
  }

  // Call the function initially
  logFontSize();

  // Add event listener to resize event to monitor changes
  window.addEventListener("resize", logFontSize);
});
