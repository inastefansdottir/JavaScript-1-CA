import { fetchGameById } from "./api.js";

// Get game ID from URL
const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

// Fetch specific game details
fetchGameById(gameId)
  .then((data) => {
    const game = data.data;
    console.log(game);

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
  })
  .catch((error) => {
    console.error("Error fetching game data:", error);
  });
