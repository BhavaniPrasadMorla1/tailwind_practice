const movieForm = document.getElementById("movie-form");
const movieInput = document.getElementById("movie-input");
const movieResults = document.getElementById("movie-results");
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

const API_KEY = "e675fdb9"; // 👉 Get from http://www.omdbapi.com/apikey.aspx

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = movieInput.value.trim();
  if (!searchTerm) return;

  movieResults.innerHTML = "<p>Loading...</p>";
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
  const data = await response.json();

  if (data.Response === "False") {
    movieResults.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
    return;
  }

  movieResults.innerHTML = data.Search.map(movie => `
    <div class="flex gap-4 items-center border-b pb-4">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100x150'}" alt="${movie.Title}" class="w-24 h-36 object-cover rounded" />
      <div>
        <h2 class="text-xl font-semibold">${movie.Title}</h2>
        <p>${movie.Year}</p>
        <p class="text-sm text-gray-500">${movie.Type}</p>
      </div>
    </div>
  `).join("");
});

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
});
