import { fetchAllGames } from "./api.js";

let allGames = []; // Store all games globally

// Hero section
const updateHeroSection = (game) => {
  const heroTextContainer = document.querySelector(".hero-text");

  heroTextContainer.querySelector("h1").textContent = game.title;
  heroTextContainer.querySelector(".main-paragraph").textContent =
    game.description;

  document.getElementById(
    "learnMoreButton"
  ).href = `./games/specific-game.html?id=${game.id}`;
};

// Function to create a game card for best sellers
const createGameCard = (game) => {
  const gameCard = document.createElement("div");
  gameCard.className = "game-card";

  const link = document.createElement("a");
  link.href = `./games/specific-game.html?id=${game.id}`;
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
  price.textContent = `Price; $${game.price}`;

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

  games.slice(0, 4).forEach((game) => {
    const gameCard = createGameCard(game);
    bestSellersContainer.appendChild(gameCard);
  });
};

// Fetch games
fetchAllGames()
  .then((data) => {
    allGames = data.data; // Store all games globally

    updateHeroSection(allGames[1]);
    renderBestSellers(allGames);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
