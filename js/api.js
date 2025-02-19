import {
  showLoadingIndicator,
  hideLoadingIndicator,
  displayErrorMessage,
} from "./loader-error.js";

// API URL
const baseApiUrl = "https://v2.api.noroff.dev/gamehub";

// Fetch all products
export const fetchAllGames = async () => {
  showLoadingIndicator();
  try {
    const response = await fetch(baseApiUrl); // HTTP GET request to the base API URL
    if (!response.ok) {
      // Check if the HTTP response status is not OK
      throw new Error("Failed to fetch all games"); // If not OK, throw an error
    }
    return await response.json(); // If the response is OK, parse it as JSON ans return
  } catch (error) {
    displayErrorMessage(
      "Failed to load games. Please refresh the page or try again later."
    );
    throw error; // Rethrow error to handle it in other files
  } finally {
    hideLoadingIndicator();
  }
};

// Fetch a specific game by ID
export const fetchGameById = async (gameId) => {
  showLoadingIndicator();
  try {
    const response = await fetch(`${baseApiUrl}/${gameId}`);
    if (!response.ok)
      throw new Error(`Failed to fetch game with ID: ${gameId}`);
    return await response.json();
  } catch (error) {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `
        <div class="error-feedback">
          <h1 class="not-found">Game Not Found</h1>
          <p>We're unable to load the game details. Please try retrying or explore other games.</p>
          <button id="retryButton" class="button">Refresh</button>
        </div>`;
      document
        .getElementById("retryButton")
        .addEventListener("click", function () {
          fetchGameById(gameId); // Retry fetching the game
        });
    }
    throw error;
  } finally {
    hideLoadingIndicator();
  }
};
