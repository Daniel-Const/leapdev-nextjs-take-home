import { useEffect } from "react";
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
