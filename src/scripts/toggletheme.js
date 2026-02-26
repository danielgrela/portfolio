var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeDarkBtn = document.getElementById('theme-dark');
var themeLightBtn = document.getElementById('theme-light');

themeDarkBtn.addEventListener('click', function() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
});
themeLightBtn.addEventListener('click', function() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
});