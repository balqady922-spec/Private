import { useEffect } from 'react';

export const useDarkMode = (isDarkMode: boolean) => {
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);
};
