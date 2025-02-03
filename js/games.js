const apiUrl = "https://v2.api.noroff.dev/gamehub";

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      // Check if the response is ok (status 200)
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON from the reponse
  })
  .then((data) => {
    console.log(data);
    const productList = document.querySelector(".product-list"); // The container for the games
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

      gameCover.appendChild(gameImage);

      productDiv.appendChild(gameCover);
      productDiv.appendChild(gameTitle);
      productDiv.appendChild(gamePrice);
      productDiv.appendChild(addToCartButton);

      productList.appendChild(productDiv); // appends each game to the list

      console.log(game.image.url);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
