export const cart = {
  items: [], // Stores items added to the cart

  // Saves the current state of the cart to local storage to preserve it across sessions
  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  },

  // Loads the cart items from local storage when the page is loaded or refreshed
  load() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  },

  // Adds an item to the cart or increases its quantity if it already exists
  addItem(item) {
    const existingItem = this.items.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Increase quantity if item already exists
    } else {
      this.items.push(item); // Add new item with a quantity of 1
    }
    this.save(); // Save changes to local storage
  },

  // Removes an item from the cart based on its ID
  removeItem(id) {
    const index = this.items.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.items.splice(index, 1); // Remove item if found
      this.save(); // Save changes to local storage
    }
  },

  // Updates the quantity of a specific item in the cart
  updateQuantity(id, quantity) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.quantity = quantity; // Set new quantity
      this.save(); // Save changes to local storage
    }
  },

  // Calculates the total price of all items in the cart
  getTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // Returns the total number of items in the cart
  getCartCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  },

  clear() {
    this.items = []; // Reset the cart to an empty array
    this.save(); // Save the empty cart to localStorage
  },
};

// Event to load cart and update the cart icon when the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  cart.load(); // Load cart items from local storage
  updateCartIcon(); // Update UI to reflect the current cart status
});

// Function to update the cart icon with the number of item
export function updateCartIcon() {
  const cartCount = cart.getCartCount(); // Get the count of all items in teh cart
  document.querySelectorAll(".fa-cart-shopping").forEach((icon) => {
    const badge = icon.nextElementSibling || document.createElement("span");
    badge.textContent = cartCount; // Set the badge text to the cart count
    badge.classList.add("cart-count-badge"); // To style the badge
    if (!icon.nextElementSibling) {
      icon.parentNode.insertBefore(badge, icon.nextSibling); // Add badge to DOM if it doesnt exist
    }
  });
}
