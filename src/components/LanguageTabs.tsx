import { useEffect } from 'react';

/**
 * Detects the user's preferred language based on browser settings.
 * Returns 'nl' for Dutch browsers, 'en' for all others.
 */
function getPreferredLanguage(): string {
  if (typeof navigator === 'undefined') return 'en';
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
  return browserLang.toLowerCase().startsWith('nl') ? 'nl' : 'en';
}

/**
 * Sets the active language for all lang-tabs on the page.
 * Synchronizes all tab groups to show the same language.
 */
function setActiveLanguage(lang: string): void {
  const containers = document.querySelectorAll('lang-tabs');
  
  containers.forEach((container) => {
    // Update toggle buttons
    const buttons = container.querySelectorAll('.lang-tabs-toggle button');
    buttons.forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update tab content visibility
    const tabs = container.querySelectorAll(':scope > tab');
    tabs.forEach((tab) => {
      const tabLang = tab.getAttribute('lang');
      if (tabLang === lang) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  });
}

/**
 * Initializes a single lang-tabs container by injecting toggle buttons.
 */
function initializeContainer(container: Element): void {
  // Check if already initialized
  if (container.querySelector('.lang-tabs-toggle')) return;

  // Find all tab children and extract their metadata
  const tabs = container.querySelectorAll(':scope > tab');
  if (tabs.length === 0) return;

  const tabsData: Array<{ lang: string; label: string }> = [];
  tabs.forEach((tab) => {
    const lang = tab.getAttribute('lang') || 'en';
    const label = tab.getAttribute('label') || lang.toUpperCase();
    tabsData.push({ lang, label });
  });

  // Create toggle container
  const toggleDiv = document.createElement('div');
  toggleDiv.className = 'lang-tabs-toggle';

  // Create buttons for each language
  tabsData.forEach(({ lang, label }) => {
    const button = document.createElement('button');
    button.setAttribute('data-lang', lang);
    button.textContent = label;
    button.addEventListener('click', () => {
      setActiveLanguage(lang);
    });
    toggleDiv.appendChild(button);
  });

  // Insert toggle at the beginning of the container
  container.insertBefore(toggleDiv, container.firstChild);
}

/**
 * Component that initializes language tabs functionality.
 * Finds all <lang-tabs> elements and adds interactive toggle buttons.
 * Detects browser language to set initial selection.
 * Synchronizes all tab groups on the page.
 * 
 * Similar pattern to MermaidDiagram.tsx - this is an orchestration component
 * that manipulates the DOM but renders nothing itself.
 */
export default function LanguageTabs(): null {
  useEffect(() => {
    // Find all lang-tabs containers
    const containers = document.querySelectorAll('lang-tabs');
    if (containers.length === 0) return;

    // Initialize each container with toggle buttons
    containers.forEach(initializeContainer);

    // Detect preferred language and set initial state
    const preferredLang = getPreferredLanguage();
    
    // Check if the preferred language exists in the tabs
    const firstContainer = containers[0];
    const availableLangs = Array.from(firstContainer.querySelectorAll(':scope > tab'))
      .map((tab) => tab.getAttribute('lang'));
    
    // Use preferred language if available, otherwise use first available
    const initialLang = availableLangs.includes(preferredLang) 
      ? preferredLang 
      : availableLangs[0] || 'en';

    setActiveLanguage(initialLang);
  }, []);

  return null;
}
