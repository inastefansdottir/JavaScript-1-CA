import { fetchGameById } from "./api.js";
import { cart, updateCartIcon } from "./cart.js";

// Get game ID from URL
const params = new URLSearchParams(window.location.search); // Get the query string from the current window's URL (http://example.com/page?gameId=1234)
const gameId = params.get("id"); // Retrieve the "id" parameter from the URL's query string (the id will be "1234")

// Fetch specific game details
fetchGameById(gameId)
  .then((data) => {
    const game = data.data; // Access the game data from the fetch result
    setupGamePage(game); // Set up the page with the fetched game details
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

  // Counter and add to cart functionality
  setupCounter(game);
  setupAddToCartButton(game);
}

// Handle the quantity counter functionality
function setupCounter() {
  const quantityDisplay = document.querySelector(".counter p");
  const minusButton = document.querySelector(".fa-minus");
  const plusButton = document.querySelector(".fa-plus");

  minusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent); // Get the current quantity as an integer
    if (quantity > 1) {
      quantityDisplay.textContent = --quantity; // Decrease quantity if more than one
    }
  });

  plusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent);
    quantityDisplay.textContent = ++quantity; // INcrease quantity
  });
}

// Setup the add to cart button functionality
function setupAddToCartButton(game) {
  const addButton = document.getElementById("addToCartButton");
  addButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link behaviour
    const quantity = parseInt(document.querySelector(".counter p").textContent); // Get the quantity to add from the counter display
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
