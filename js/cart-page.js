import { cart, updateCartIcon } from "./cart.js";

// Listen for the DOMContentLoaded event to ensure the page is fully loaded before executing any script
document.addEventListener("DOMContentLoaded", function () {
  cart.load(); // Ensure cart items are loaded from local storage
  renderCartItems(); // Call function to display cart items on the page
  document.addEventListener("cartCleared", handleCartCleared); // Listen for the cart cleared event
});

function handleCartCleared() {
  cart.clear(); // Clear all items in the cart object
  renderCartItems(); // Re-render the cart items
  updateSummary(cart.subtotal); // Update summary to show zero
}

// Renders all cart items into the html
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

    if (index < cart.getCartCount()) {
      const separator = document.createElement("div");
      separator.className = "line-separator";
      productContainer.appendChild(separator);
    }

    orderList.appendChild(productContainer);
  });

  updateSummary(cart.subtotal);
}

function updateSummary(subtotal) {
  const subtotalElement = document.getElementById("cartSubTotal");
  const totalElement = document.getElementById("cartOrderTotal");

  // Safely update the subtotal and total
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  totalElement.textContent = `$${subtotal.toFixed(2)}`;
}

function createProductLine(item) {
  const container = document.createElement("div");
  container.className = "dynamic"; // Mark for easy removal

  const formattedTotalPrice = (item.price * item.quantity).toFixed(2);

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

  // Attach event handlers directly within the function scope
  container
    .querySelector(".fa-minus")
    .addEventListener("click", () => adjustItemQuantity(item.id, -1));
  container
    .querySelector(".fa-plus")
    .addEventListener("click", () => adjustItemQuantity(item.id, 1));
  container
    .querySelector(".fa-x")
    .addEventListener("click", () => removeItemFromCart(item.id));

  return container;
}

// Adjust the quantity of an item and update UI and cart
function adjustItemQuantity(itemId, change) {
  const item = cart.items.find((item) => item.id === itemId);
  if (item) {
    item.quantity += change; // Modify quantity
    if (item.quantity < 1) item.quantity = 1; // Prevent negative quantities
    cart.save();
    renderCartItems();
    updateCartIcon();
  }
}

function removeItemFromCart(itemId) {
  cart.removeItem(itemId);
  cart.save();
  renderCartItems();
  updateCartIcon();
}
