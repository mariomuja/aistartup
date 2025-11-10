// i18n initialization and translation handling
(function() {
    // Supported languages
    const supportedLanguages = ['en', 'de', 'es', 'fr', 'it'];
    
    // Detect browser language
    function detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.substring(0, 2).toLowerCase();
        
        return {
            langCode: langCode,
            isSupported: supportedLanguages.includes(langCode)
        };
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
        
        if (savedLang && supportedLanguages.includes(savedLang)) {
            // User has manually selected a language - use it
            translatePage(savedLang);
            createLanguageSelector(savedLang);
        } else {
            // Auto-detect browser language
            const detected = detectLanguage();
            
            if (detected.isSupported) {
                // Browser language is supported - translate the page
                translatePage(detected.langCode);
                createLanguageSelector(detected.langCode);
            } else {
                // Browser language not supported - keep English but set lang attribute
                // This allows Chrome's automatic translation to work
                document.documentElement.setAttribute('lang', 'en');
                document.documentElement.setAttribute('data-browser-lang', detected.langCode);
                
                // Add meta tag to suggest translation to Chrome
                const meta = document.createElement('meta');
                meta.name = 'google';
                meta.content = 'notranslate';
                // We actually want translation, so we remove the notranslate after a moment
                // This trick helps Chrome detect the language mismatch
                document.head.appendChild(meta);
                setTimeout(() => {
                    meta.remove();
                }, 100);
                
                // Still show language selector with English selected
                createLanguageSelector('en');
            }
        }
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
                
                // Remove any Chrome translation meta tags
                const noTranslateMeta = document.querySelector('meta[name="google"][content="notranslate"]');
                if (noTranslateMeta) {
                    noTranslateMeta.remove();
                }
                
                // Apply our translation
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

