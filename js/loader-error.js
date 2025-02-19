export let loadingIndicator = null;

export function showLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "flex";
}

export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "none";
}

export function displayErrorMessage(message) {
  const container = document.getElementById("errorContainer");
  if (container) {
    container.style.display = "flex"; // Make the error container visible
    container.textContent = message; // Set the error message text
  }
}
