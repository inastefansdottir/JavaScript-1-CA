const menuCheckbox = document.getElementById("menu-checkbox");

if (menuCheckbox) {
  window.addEventListener("scroll", () => {
    if (menuCheckbox.checked) {
      menuCheckbox.checked = false;
    }
  });
}
