const themeLightBtn = document.getElementById('theme-light');
const themeDarkBtn = document.getElementById('theme-dark');
const htmlElement = document.documentElement;

function setLightMode() {
    htmlElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
}
function setDarkMode() {
    htmlElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
}

if (themeLightBtn) {
    themeLightBtn.addEventListener('click', function() {
        setLightMode();
    });
}

if (themeDarkBtn) {
    themeDarkBtn.addEventListener('click', function() {
        setDarkMode();
    });
}