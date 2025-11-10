// i18n initialization and translation handling
(function() {
    // Detect browser language
    function detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.substring(0, 2).toLowerCase();
        
        // Supported languages
        const supportedLanguages = ['en', 'de', 'es', 'fr', 'it'];
        
        // Return supported language or default to English
        return supportedLanguages.includes(langCode) ? langCode : 'en';
    }

    // Get translation by path (e.g., "hero.title")
    function getTranslation(lang, path) {
        const keys = path.split('.');
        let value = translations[lang];
        
        for (const key of keys) {
            if (value && typeof value === 'object') {
                value = value[key];
            } else {
                return path; // Return path if translation not found
            }
        }
        
        return value || path;
    }

    // Translate all elements with data-i18n attribute
    function translatePage(lang) {
        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(lang, key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Translate elements with data-i18n-html attribute (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = getTranslation(lang, key);
            element.innerHTML = translation;
        });

        // Store current language
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('preferredLanguage', lang);
    }

    // Initialize translations when DOM is ready
    function init() {
        // Get language from localStorage or detect
        const savedLang = localStorage.getItem('preferredLanguage');
        const lang = savedLang || detectLanguage();
        
        // Translate the page
        translatePage(lang);
        
        // Add language selector if needed
        createLanguageSelector(lang);
    }

    // Create a simple language selector
    function createLanguageSelector(currentLang) {
        const nav = document.querySelector('.navbar-nav');
        if (!nav) return;

        const languageOptions = {
            'en': 'EN',
            'de': 'DE',
            'es': 'ES',
            'fr': 'FR',
            'it': 'IT'
        };

        const dropdown = document.createElement('li');
        dropdown.className = 'nav-item dropdown ms-lg-2';
        dropdown.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" 
               data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-globe"></i> ${languageOptions[currentLang]}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                ${Object.entries(languageOptions).map(([code, name]) => `
                    <li>
                        <a class="dropdown-item ${code === currentLang ? 'active' : ''}" 
                           href="#" data-lang="${code}">
                            ${name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;

        nav.appendChild(dropdown);

        // Add click handlers for language switching
        dropdown.querySelectorAll('[data-lang]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = e.target.getAttribute('data-lang');
                translatePage(newLang);
                
                // Update dropdown
                dropdown.querySelectorAll('.dropdown-item').forEach(item => {
                    item.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update button text
                dropdown.querySelector('.dropdown-toggle').innerHTML = 
                    `<i class="bi bi-globe"></i> ${languageOptions[newLang]}`;
            });
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

