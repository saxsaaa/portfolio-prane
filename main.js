import { gsap } from "gsap";

const navToggle = document.querySelector(".mobile-nav-toggle");
const menuToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const navItems = document.querySelectorAll(".nav-item");
const logoLink = document.querySelector(".logo"); // Assuming you have a logo link with the class "logo"
const heroImage = document.querySelector(".hero-image");
const bgText = document.querySelector(".bg-text");
let isNavigationInProgress = false;
let isNavItemsAnimationInProgress = false;

navToggle.addEventListener("click", () => {
  if (isNavigationInProgress || isNavItemsAnimationInProgress) {
    return;
  }

  console.log(`Navigation Animation status before: ${isNavigationInProgress ? "In progress" : "Not in progress"}`);
  console.log(`Nav-Items Animation status before: ${isNavItemsAnimationInProgress ? "In progress" : "Not in progress"}`);

  isNavigationInProgress = true;

  const isNavVisible = primaryNav.hasAttribute("data-visible");
  navToggle.setAttribute("aria-expanded", !isNavVisible);
  primaryNav.toggleAttribute("data-visible");
  menuToggle.setAttribute("aria-expanded", !isNavVisible);

  // Change the content of the span based on the visibility of the primary navigation
  const spanElement = menuToggle.querySelector("span");
  spanElement.textContent = isNavVisible ? "Menu" : "Close";

  // Box wrapper animation with ScrollTrigger
  gsap.to(".primary-navigation", {
    duration: 1,
    y: isNavVisible ? 2000 : 0,
    visibility: isNavVisible ? "hidden" : "visible",
    onComplete: () => {
      isNavigationInProgress = false; // Reset the flag when the navigation animation is complete

      // Check if the navigation is being closed
      if (isNavVisible) {
        // If yes, set visibility to "hidden"
        gsap.set(".primary-navigation", { visibility: "hidden" });
      }

      console.log("Navigation Animation completed");
    },
  });
  isNavItemsAnimationInProgress = true;
  gsap.from(".nav-item", {
    duration: 0.8,
    stagger: 0.1,
    opacity: 0,
    x: 600,
    onComplete: () => {
      isNavItemsAnimationInProgress = false; // Reset the flag when the nav-items animation is complete
      console.log("Nav-Items Animation completed");
    },
  });

  // Toggle the aria-expanded attribute for the logo
  const isLogoExpanded = logoLink.getAttribute("aria-expanded") === "true";
  logoLink.setAttribute("aria-expanded", String(!isLogoExpanded));

  // Change the src attribute based on the aria-expanded value
  const logoImage = logoLink.querySelector("img");
  if (isLogoExpanded) {
    logoImage.src = "images/logo.png"; // Change to the original source when not expanded
    // heroImage.style.opacity = 1; // Set opacity to 1 to make it fully visible
    // heroImage.style.zIndex = 2;
    // bgText.style.opacity = 1;
  } else {
    // Change to the new source when expanded
    logoImage.src = "images/logo-white.png"; // Replace with your desired expanded logo source

    // bgText.style.opacity = 0;
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
