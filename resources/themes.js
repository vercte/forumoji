const themes = [
    'default',
    'dark',
    'blue',
    'blue-dark'
  ];

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'),
  defaultTheme = prefersDark?.matches ? 'dark' : 'default';

var currentTheme =
  localStorage.getItem('forumoji-theme') || // local storage is shared across gh.vercte.net, so avoid conflicts just in case
  defaultTheme;

$('#theme-button').click(function switchTheme() {
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
