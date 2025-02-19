import { fetchAllGames } from "./api.js";

let allGames = []; // Store all games globally

// Updates the hero section of the webpage with game information
const updateHeroSection = (game) => {
  const heroTextContainer = document.querySelector(".hero-text");

  // Update the hero section's title and description with game data
  heroTextContainer.querySelector("h1").textContent = game.title;
  heroTextContainer.querySelector(".main-paragraph").textContent =
    game.description;

  // Set the href attribute of the "learn more" button with a link to the specific game id
  document.getElementById(
    "learnMoreButton"
  ).href = `./games/specific-game/?id=${game.id}`;
};

// Function to create a game card for best sellers
const createGameCard = (game) => {
  const gameCard = document.createElement("div");
  gameCard.className = "game-card";

  const link = document.createElement("a");
  link.href = `./games/specific-game/?id=${game.id}`;
  link.className = "game-card_Link";

  const img = document.createElement("img");
  img.src = game.image.url;
  img.alt = game.image.alt;
  img.className = "game-card_image";

  const hoverDiv = document.createElement("div");
  hoverDiv.className = "game-card_hover";

  const title = document.createElement("h3");
  title.textContent = game.title;

  const price = document.createElement("p");
  price.style.fontWeight = "300";
  if (game.onSale) {
    const originalPrice = document.createElement("span");
    originalPrice.textContent = `$${game.price}`;
    originalPrice.style.textDecoration = "line-through";
    originalPrice.style.color = "#db21cc";

    const discountedPrice = document.createElement("span");
    discountedPrice.textContent = `$${game.discountedPrice}`;
    discountedPrice.style.marginLeft = "10px";

    price.appendChild(originalPrice);
    price.appendChild(discountedPrice);
  } else {
    price.textContent = `$${game.price}`;
  }

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${game.genre}`;

  // Append hover details
  hoverDiv.appendChild(title);
  hoverDiv.appendChild(price);
  hoverDiv.appendChild(genre);

  // Append image and hover div to the link
  link.appendChild(img);
  link.appendChild(hoverDiv);

  // Append link to the game card
  gameCard.appendChild(link);

  return gameCard;
};

// render best sellers section
const renderBestSellers = (games) => {
  const bestSellersContainer = document.querySelector(".best-sellers_games");
  bestSellersContainer.innerHTML = ""; // Clear existing content

  // Filter favorites and sort them first
  games = games
    .filter((g) => g.favorite)
    .concat(games.filter((g) => !g.favorite));

  // Only taking the first four games from the array for the best sellers section
  games.slice(0, 4).forEach((game) => {
    const gameCard = createGameCard(game);
    bestSellersContainer.appendChild(gameCard);
  });
};

// Fetch games
async function loadAndDisplayGames() {
  try {
    const data = await fetchAllGames(); // Wait for the fetch to complete
    allGames = data.data; // Store all games globally

    // Update the hero section and render the best sellers using fetched data
    updateHeroSection(allGames[1]); // Only selecting the "second game"
    renderBestSellers(allGames);
  } catch (error) {
    // Log any errors encountered during the fetch operation
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Call the function to execute the fetching and updating UI tasks
loadAndDisplayGames();
