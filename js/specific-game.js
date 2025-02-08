import { fetchGameById } from "./api.js";
import { cart, updateCartIcon } from "./cart.js";

// Get game ID from URL
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

// Fetch specific game details
fetchGameById(gameId)
  .then((data) => {
    const game = data.data;
    setupGamePage(game);
  })
  .catch((error) => {
    console.error("Error fetching game data:", error);
  });

// Set up the game page with fetched data
function setupGamePage(game) {
  // Update page content dynamically
  document.title = `GameHub | Games | ${game.title}`;
  document.querySelector(".text-section h1").textContent = game.title;
  document.querySelector(".tags").textContent = game.genre;
  document.querySelector(".game-title_paragraph").textContent =
    game.description;
  document.querySelector(".price-styling").textContent = `$${game.price}`;

  // Update the game images
  document.getElementById("coverImage").src = game.image.url;
  document.getElementById("coverImage").alt = game.image.alt;
  document.getElementById("coverImagePreview").src = game.image.url;
  document.getElementById("coverImagePreview").alt = game.image.alt;

  //Counter and add to cart functionality
  setupCounter(game);
  setupAddToCartButton(game);
}

// Handle the quantity counter functionality
function setupCounter() {
  const quantityDisplay = document.querySelector(".counter p");
  const minusButton = document.querySelector(".fa-minus");
  const plusButton = document.querySelector(".fa-plus");

  minusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent);
    if (quantity > 1) {
      quantityDisplay.textContent = --quantity;
    }
  });

  plusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent);
    quantityDisplay.textContent = ++quantity;
  });
}

// Setup the add to cart button functionality
function setupAddToCartButton(game) {
  const addButton = document.getElementById("addToCartButton");
  addButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behaviour
    const quantity = parseInt(document.querySelector(".counter p").textContent);
    console.log(`Adding to cart. Quantity: ${quantity}`); // Debug: log the quantity being added
    cart.addItem({
      id: game.id,
      title: game.title,
      price: game.price,
      image: game.image.url,
      quantity: quantity,
    });
    updateCartIcon();
  });
}
