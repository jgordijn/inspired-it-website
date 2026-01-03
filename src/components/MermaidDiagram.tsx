import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    mermaid: {
      initialize: (config: Record<string, unknown>) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
  }
}

// Store original mermaid code for theme re-rendering
const diagramCodeMap = new Map<HTMLElement, string>();

// Pinned Mermaid version for stability
const MERMAID_CDN_URL = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.3/dist/mermaid.min.js';

/**
 * Component that loads Mermaid from CDN and renders all .mermaid-diagram elements.
 * Supports light/dark themes based on system preference.
 */
export default function MermaidDiagram() {
  const loadedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Prevent double-loading in strict mode
    if (loadedRef.current) return;
    loadedRef.current = true;

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const renderDiagrams = async (theme: 'default' | 'dark') => {
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
        
        const id = `mermaid-${Date.now()}-${i}`;
        
        try {
          const { svg } = await mermaid.render(id, code);
          container.innerHTML = svg;
          container.classList.add('mermaid-rendered');
          container.classList.remove('mermaid-error');
        } catch (error) {
          console.error('Mermaid render error:', error);
          container.classList.add('mermaid-error');
          container.classList.remove('mermaid-rendered');
        }
      }
    };

    // Load Mermaid from CDN
    const script = document.createElement('script');
    script.src = MERMAID_CDN_URL;
    script.async = true;
    
    script.onload = () => {
      renderDiagrams(isDark ? 'dark' : 'default');
    };
    
    script.onerror = () => {
      console.error('Failed to load Mermaid from CDN:', MERMAID_CDN_URL);
      // Mark all diagrams as errored
      const containers = document.querySelectorAll('.mermaid-diagram');
      containers.forEach((container) => {
        container.classList.add('mermaid-error');
      });
    };
    
    document.head.appendChild(script);
    scriptRef.current = script;

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      // Re-render all diagrams with new theme
      renderDiagrams(e.matches ? 'dark' : 'default');
    };
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  // This component doesn't render anything visible - it just orchestrates
  return null;
}
