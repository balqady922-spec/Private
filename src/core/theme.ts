/**
 * Custom Theme System Colors and Configuration
 */

export const THEME_COLORS = {
  primary: '#0B251C', // Deep Green
  accent: '#D4AF37', // Gold Amber
  background: '#F8F9FA', // Off-white
  text: '#212529', // Charcoal
  success: '#1E7E34', // Emerald Green Accent
  danger: '#DC2626', // Crimson Red
  warning: '#B45309', // Dark Amber
};

export const getThemeClass = (isDarkMode: boolean) => {
  return isDarkMode ? 'dark' : 'light';
};
