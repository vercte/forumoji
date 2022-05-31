var HTML = document.documentElement,
    current_theme =
        localStorage.getItem("theme") ||
        ((window.matchMedia("(prefers-color-scheme: dark)") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "default"),
    themes = [
        "default",
        "dark"
    ],
    theme_button = $("#theme_button"),
    set_theme = (theme) => {
        current_theme = theme;
        localStorage.setItem("theme", theme);
        HTML.className = theme;
    };

theme_button.click(function switch_theme() {
    let next_index = themes.indexOf(current_theme) + 1;
    if (next_index >= themes.length)
        return set_theme(themes[0]);
    set_theme(themes[next_index]);
})
set_theme(current_theme);
