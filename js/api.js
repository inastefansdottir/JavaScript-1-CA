// API URL
const baseApiUrl = "https://v2.api.noroff.dev/gamehub";

// Fetch all products
export const fetchAllGames = async () => {
  try {
    const response = await fetch(baseApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch all games");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
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
