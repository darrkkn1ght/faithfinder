// settings.js - FaithFinder global theme and settings logic

function applySettingsFromStorage() {
    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : (savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-palette');
    // Theme select
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) themeSelect.value = savedTheme;
    // Font
    const savedFont = localStorage.getItem('fontFamily');
    if (savedFont) {
        document.documentElement.style.setProperty('--font-family', savedFont);
        const fontSelect = document.getElementById('fontFamily');
        if (fontSelect) fontSelect.value = savedFont;
    }
    // Dyslexia font
    const dyslexiaFont = localStorage.getItem('dyslexiaFont') === 'true';
    if (dyslexiaFont) {
        document.body.classList.add('dyslexia-font');
        const dyslexiaCheckbox = document.getElementById('dyslexiaFont');
        if (dyslexiaCheckbox) dyslexiaCheckbox.checked = true;
    } else {
        document.body.classList.remove('dyslexia-font');
        const dyslexiaCheckbox = document.getElementById('dyslexiaFont');
        if (dyslexiaCheckbox) dyslexiaCheckbox.checked = false;
    }
    // Font Size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.setProperty('--font-size', savedFontSize + 'px');
        const fontSizeInput = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeInput) fontSizeInput.value = savedFontSize;
        if (fontSizeValue) fontSizeValue.textContent = savedFontSize + 'px';
    }
    // Line Spacing
    const savedLineSpacing = localStorage.getItem('lineSpacing');
    if (savedLineSpacing) {
        document.documentElement.style.setProperty('--line-spacing', savedLineSpacing);
        const lineSpacingInput = document.getElementById('lineSpacing');
        const lineSpacingValue = document.getElementById('lineSpacingValue');
        if (lineSpacingInput) lineSpacingInput.value = savedLineSpacing;
        if (lineSpacingValue) lineSpacingValue.textContent = savedLineSpacing;
    }
}

function bindSettingsEvents() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) themeIcon.className = next === 'light' ? 'fas fa-moon' : (next === 'dark' ? 'fas fa-sun' : 'fas fa-palette');
            const themeSelect = document.getElementById('themeSelect');
            if (themeSelect) themeSelect.value = next;
        });
    }
    // Settings panel open/close
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', () => settingsPanel.classList.add('active'));
    }
    if (closeSettings && settingsPanel) {
        closeSettings.addEventListener('click', () => settingsPanel.classList.remove('active'));
    }
    document.addEventListener('click', (e) => {
        if (settingsPanel && !settingsPanel.contains(e.target) && settingsBtn && !settingsBtn.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });
    // Theme select
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const theme = e.target.value;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) themeIcon.className = theme === 'light' ? 'fas fa-moon' : (theme === 'dark' ? 'fas fa-sun' : 'fas fa-palette');
        });
    }
    // Font family
    const fontSelect = document.getElementById('fontFamily');
    if (fontSelect) {
        fontSelect.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--font-family', e.target.value);
            localStorage.setItem('fontFamily', e.target.value);
        });
    }
    // Dyslexia font
    const dyslexiaCheckbox = document.getElementById('dyslexiaFont');
    if (dyslexiaCheckbox) {
        dyslexiaCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dyslexia-font');
                localStorage.setItem('dyslexiaFont', 'true');
            } else {
                document.body.classList.remove('dyslexia-font');
                localStorage.setItem('dyslexiaFont', 'false');
            }
        });
    }
    // Font size
    const fontSizeInput = document.getElementById('fontSize');
    if (fontSizeInput) {
        fontSizeInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--font-size', e.target.value + 'px');
            localStorage.setItem('fontSize', e.target.value);
            const fontSizeValue = document.getElementById('fontSizeValue');
            if (fontSizeValue) fontSizeValue.textContent = e.target.value + 'px';
        });
    }
    // Line spacing
    const lineSpacingInput = document.getElementById('lineSpacing');
    if (lineSpacingInput) {
        lineSpacingInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--line-spacing', e.target.value);
            localStorage.setItem('lineSpacing', e.target.value);
            const lineSpacingValue = document.getElementById('lineSpacingValue');
            if (lineSpacingValue) lineSpacingValue.textContent = e.target.value;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applySettingsFromStorage();
    bindSettingsEvents();
});
