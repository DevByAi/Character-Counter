const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const readingTime = document.getElementById('readingTime');
const speakingTime = document.getElementById('speakingTime');
let isHebrew = true;
let includeSpaces = true;

function formatTime(seconds) {
    if (seconds < 60) {
        return {
            value: seconds,
            unit: translations[getCurrentLang()].seconds
        };
    } else if (seconds < 3600) {
        const minutes = Math.ceil(seconds / 60);
        return {
            value: minutes,
            unit: translations[getCurrentLang()].minutes
        };
    } else {
        const hours = Math.ceil(seconds / 3600);
        return {
            value: hours,
            unit: translations[getCurrentLang()].hours
        };
    }
}

// Helper function to get current language
function getCurrentLang() {
    return isHebrew ? 'he' : 'en';
}

function updateCounts() {
    const text = textInput.value;
    const count = includeSpaces ? text.length : text.replace(/\s/g, '').length;
    charCount.textContent = count;
    
    const readingSeconds = Math.ceil(count / 5);
    const readingFormatted = formatTime(readingSeconds);
    readingTime.textContent = readingFormatted.value;
    document.getElementById('readingTimeUnit').textContent = readingFormatted.unit;
    
    const speakingSeconds = Math.ceil(count / 3);
    const speakingFormatted = formatTime(speakingSeconds);
    speakingTime.textContent = speakingFormatted.value;
    document.getElementById('speakingTimeUnit').textContent = speakingFormatted.unit;

    const lang = getCurrentLang();
    const countLabel = includeSpaces ? translations[lang].withSpaces : translations[lang].withoutSpaces;
    document.getElementById('charCountLabel').textContent = `${translations[lang].charCount} (${countLabel})`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('darkModeToggle').checked = isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
}

function toggleLanguage() {
    isHebrew = !isHebrew;
    const lang = getCurrentLang();
    document.body.style.direction = isHebrew ? 'rtl' : 'ltr';
    
    document.getElementById('title').textContent = translations[lang].title;
    textInput.placeholder = translations[lang].placeholder;
    document.getElementById('charCountLabel').textContent = `${translations[lang].charCount} (${includeSpaces ? translations[lang].withSpaces : translations[lang].withoutSpaces})`;
    document.getElementById('readingTimeLabel').textContent = translations[lang].readingTime;
    document.getElementById('speakingTimeLabel').textContent = translations[lang].speakingTime;
    document.getElementById('readingTimeUnit').textContent = translations[lang].seconds;
    document.getElementById('speakingTimeUnit').textContent = translations[lang].seconds;
    
    document.getElementById('readingExplanation').textContent = translations[lang].readingExplanation;
    document.getElementById('speakingExplanation').textContent = translations[lang].speakingExplanation;
    
    document.getElementById('clearBtn').textContent = translations[lang].clearText;
    
    updateCounts();
    updateSpaceToggleButton();
}

function toggleSpaces() {
    includeSpaces = !includeSpaces;
    updateCounts();
    updateSpaceToggleButton();
}

function updateSpaceToggleButton() {
    const lang = getCurrentLang();
    document.getElementById('spaceToggleBtn').textContent = 
        includeSpaces ? translations[lang].spaceToggleOn : translations[lang].spaceToggleOff;
}

function clearText() {
    textInput.value = '';
    updateCounts();
}

// Load saved preferences
document.addEventListener('DOMContentLoaded', () => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
    document.getElementById('darkModeToggle').checked = savedDarkMode;

    // Load language preference
    const savedHebrew = localStorage.getItem('isHebrew') !== 'false';
    if (!savedHebrew) {
        isHebrew = false;
        document.body.style.direction = 'ltr';
        toggleLanguage(); // This will update all texts to English
    } else {
        // Update initial texts for Hebrew
        const lang = getCurrentLang();
        document.getElementById('title').textContent = translations[lang].title;
        textInput.placeholder = translations[lang].placeholder;
        document.getElementById('readingExplanation').textContent = translations[lang].readingExplanation;
        document.getElementById('speakingExplanation').textContent = translations[lang].speakingExplanation;
    }

    // Set initial texts
    const lang = getCurrentLang();
    document.getElementById('clearBtn').textContent = translations[lang].clearText;
    document.getElementById('readingExplanation').textContent = translations[lang].readingExplanation;
    document.getElementById('speakingExplanation').textContent = translations[lang].speakingExplanation;
    updateSpaceToggleButton();
    updateCounts();
    
    // Add input listener after all initializations
    textInput.addEventListener('input', updateCounts);
}); 