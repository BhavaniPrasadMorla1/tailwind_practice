// DOM Elements
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const themeToggler = document.getElementById("theme-toggler");
const htmlElement = document.documentElement; // The <html> element

// Function to fetch search results from Wikipedia
async function searchWikipedia(query) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodeURIComponent(query)}`;
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to fetch search results.");
    
    const data = await response.json();
    return data.query.search;
  } catch (error) {
    console.error(error);
    searchResults.innerHTML = "<p>An error occurred while fetching results. Please try again later.</p>";
  }
}

// Function to display search results
function displayResults(results) {
  searchResults.innerHTML = ""; // Clear any previous results
  if (!results.length) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(result => {
    const resultItem = `
      <div class="result-item mb-4">
        <h3 class="result-title text-xl font-semibold">
          <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <p class="result-snippet text-gray-600">${result.snippet}</p>
      </div>
    `;
    searchResults.innerHTML += resultItem;
  });
}

// Event listener for the search form
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    searchResults.innerHTML = "<p>Please enter a valid search term.</p>";
    return;
  }

  searchResults.innerHTML = "<div class='spinner'>Loading...</div>";

  const results = await searchWikipedia(query);
  displayResults(results);
});

// Event listener for theme toggler
themeToggler.addEventListener("click", () => {
  // Toggle dark mode on the <html> element
  const isDarkMode = htmlElement.classList.toggle("dark");
  themeToggler.textContent = isDarkMode ? "Light" : "Dark"; // Change button text based on mode
});
