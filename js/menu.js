// Makes the hamburger menu close when the user scrolls down so it avoids a visual bug
const menuCheckbox = document.getElementById("menu-checkbox");

if (menuCheckbox) {
  window.addEventListener("scroll", () => {
    if (menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  });
}
