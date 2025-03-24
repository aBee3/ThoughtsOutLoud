// script.js
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");


//Swear to explain later
function setAriaExpandedFalse() {
    dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  }
  
  function closeDropdownMenu() {
    dropdown.forEach((drop) => {
      drop.classList.remove("active");
      drop.addEventListener("click", (e) => e.stopPropagation());
    });
  }
  
  function toggleHamburger() {
      navMenu.classList.toggle("show");
      hamburgerBtn.setAttribute(
          "aria-expanded",
          hamburgerBtn.getAttribute("aria-expanded") === "false" ? "true" : "false"
      );
  }

  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dropdownIndex = e.currentTarget.dataset.dropdown;
      const dropdownElement = document.getElementById(dropdownIndex);
      console.log(dropdownElement);
    });
  });

  //Dinamically opens the dropdown only after clicking it. In addition to toggling the dropdown menu, we added a condition to check if the current dropdown element id matches with the active button. This makes sure only one dropdown element is expanded at a time.

  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dropdownIndex = e.currentTarget.dataset.dropdown;
      const dropdownElement = document.getElementById(dropdownIndex);
  
      dropdownElement.classList.toggle("active");
      dropdown.forEach((drop) => {
        if (drop.id !== btn.dataset["dropdown"]) {
          drop.classList.remove("active");
        }
      });
      e.stopPropagation();
    });
  });

  //Open the actual dropdown
  btn.setAttribute(
    "aria-expanded",
    btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
);

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
    link.addEventListener("click", () => {
      closeDropdownMenu();
      setAriaExpandedFalse();
    })
  );
  
  // close dropdown menu when you click on the document body
  document.documentElement.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
  });

  // close dropdown when the escape key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdownMenu();
      setAriaExpandedFalse();
    }
  });

  //Toggle hamburguer button
  links.forEach((link) =>
    link.addEventListener("click", () => {
      closeDropdownMenu();
      setAriaExpandedFalse();
      toggleHamburger();
    })
  );

  //something something updates the class to make it show

  hamburgerBtn.addEventListener("click", toggleHamburger);