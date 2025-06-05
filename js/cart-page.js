import { cart, updateCartIcon } from "./cart.js";

cart.load(); // Ensure cart items are loaded from local storage
renderCartItems(); // Call function to display cart items on the page
updateCheckoutButton(); // Update the checkout button state based on cart status

document.addEventListener("cartCleared", handleCartCleared); // Listen for the cart cleared event

// Handle the cart cleared event: empty the cart and update UI
function handleCartCleared() {
  cart.clear(); // Clear all items in the cart object
  updateSummary(cart.subtotal); // Update summary to show zero
  updatePageUI(); // Refresh all related UI elements
}

// Renders all cart items into the DOM
function renderCartItems() {
  const orderList = document.querySelector(".order-list");
  const staticHeader = orderList.querySelector(".static-header");

  // Toggle static header visibility
  staticHeader.style.display = cart.getCartCount() > 0 ? "" : "none"; // Toggle visibility based on cart count

  // Clear previously added items but keep static headers
  const dynamicContent = orderList.querySelectorAll(".product-container");
  dynamicContent.forEach((el) => el.remove());

  // A container for each item and add to the DOM
  cart.items.forEach((item, index) => {
    const productContainer = document.createElement("div");
    productContainer.className = "product-container"; // Use for styling and organization

    productContainer.appendChild(createProductLine(item)); // Append the item element to the container

    cart.subtotal; // Add items subtotal

    // Add separator line between products
    if (index < cart.getCartCount()) {
      const separator = document.createElement("div");
      separator.className = "line-separator";
      productContainer.appendChild(separator);
    }

    orderList.appendChild(productContainer);
  });

  updateSummary(cart.subtotal);
  updateCheckoutButton(); // Ensure the checkout button works
}

// Update the subtotal and total in the cart summary section
function updateSummary(subtotal) {
  const subtotalElement = document.getElementById("cartSubTotal");
  const totalElement = document.getElementById("cartOrderTotal");

  // Safely update the subtotal and total, with 2 decimal places
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Generate the DOM structure for a single cart item
function createProductLine(item) {
  const container = document.createElement("div");
  container.className = "dynamic"; // Mark for easy removal

  const formattedTotalPrice = (item.price * item.quantity).toFixed(2);

  // Create item layout using innerHTML
  container.innerHTML = `
        <img class="product-image center-align" src="${item.image}" alt="Cover art of ${item.title}">
        <p class="bold-text-style title center-align">${item.title}</p>
        <p class="bold-text-style price center-align">$${item.price}</p>
        <div class="counter center-align">
            <i class="fa-solid fa-minus"></i>
            <p class="bold-text-style">${item.quantity}</p>
            <i class="fa-solid fa-plus"></i>
        </div>
        <p class="bold-text-style total-price center-align">$${formattedTotalPrice}</p>
        <div class="ex center-align">
            <i class="fa-solid fa-x"></i>
        </div>
    `;

  // Add event listeners to change quantity and remove buttons
  container
    .querySelector(".fa-minus")
    .addEventListener("click", () => adjustItemQuantity(item.id, -1));
  container
    .querySelector(".fa-plus")
    .addEventListener("click", () => adjustItemQuantity(item.id, 1));
  container
    .querySelector(".ex")
    .addEventListener("click", () => removeItemFromCart(item.id));

  return container;
}

// Adjust the quantity of an item and update UI and cart
function adjustItemQuantity(itemId, change) {
  const item = cart.items.find((item) => item.id === itemId);
  if (item) {
    item.quantity += change; // Modify quantity
    if (item.quantity < 1) item.quantity = 1; // Prevent the quantity from going below 1
    cart.save(); // Save updated cart to local storage
    updatePageUI(); // Re-render everything
  }
}

// Remove a specific item from the cart
function removeItemFromCart(itemId) {
  cart.removeItem(itemId); // Remove item from cart data
  cart.save(); // Save updated cart
  updatePageUI(); // Update UI accordingly
}

// Re-renders the cart items, cart icon, and checkout button
function updatePageUI() {
  renderCartItems();
  updateCartIcon(); // Update the cart icon count
  updateCheckoutButton();
}

// Enable or disable the checkout button depending on cart state
function updateCheckoutButton() {
  const checkoutButton = document.getElementById("checkoutButton");
  if (cart.getCartCount() === 0) {
    checkoutButton.classList.add("disabled");
    checkoutButton.href = "#"; // Disable checkout link
    displayEmptyCartMessage(true);
  } else {
    checkoutButton.classList.remove("disabled");
    checkoutButton.href = "../cart/checkout/"; // Real checkout
    displayEmptyCartMessage(false);
  }
}

// Show or hide the "Your cart is empty" message
function displayEmptyCartMessage(isEmpty) {
  const message = document.getElementById("emptyCartMessage");
  message.style.display = isEmpty ? "flex" : "none";
}
