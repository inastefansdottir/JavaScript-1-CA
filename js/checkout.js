import { cart } from "./cart.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);

  cart.load();
  renderCheckoutItems();
  updateCheckoutSummary();
});

function renderCheckoutItems() {
  const orderList = document.querySelector(".order-list");
  let innerHTML = `<p class="purchase">Your Purchases</p><div class="line-separator"></div>`;

  cart.items.forEach((item) => {
    innerHTML += `
      <div class="product-container">
        <img class="product-image center-align" src="${
          item.image
        }" alt="Cover art of ${item.title}">
        <p class="bold-text-style title center-align">${item.title}</p>
        <p class="bold-text-style quantity center-align">${item.quantity}x</p>
        <p class="bold-text-style total-price center-align">$${(
          item.price * item.quantity
        ).toFixed(2)}</p>
        <div class="line-separator"></div>
      </div>
    `;
  });

  orderList.innerHTML = innerHTML;
}

function updateCheckoutSummary() {
  // Retrieve the subtotal from localStorage and convert it to a number
  const formattedSubtoal = cart.subtotal.toFixed(2);
  document.getElementById(
    "checkoutSubTotal"
  ).textContent = `$${formattedSubtoal}`;
  document.getElementById(
    "checkoutOrderTotal"
  ).textContent = `$${formattedSubtoal}`;
}

function handleFormSubmit(event) {
  event.preventDefault(); // Stop form from submitting normally

  // Save form data to localStorage
  const formData = {
    // Customer info
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,

    // Shipping address
    country: document.getElementById("country").value,
    city: document.getElementById("city").value,
    streetAddress: document.getElementById("street-address").value,
    zipCode: document.getElementById("zip-code").value,

    // Payment
    cardNumber: document.getElementById("card-number").value,
    cardName: document.getElementById("card-name").value,
    expiryDate: document.getElementById("expiry-date").value,
    cvc: document.getElementById("cvc").value,
  };

  cart.clear(); // Clear the cart

  window.location.href = "../cart/payment-successful.html";
}
