import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';

declare global {
  interface Window {
    mermaid: {
      initialize: (config: Record<string, unknown>) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
  }
}

// Module-level singleton state to prevent duplicate loading
let mermaidLoadPromise: Promise<void> | null = null;
let themeListenerAttached = false;
let idCounter = 0;

// Store original mermaid code for theme re-rendering (WeakMap to avoid memory leaks)
const diagramCodeMap = new WeakMap<HTMLElement, string>();

// Self-hosted Mermaid for security (no CDN trust required)
const MERMAID_SCRIPT_URL = '/mermaid.min.js';

/**
 * Loads Mermaid script once (singleton pattern).
 * Returns a promise that resolves when Mermaid is ready.
 */
function loadMermaid(): Promise<void> {
  if (mermaidLoadPromise) {
    return mermaidLoadPromise;
  }

  // Check if already loaded
  if (window.mermaid) {
    mermaidLoadPromise = Promise.resolve();
    return mermaidLoadPromise;
  }

  mermaidLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = MERMAID_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load Mermaid from ${MERMAID_SCRIPT_URL}`));
    document.head.appendChild(script);
  });

  return mermaidLoadPromise;
}

/**
 * Sanitizes SVG output from Mermaid to prevent XSS attacks.
 * Uses DOMPurify with SVG-specific configuration.
 */
function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['foreignObject'], // Mermaid uses foreignObject for text
    ADD_ATTR: ['dominant-baseline', 'text-anchor'], // SVG text attributes
  });
}

/**
 * Renders all mermaid diagrams on the page with the specified theme.
 */
async function renderDiagrams(theme: 'default' | 'dark'): Promise<void> {
  const mermaid = window.mermaid;
  if (!mermaid) return;

  mermaid.initialize({
    startOnLoad: false,
    theme: theme,
    securityLevel: 'strict',
  });

  const containers = document.querySelectorAll('.mermaid-diagram');

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i] as HTMLElement;

    // Store original code before first render, or retrieve it for re-renders
    let code = diagramCodeMap.get(container);
    if (!code) {
      code = container.textContent || '';
      diagramCodeMap.set(container, code);
    }

    if (!code) continue;

    // Use unique ID to avoid collisions
    const id = `mermaid-${++idCounter}`;

    try {
      const { svg } = await mermaid.render(id, code);
      // Sanitize SVG before inserting into DOM
      container.innerHTML = sanitizeSvg(svg);
      container.classList.add('mermaid-rendered');
      container.classList.remove('mermaid-error');
    } catch (error) {
      console.error('Mermaid render error:', error);
      container.classList.add('mermaid-error');
      container.classList.remove('mermaid-rendered');
      // Add accessible error message
      container.setAttribute('role', 'alert');
      container.setAttribute('aria-live', 'polite');
      container.textContent = 'Failed to render diagram';
    }
  }
}

/**
 * Sets up theme change listener (singleton - only attached once).
 */
function setupThemeListener(): void {
  if (themeListenerAttached) return;
  themeListenerAttached = true;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
    renderDiagrams(e.matches ? 'dark' : 'default');
  });
}

/**
 * Component that loads Mermaid and renders all .mermaid-diagram elements.
 * Supports light/dark themes based on system preference.
 * 
 * Uses self-hosted Mermaid bundle for security.
 * Sanitizes SVG output to prevent XSS.
 */
export default function MermaidDiagram(): null {
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    loadMermaid()
      .then(() => {
        setupThemeListener();
        return renderDiagrams(isDark ? 'dark' : 'default');
      })
      .catch((error) => {
        console.error('Mermaid load error:', error);
        // Mark all diagrams as errored
        const containers = document.querySelectorAll('.mermaid-diagram');
        containers.forEach((container) => {
          container.classList.add('mermaid-error');
          container.setAttribute('role', 'alert');
          (container as HTMLElement).textContent = 'Failed to load diagram library';
        });
      });

    // No cleanup needed - singleton pattern handles this
  }, []);

  // This component doesn't render anything visible - it just orchestrates
  return null;
}
