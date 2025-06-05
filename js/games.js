import { fetchAllGames } from "./api.js";
import { cart, updateCartIcon, showCartPopup } from "./cart.js";

let allGames = []; // Store all games globally

// Function to render games dynamically
const renderGames = (games) => {
  const productList = document.querySelector(".product-list"); // The container for the games
  productList.innerHTML = ""; // Clear any existing content

  // Loop through each game and create its HTML structure
  games.forEach((game) => {
    // Create main game container
    const productDiv = document.createElement("div");
    productDiv.classList.add("products");

    // Create clickable image that links to the game detail page
    const gameCover = document.createElement("a");
    gameCover.classList.add("game-cover");
    gameCover.href = `../games/specific-game/?id=${game.id}`;

    // Game image
    const gameImage = document.createElement("img");
    gameImage.src = game.image.url;
    gameImage.alt = game.image.alt;

    // Game title
    const gameTitle = document.createElement("h2");
    gameTitle.textContent = game.title;

    // Game price
    const gamePrice = document.createElement("p");
    if (game.onSale) {
      // Show original price with a strikethrough
      const originalPrice = document.createElement("span");
      originalPrice.textContent = `$${game.price}`;
      originalPrice.style.textDecoration = "line-through";
      originalPrice.style.opacity = "0.6";

      // Show discounted price
      const discountedPrice = document.createElement("span");
      discountedPrice.textContent = `$${game.discountedPrice}`;
      discountedPrice.style.marginLeft = "10px";

      gamePrice.appendChild(originalPrice);
      gamePrice.appendChild(discountedPrice);
    } else {
      // Show regular price
      gamePrice.textContent = `$${game.price}`;
    }

    // "Add to cart" button
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("button", "small-button");
    addToCartButton.textContent = "Add to cart";

    // Define an onclick event for the button that adds the game to the cart
    addToCartButton.onclick = () => {
      cart.addItem({
        id: game.id,
        title: game.title,
        price: game.onSale ? game.discountedPrice : game.price,
        image: game.image.url,
        quantity: 1, // default quantity is 1
      });
      updateCartIcon(); // Update number in cart icon
      showCartPopup(game); // Show popup notification
    };

    // Append elements to the product card
    gameCover.appendChild(gameImage);
    productDiv.appendChild(gameCover);
    productDiv.appendChild(gameTitle);
    productDiv.appendChild(gamePrice);
    productDiv.appendChild(addToCartButton);

    // Append product card to the product list
    productList.appendChild(productDiv);
  });
};

// Function to apply category filtering and price sorting
const applyFiltersAndSorting = () => {
  const category = document.getElementById("categoryFilter").value;
  const priceSort = document.getElementById("priceSort").value;

  // Filter by category
  let filteredGames = allGames;
  // If a specific category is selected, filter the games by genre
  if (category !== "all") {
    filteredGames = filteredGames.filter((game) => game.genre === category);
  }

  // Sort by price
  if (priceSort === "lowToHigh") {
    filteredGames.sort((a, b) => {
      const priceA = a.onSale ? a.discountedPrice : a.price;
      const priceB = b.onSale ? b.discountedPrice : b.price;
      return priceA - priceB;
    });
  } else if (priceSort === "highToLow") {
    filteredGames.sort((a, b) => {
      const priceA = a.onSale ? a.discountedPrice : a.price;
      const priceB = b.onSale ? b.discountedPrice : b.price;
      return priceB - priceA;
    });
  }

  renderGames(filteredGames);
};

// Main function to fetch and display games on page load
async function loadAndDisplayGames() {
  try {
    const data = await fetchAllGames(); // Wait for the fetch to complete
    allGames = data.data; // Store all games globally
    renderGames(allGames); // Initial render of all games

    // Event listeners for category filter and price sort dropdowns
    document
      .getElementById("categoryFilter")
      .addEventListener("change", applyFiltersAndSorting);
    document
      .getElementById("priceSort")
      .addEventListener("change", applyFiltersAndSorting);
  } catch (error) {
    // Log any errors encountered during the fetch operation
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Call the function to execute the fetching and updating UI tasks
loadAndDisplayGames();
