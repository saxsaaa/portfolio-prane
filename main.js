const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);
  primaryNav.toggleAttribute("data-visible");
  primaryHeader.toggleAttribute("data-overlay");
});

$(document).ready(function () {
  $("li").click(function (event) {
    var socialMediaLink = $(this).find("a").attr("href");
    if (socialMediaLink) {
      event.preventDefault(); // Prevent the default behavior of the link
      window.open(socialMediaLink, "_blank"); // Open link in a new tab
    }
  });
});
