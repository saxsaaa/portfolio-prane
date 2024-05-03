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
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
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
    // Revert CSS properties to original when navigation is hidden
    document.documentElement.style.height = "";
    document.body.style.height = "";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
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

// $(document).ready(function () {
//   $("li").click(function (event) {
//     var socialMediaLink = $(this).find("a").attr("href");
//     if (socialMediaLink) {
//       event.preventDefault();
//       window.open(socialMediaLink, "_blank");
//     }
//   });
// });

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
