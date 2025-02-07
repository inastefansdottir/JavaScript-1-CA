import { fetchAllGames } from "./api.js";

let allGames = []; // Store all games globally

// Function to render games dynamically
const renderGames = (games) => {
  const productList = document.querySelector(".product-list"); // The container for the games
  productList.innerHTML = ""; // Clear any existing content

  games.forEach((game) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("products");

    const gameCover = document.createElement("a");
    gameCover.classList.add("game-cover");
    gameCover.href = `specific-game.html?id=${game.id}`;

    const gameImage = document.createElement("img");
    gameImage.src = game.image.url;
    gameImage.alt = game.image.alt;

    const gameTitle = document.createElement("h2");
    gameTitle.textContent = game.title;

    const gamePrice = document.createElement("p");
    gamePrice.textContent = `$${game.price}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("button", "small-button");
    addToCartButton.href = "../cart/";
    addToCartButton.textContent = "Add to cart";

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
  if (category !== "all") {
    filteredGames = filteredGames.filter((game) => game.genre === category);
  }

  // Sort by price
  if (priceSort === "lowToHigh") {
    filteredGames.sort((a, b) => a.price - b.price);
  } else if (priceSort === "highToLow") {
    filteredGames.sort((a, b) => b.price - a.price);
  }

  renderGames(filteredGames);
};

// Fetch games and initialize the filters
fetchAllGames()
  .then((data) => {
    allGames = data.data; // Store all games for filtering and sorting
    renderGames(allGames); // Initial render of all games

    // Event listeners for category filter and price sort dropdowns
    document
      .getElementById("categoryFilter")
      .addEventListener("change", applyFiltersAndSorting);
    document
      .getElementById("priceSort")
      .addEventListener("change", applyFiltersAndSorting);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
