const apiUrl = "https://v2.api.noroff.dev/gamehub";

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      // Check if the response is ok (status 100)
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON from the reponse
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
