const form = document.getElementById("search-form");
const input = document.getElementById("username-input");
const userInfo = document.getElementById("user-info");
const errorMessage = document.getElementById("error-message");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const profileLink = document.getElementById("profile-link");

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = input.value.trim();

  if (!username) return;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      throw new Error("User not found");
    }

    const data = await res.json();

    // Update UI
    avatar.src = data.avatar_url;
    name.textContent = data.name || "No name provided";
    login.textContent = `@${data.login}`;
    bio.textContent = data.bio || "No bio available.";
    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;
    profileLink.href = data.html_url;

    errorMessage.classList.add("hidden");
    userInfo.classList.remove("hidden");
  } catch (err) {
    userInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
