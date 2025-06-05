import { cart } from "./cart.js";
import { showLoadingIndicator, hideLoadingIndicator } from "./loader-error.js";

// Reference the form
const form = document.querySelector("form");

// Load cart data from localStorage, then update the page accordingly
cart.load(); // Ensures cart state is accurate across sessions
renderCheckoutItems(); // Displays the cart items in the checkout area
updateCheckoutSummary(); // Display the cart subtotal in the summary section

/**
 * Renders the items currently in the cart onto the checkout page.
 * This builds an HTML string with product info and inserts it into the DOM.
 */
function renderCheckoutItems() {
  const orderList = document.querySelector(".order-list");

  // Start with a heading and separator for clarity
  let innerHTML = `<p class="purchase">Your Purchases</p><div class="line-separator"></div>`;

  // Loop through each cart item and append HTML to display its details
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

  // Inject the generated HTML into the page
  orderList.innerHTML = innerHTML;
}

/**
 * Updates the checkout summary section with the current cart subtotal.
 */
function updateCheckoutSummary() {
  // Retrieve the subtotal from localStorage and convert it to a number
  const formattedSubtotal = cart.subtotal.toFixed(2);
  document.getElementById(
    "checkoutSubTotal"
  ).textContent = `$${formattedSubtotal}`;
  document.getElementById(
    "checkoutOrderTotal"
  ).textContent = `$${formattedSubtotal}`;
}

// DOM references
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const cityInput = document.getElementById("city");
const streetInput = document.getElementById("streetAddress");
const zipInput = document.getElementById("zipCode");

const cardNameInput = document.getElementById("cardName");
const cardNumberInput = document.getElementById("cardNumber");
const expiryInput = document.getElementById("expiryDate");
const cvcInput = document.getElementById("cvc");

// Error message elements
const errorFirstName = document.getElementById("errorFirstName");
const errorLastName = document.getElementById("errorLastName");
const errorEmail = document.getElementById("errorEmail");
const errorCountry = document.getElementById("errorCountry");
const errorCity = document.getElementById("errorCity");
const errorStreetAddress = document.getElementById("errorStreetAddress");
const errorZipCode = document.getElementById("errorZipCode");

const errorCardName = document.getElementById("errorCardName");
const errorCardNumber = document.getElementById("errorCardNumber");
const errorExpiryDate = document.getElementById("errorExpiryDate");
const errorCvc = document.getElementById("errorCvc");

// Automatic formatting on the card number input "0000 0000 0000 0000"
cardNumberInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0, 19); // digits only
  let formatted = value.replace(/(.{4})/g, "$1 ").trim(); // group every 4 digits
  e.target.value = formatted;
});

// Live clearing
[
  firstNameInput,
  lastNameInput,
  emailInput,
  countryInput,
  cityInput,
  streetInput,
  zipInput,
  cardNameInput,
  cardNumberInput,
  expiryInput,
  cvcInput,
].forEach((input) => {
  input.addEventListener("input", () => {
    clearFieldError(
      input,
      document.getElementById(
        "error" + input.id.charAt(0).toUpperCase() + input.id.slice(1)
      )
    );
  });
});

function clearFieldError(inputEl, errorEl) {
  inputEl.classList.remove("error");
  if (errorEl) {
    errorEl.textContent = "";
  }
}

// Validate and submit
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting by default

  let hasError = false;

  // Get input values
  const values = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    country: countryInput.value.trim(),
    city: cityInput.value.trim(),
    streetAddress: streetInput.value.trim(),
    zipCode: zipInput.value.trim(),
    cardName: cardNameInput.value.trim(),
    cardNumber: cardNumberInput.value.trim(),
    expiryDate: expiryInput.value.trim(),
    cvc: cvcInput.value.trim(),
  };

  // Form Validation

  // First name
  if (!values.firstName) {
    errorFirstName.textContent = "First name is required";
    firstNameInput.classList.add("error");
    hasError = true;
  }

  // Last name
  if (!values.lastName) {
    errorLastName.textContent = "Last name is required";
    lastNameInput.classList.add("error");
    hasError = true;
  }

  // Email: required + basic format check
  if (!values.email) {
    errorEmail.textContent = "Email is required";
    emailInput.classList.add("error");
    hasError = true;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errorEmail.textContent = "Invalid email format";
    emailInput.classList.add("error");
    hasError = true;
  }

  // Country
  if (!values.country) {
    errorCountry.textContent = "Country is required";
    countryInput.classList.add("error");
    hasError = true;
  }

  // City
  if (!values.city) {
    errorCity.textContent = "City is required";
    cityInput.classList.add("error");
    hasError = true;
  }

  // Street address
  if (!values.streetAddress) {
    errorStreetAddress.textContent = "Street address is required";
    streetInput.classList.add("error");
    hasError = true;
  }

  // Zip code
  if (!values.zipCode) {
    errorZipCode.textContent = "Zip code is required";
    zipInput.classList.add("error");
    hasError = true;
  }

  // Allow 13 to 19 digits, possibly with spaces (e.g., "0000 0000 0000 0000")
  const cleanedCardNumber = values.cardNumber.replace(/\s+/g, "");

  if (!/^\d{13,19}$/.test(cleanedCardNumber)) {
    errorCardNumber.textContent = "Enter a valid card number";
    cardNumberInput.classList.add("error");
    hasError = true;
  }

  // Card name
  if (!values.cardName) {
    errorCardName.textContent = "Cardholder name is required";
    cardNameInput.classList.add("error");
    hasError = true;
  }

  // Expiry date: must match MM/YY and valid month
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiryDate)) {
    errorExpiryDate.textContent = "Expiry date must be in MM/YY format";
    expiryInput.classList.add("error");
    hasError = true;
  }

  // CVC: 3 or 4 digits
  if (!/^\d{3,4}$/.test(values.cvc)) {
    errorCvc.textContent = "Enter a valid CVC";
    cvcInput.classList.add("error");
    hasError = true;
  }

  // If any error was found, don't proceed
  if (hasError) {
    hideLoadingIndicator();
    return;
  }

  // All validations passed - show loader and simulate successful payment
  showLoadingIndicator();

  setTimeout(() => {
    cart.clear(); // Clear cart after successful "payment"
    hideLoadingIndicator();
    window.location.href = "payment-successful.html";
  }, 2000);
});
