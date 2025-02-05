import { fetchAllGames } from "./api.js";

fetchAllGames()
  .then((data) => {
    const productList = document.querySelector(".product-list"); // The container for the games
    productList.innerHTML = ""; // Clear any existing content

    data.data.forEach((game) => {
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
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
