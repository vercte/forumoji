const themes = [
    'default',
    'dark',
    'blue',
    'blue-dark'
  ];

var currentTheme =
  localStorage.getItem('forumoji-theme') || // local storage is shared across lopste.github.io, so avoid conflicts just in case
  ((window.matchMedia('(prefers-color-scheme: dark)') &&
  window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'default');

$('#theme_button').click(function switch_theme() {
  let nextIndex = themes.indexOf(currentTheme) + 1;
  if (nextIndex >= themes.length)
    return setTheme(themes[0]);
  setTheme(themes[nextIndex]);
})
setTheme(currentTheme);

function setTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('forumoji-theme', theme);
  $('html').attr('class', theme);
};
