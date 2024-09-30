document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
    }

    function updateToggleButton(theme) {
        const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        
        themeToggle.innerHTML = theme === 'theme-dark' ? sunIcon : moonIcon;
        themeToggle.setAttribute('aria-label', theme === 'theme-dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }

    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDarkScheme.matches ? 'theme-dark' : 'theme-light');
    }

    // Add event listener to the theme toggle button
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.className;
        const newTheme = currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark';
        setTheme(newTheme);
    });

    // Listen for changes in system theme preference
    prefersDarkScheme.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'theme-dark' : 'theme-light');
        }
    });
});