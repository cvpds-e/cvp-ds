import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check localStorage and system preference on mount
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Apply theme to both html and body for maximum compatibility
    if (initialTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
    }
    
    console.log('Initial theme applied:', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Apply theme to both html and body
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', newTheme);
    console.log('Theme toggled to:', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-switcher"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="theme-switcher__icon-container">
        <Sun 
          className={`theme-switcher__icon theme-switcher__icon--sun ${theme === 'light' ? 'theme-switcher__icon--active' : ''}`}
          size={16}
        />
        <Moon 
          className={`theme-switcher__icon theme-switcher__icon--moon ${theme === 'dark' ? 'theme-switcher__icon--active' : ''}`}
          size={16}
        />
      </div>
    </button>
  );
};