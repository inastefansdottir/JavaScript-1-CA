export const cart = {
  // Array to store cart items. Each item schould have { id, title, price, quantity }
  items: [],
  // Keeps track of the total price of all items currently in the cart
  subtotal: 0,

  /**
   * Save the current cart state to the localStorage.
   * This ensure that the cart persists even if the user reloads the page or closes the browser
   */
  save() {
    this.updateSubtotal(); // Update subtotal before saving

    // localStorage can only store strings, so we convert the cart object into JSON
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: this.items, // Save all items with their quantities
        subtotal: this.subtotal, // Save the current subtotal so we don't recalculate on load
      })
    );
  },

  /**
   * Load cart data from localStorage when the page loads.
   * If no data is found, initialize with empty cart and zero subtotal.
   */
  load() {
    // Retrieve the saved cart string and parse it back into an object
    const storedCart = JSON.parse(localStorage.getItem("cart"));

    if (storedCart) {
      // If we have saved data, restore items and subtotal from it
      this.items = storedCart.items || [];
      this.subtotal = storedCart.subtotal || 0;
    } else {
      // If no saved cart, start fresh
      this.items = [];
      this.subtotal = 0;
    }
  },

  /**
   * Add an item to the cart.
   * If the item already exists (matching by id), increase its quantity instead of duplicating.
   * @param {Object} item
   */
  addItem(item) {
    // Check if the cart already contains this item (by id)
    const existingItem = this.items.find((i) => i.id === item.id);

    if (existingItem) {
      // If the item exists, increment the quantity by the new amount
      existingItem.quantity += item.quantity; // Increase quantity if item already exists
    } else {
      // If its a new item, add it to the cart array
      this.items.push(item);
    }
    this.save(); // Save changes to local storage
  },

  /**
   * Remove an item from the cart by its unique id.
   * @param {number|string} id - The ID of the item to remove
   */
  removeItem(id) {
    // Find the index of the item to remove
    const index = this.items.findIndex((i) => i.id === id);

    if (index !== -1) {
      // Remove the item from the array using splice
      this.items.splice(index, 1);
      this.save(); // Save changes to local storage
    }
  },

  /**
   * Calculate the subtotal price for all items currently in the cart.
   * This multiplies each item's price by its quantity and sums everything up.
   */
  updateSubtotal() {
    // Use Array.reduce to sum up price * quantity for each item
    this.subtotal = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0 // Inital total value starts at 0
    );
  },

  /**
   * Get the total count of all items in the cart.
   * This counts each item multiplied by its quantity.
   * @returns {number} - Total number of items
   */
  getCartCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  },

  clear() {
    this.items = []; // Reset the cart to an empty array
    this.subtotal = 0; // Reset the subtotal to 0
    this.save(); // Save the empty cart to localStorage
  },
};

cart.load(); // Load cart items from local storage
updateCartIcon(); // Update UI to reflect the current cart status

/**
 * Updates all cart icons on the page with a badge showing the number of items.
 * It looks for elements with the class ".fa-cart-shopping" and adds a badge next to each.
 */
export function updateCartIcon() {
  const cartCount = cart.getCartCount(); // Get the count of all items in the cart

  // For each cart icon found on the page
  document.querySelectorAll(".fa-cart-shopping").forEach((icon) => {
    // Try to find an existing badge (the element immediately after the icon)
    const badge = icon.nextElementSibling || document.createElement("span");

    badge.textContent = cartCount; // Set the badge text to the cart count

    badge.classList.add("cart-count-badge"); // To style the badge

    // If the badge didn't exist before, insert it into the DOM after the icon
    if (!icon.nextElementSibling) {
      icon.parentNode.insertBefore(badge, icon.nextSibling);
    }
  });
}

/**
 * Displays a temporary popup message near cart icons when a game/item is added to the cart.
 * Shows the game title with a message like: "[Game Title] added to cart."
 * @param {Object} game - The game object with at least a "title" property
 */
export function showCartPopup(game) {
  const icons = document.querySelector(".search-icons-section");
  const iconsMobile = document.querySelector(".icon-mobile-section");

  // Check if there's already a popup and remove it
  const existingPopup = icons.querySelector(".cart-popup");
  const existingPopupMobile = iconsMobile.querySelector(".cart-popup");

  if (existingPopup) {
    existingPopup.remove();
  }
  if (existingPopupMobile) {
    existingPopupMobile.remove();
  }

  // Create and append popup for desktop
  const popupDesktop = createPopup(game);
  icons.appendChild(popupDesktop);
  handlePopupLifecycle(popupDesktop, icons);

  // Create and append popup for mobile
  const popupMobile = createPopup(game);
  iconsMobile.appendChild(popupMobile);
  handlePopupLifecycle(popupMobile, iconsMobile);

  /**
   * Helper to create a popup element with the game title mess
   * @param {Object} - game
   * @returns {HTMLElement} - The popup div element
   */
  function createPopup(game) {
    const popup = document.createElement("div");
    popup.className = "cart-popup"; // CSS class for styling the popup
    popup.textContent = `${game.title} added to cart.`; // Message text
    return popup;
  }

  /**
   * Handles fading out and removing the popup after a few seconds
   * @param {HTMLElement} popup - The pupup element to remove
   * @param {HTMLElement} parent - The parent container of the popup
   */
  function handlePopupLifecycle(popup, parent) {
    setTimeout(() => {
      // Add feade-out CSS animation class
      popup.classList.add("fade-out");

      // After animation duration, remove popup from DOM to clean up
      setTimeout(() => {
        if (popup.parentNode === parent) {
          parent.removeChild(popup);
        }
      }, 500);
    }, 3000); // Popup is visivle for 3 seconds before fading
  }
}
