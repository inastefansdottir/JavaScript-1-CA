// API URL
const baseApiUrl = "https://v2.api.noroff.dev/gamehub";

// Fetch all products
export const fetchAllGames = async () => {
  try {
    const response = await fetch(baseApiUrl); // HTTP GET request to the base API URL
    if (!response.ok) {
      // Check if the HTTP response status is not OK
      throw new Error("Failed to fetch all games"); // If not OK, throw an error
    }
    return await response.json(); // If the response is OK, parse it as JSON ans return
  } catch (error) {
    console.error("API Error:", error); // Log any errors that appear during the fetch operation
    throw error; // Rethrow error to handle it in other files
  }
};

// Fetch a specific game by ID
export const fetchGameById = async (gameId) => {
  try {
    const response = await fetch(`${baseApiUrl}/${gameId}`);
    if (!response.ok)
      throw new Error(`Failed to fetch game with ID: ${gameId}`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
