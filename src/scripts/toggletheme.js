const themeLightBtn = document.getElementById('theme-light');
const themeDarkBtn = document.getElementById('theme-dark');
const themeBeachBtn = document.getElementById('theme-beach');
const bodyElement = document.body;

const beachImageUrl = "url('https://miviaje.com/wp-content/uploads/2020/04/playa-caleta-cadiz.jpg')";

function setGradientBackground() {
    bodyElement.style.backgroundImage = '';
    localStorage.setItem('background-mode', 'default');
}

function setBeachBackground() {
    bodyElement.style.backgroundImage = beachImageUrl;
    bodyElement.style.backgroundSize = "cover";
    bodyElement.style.backgroundPosition = "center";
    bodyElement.style.backgroundRepeat = "no-repeat";
    bodyElement.style.backgroundAttachment = "fixed";
    localStorage.setItem('background-mode', 'beach');
}

function setLightMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
}

function setDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
}

// Check de la playa
const savedBg = localStorage.getItem('background-mode');
if (savedBg === 'beach') {
    setBeachBackground();
} 

if (themeLightBtn) {
    themeLightBtn.addEventListener('click', function() {
        setLightMode();
        setGradientBackground();
    });
}

if (themeDarkBtn) {
    themeDarkBtn.addEventListener('click', function() {
        setDarkMode();
        setGradientBackground();
    });
}

if (themeBeachBtn) {
    themeBeachBtn.addEventListener('click', function() {
        setLightMode();
        setBeachBackground();
    });
}