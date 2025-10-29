import { ReactElement, useState } from "react";

/**
 * Custom hook for tracking dark mode state and for toggling
 *
 * @returns {isDarkMode, toggleMode}
 */
export const useDarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};

export const ThemeProvider = ({
  darkMode,
  children,
}: {
  darkMode: boolean;
  children: ReactElement;
}) => {
  const darkModeClass = darkMode ? "dark" : "";
  return <div className={darkModeClass}>{children}</div>;
};
