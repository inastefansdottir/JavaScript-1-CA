document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem("checkoutFormData");
  if (storedData) {
    const formData = JSON.parse(storedData);
    console.log("Retrieved data:", formData);
  }
});
