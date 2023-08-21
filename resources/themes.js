var HTML = document.documentElement,
  current_theme =
    localStorage.getItem("forumoji-theme") || // local storage is shared across lopste.github.io, so avoid conflicts just in case
    ((window.matchMedia("(prefers-color-scheme: dark)") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "default"),
  themes = [
    "default",
    "dark",
    "blue",
    "blue-dark",
    "purple",
    "purple-dark",
  ],
  theme_button = $("#theme_button"),
  set_theme = (theme) => {
    current_theme = theme;
    localStorage.setItem("forumoji-theme", theme);
    HTML.className = theme;
  };

theme_button.click(function switch_theme() {
  let next_index = themes.indexOf(current_theme) + 1;
  if (next_index >= themes.length)
    return set_theme(themes[0]);
  set_theme(themes[next_index]);
})
set_theme(current_theme);
