import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as Theme) || 'system';
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function applyTheme(theme: Theme): void {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const cycleTheme = () => {
    const resolved = resolveTheme(theme);
    let next: Theme;

    if (theme === 'system') {
      // First click: switch to opposite of current system preference
      next = resolved === 'dark' ? 'light' : 'dark';
    } else {
      // Already explicit: go back to system
      next = 'system';
    }

    setTheme(next);
    applyTheme(next);

    if (next === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', next);
    }
  };

  // Prevent hydration mismatch - render nothing until mounted
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const resolved = resolveTheme(theme);
  const isSystem = theme === 'system';

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-lg text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Theme: ${isSystem ? 'system' : theme}. Click to ${isSystem ? 'switch to ' + (resolved === 'dark' ? 'light' : 'dark') : 'use system theme'}.`}
      title={isSystem ? `System (${resolved})` : theme.charAt(0).toUpperCase() + theme.slice(1)}
    >
      {resolved === 'dark' ? (
        // Sun icon - shown in dark mode (click to go light)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        // Moon icon - shown in light mode (click to go dark)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
      {/* Small dot indicator when using system theme */}
      {isSystem && (
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
      )}
    </button>
  );
}
