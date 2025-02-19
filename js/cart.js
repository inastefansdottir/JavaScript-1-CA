export const cart = {
  items: [], // Stores items added to the cart
  subtotal: 0, // Stores the current subtotal of the cart

  // Saves the current state of the cart to local storage to preserve it across sessions
  save() {
    this.updateSubtotal(); // Update subtotal before saving
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: this.items,
        subtotal: this.subtotal, // Save both items and subtotal
      })
    );
  },

  // Loads the cart items from local storage when the page is loaded or refreshed
  load() {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      this.items = storedCart.items || [];
      this.subtotal = storedCart.subtotal || 0;
    } else {
      this.items = [];
      this.subtotal = 0;
    }
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

  // Updates the subtotal of the cart
  updateSubtotal() {
    this.subtotal = this.items.reduce(
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
    this.subtotal = 0; // Reset the subtotal to 0
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
  const cartCount = cart.getCartCount(); // Get the count of all items in the cart
  document.querySelectorAll(".fa-cart-shopping").forEach((icon) => {
    const badge = icon.nextElementSibling || document.createElement("span");
    badge.textContent = cartCount; // Set the badge text to the cart count
    badge.classList.add("cart-count-badge"); // To style the badge
    if (!icon.nextElementSibling) {
      icon.parentNode.insertBefore(badge, icon.nextSibling); // Add badge to DOM if it doesnt exist
    }
  });
}

// Function for a cart popup message
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

  function createPopup(game) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.textContent = `${game.title} added to cart.`;
    return popup;
  }

  function handlePopupLifecycle(popup, parent) {
    setTimeout(() => {
      popup.classList.add("fade-out"); // Fade out animation
      setTimeout(() => {
        if (popup.parentNode === parent) {
          parent.removeChild(popup);
        }
      }, 500); // Remove after animation
    }, 3000);
  }
}
