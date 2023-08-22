let root = document.querySelector(':root');
let body = document.querySelector("body");
let darkIcon = document.getElementById("darkToggle");
let lightIcon = document.getElementById("lightToggle");
let setColor = false;

let theme = sessionStorage.getItem('theme') || 'dark';

const themes = {
  dark: {
    "--bg-primary": "#23232e",
    "--bg-secondary": "#141418",
    "--bg-tertiary": "#1d1923",
    "--text-primary": "lightgray",
    "--text-secondary": "white",
    "--bg-color": "#11151C",
    "--text-color": "white",
    "--svg-primary": "#ff7eee",
    "--svg-secondary": "#df49a6"
  },
  light: {
    "--bg-primary": "#B9FFFC",
    "--bg-secondary": "#D2E9E9",
    "--bg-tertiary": "#47FFF6",
    "--text-primary": "gray",
    "--text-secondary": "black",
    "--bg-color": "white",
    "--text-color": "black",
    "--svg-primary": "#7579E7",
    "--svg-secondary": "#9AB3F5"
  }
};
function applyTheme(selectedTheme) {
  for (const property in selectedTheme) {
      root.style.setProperty(property, selectedTheme[property]);
  }
}

function updateThemeIcons() {
  if (theme === "dark") {
      darkIcon.style.display = "block";
      lightIcon.style.display = "none";
  } else {
      darkIcon.style.display = "none";
      lightIcon.style.display = "block";
  }
}

function setSystemTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = "dark";
  } else {
      theme = "light";
  }

  const savedTheme = sessionStorage.getItem('theme');
  theme = savedTheme || theme;

  body.style.setProperty("transition", "none");

  applyTheme(themes[theme]);
  updateThemeIcons();

  setTimeout(() => {
      body.style.setProperty("transition", "background 500ms ease-in-out, color 1s ease");
  }, 10);
}

setSystemTheme();

function changeTheme() {
  if (theme === "dark") {
      theme = "light";
  } else {
      theme = "dark";
  }
  applyTheme(themes[theme]);
  updateThemeIcons();
  sessionStorage.setItem('theme', theme);
}