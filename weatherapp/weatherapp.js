const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const resultDiv = document.getElementById("weather-result");
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Your OpenWeather API key
const API_KEY = "fd8c870ffffdeba11e12ba4a9da3d357"; // Get from https://openweathermap.org/api

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();
    const weatherHTML = `
      <h2 class="text-2xl font-semibold">${data.name}, ${data.sys.country}</h2>
      <p class="text-xl">${data.weather[0].main} - ${data.weather[0].description}</p>
      <p class="text-lg">🌡️ Temp: ${data.main.temp} °C</p>
      <p class="text-lg">💨 Wind: ${data.wind.speed} m/s</p>
    `;
    resultDiv.innerHTML = weatherHTML;
  } catch (error) {
    resultDiv.innerHTML = `<p>${error.message}</p>`;
  }
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
});
