const navToggle = document.querySelector(".mobile-nav-toggle");
const menuToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const logoLink = document.querySelector(".logo");

let isNavigationInProgress = false;
let isNavItemsAnimationInProgress = false;

// eventlistener for the menu button to be open and close
navToggle.addEventListener("click", toggleNavigation);

function toggleNavigation() {
  if (isNavigationInProgress || isNavItemsAnimationInProgress) {
    return;
  }
  toggleLogoExpansion();
  animateNavItems();

  isNavigationInProgress = true;

  // Toggle navigation visibility attributes
  const isNavVisible = primaryNav.hasAttribute("data-visible");
  primaryNav.toggleAttribute("data-visible");
  navToggle.setAttribute("aria-expanded", !isNavVisible);
  menuToggle.setAttribute("aria-expanded", !isNavVisible);

  // Update menu toggle button text
  const spanElement = menuToggle.querySelector("span");
  spanElement.textContent = isNavVisible ? "Menu" : "Close";

  if (!isNavVisible) {
    openNavigation();
  } else if (isNavVisible) {
    closeNavigation();
  }

  navLinkClickHandler();
}

// Function to handle clicks on navigation links
function navLinkClickHandler() {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".primary-navigation .nav-item a");
  // Remove and re-add event listeners to handle clicks
  navLinks.forEach((link) => {
    link.removeEventListener("click", toggleNavigation);
  });
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleNavigation);
  });
}

function toggleLogoExpansion() {
  // Toggle aria-expanded attribute for logo
  const isLogoExpanded = logoLink.getAttribute("aria-expanded") === "true";
  logoLink.setAttribute("aria-expanded", String(!isLogoExpanded));

  // Change logo image source based on expansion state
  const logoImage = logoLink.querySelector("img");
  const newSrc = isLogoExpanded ? "images/logo.png" : "images/logo-white.png";

  // Determine the animation duration based on expansion state
  const duration = isLogoExpanded ? 0.35 : 0.7;
  gsap.to(logoImage, {
    duration: duration,
    onComplete: () => {
      logoImage.src = newSrc;
    },
  });
}

function animateNavItems() {
  // Animate navigation items
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
}
function openNavigation() {
  try {
    // Create a timeline for opening the navigation
    let tl = gsap.timeline();
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

    // Disable scrolling while navigation is open
    disableScroll();
  } catch (error) {
    console.error("Error opening navigation:", error);
    // Optionally handle the error or provide fallback behavior
  }
}
// Function to close the navigation
function closeNavigation() {
  try {
    // Create a timeline for closing the navigation
    let tl = gsap.timeline();
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
    enableScroll();
  } catch (error) {
    console.error("Error closing navigation: ", error);
  }
}
function disableScroll() {
  // Disable scrolling while navigation is open
  document.documentElement.style.height = "100%";
  document.body.style.height = "100%";
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function enableScroll() {
  // Re-enable scrolling when navigation is closed
  document.documentElement.style.height = "";
  document.body.style.height = "";
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";
  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowY = "auto";
}
function handleGsapLoadError() {
  console.error("Error loading GSAP library");
  // Provide fallback or inform the user
}

window.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");

  function updateGrid() {
    // Check if viewport width matches media query conditions
    if (window.matchMedia("(min-width: 71em)").matches) {
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
    } else {
      // Reset styles for smaller viewport widths
      projectItems.forEach((item) => {
        item.style.gridColumn = "";
        item.style.justifySelf = "";
      });
    }
  }

  // Call the function initially
  updateGrid();

  // Listen for window resize events to update the grid
  window.addEventListener("resize", updateGrid);
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

window.addEventListener("scroll", function () {
  var hiddenDiv = document.getElementById("hidden-button");
  // Adjust this value according to where you want the scroll point to be
  var scrollPoint = 1000;
  if (window.scrollY > scrollPoint) {
    hiddenDiv.classList.remove("hidden");
  } else {
    hiddenDiv.classList.add("hidden");
  }
});

document.getElementById("download-resume").addEventListener("click", function () {
  // Set the file URL
  var fileURL = "public/Prane-John-Orland-Resume.pdf";
  // Set the file name
  var fileName = "Prane,John Orland-Resume";

  // Set the anchor tag's href and download attributes
  var downloadLink = document.getElementById("downloadLink");
  downloadLink.href = fileURL;
  downloadLink.download = fileName;

  // Trigger the anchor tag's click event to start the download
  downloadLink.click();
});
