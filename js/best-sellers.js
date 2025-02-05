import { fetchAllGames } from "./api.js";

fetchAllGames()
  .then((data) => {
    const bestSellersContainer = document.querySelector(".best-sellers_games");
    bestSellersContainer.innerHTML = ""; // Clear existing content

    // Get only the first 5 games
    const bestSellers = data.data.slice(0, 5);

    // Create game cards dynamically
    bestSellers.forEach((game) => {
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

      // Append game card to the container
      bestSellersContainer.appendChild(gameCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching best sellers:", error);
  });
