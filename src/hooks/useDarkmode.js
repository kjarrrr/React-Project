import { useState } from "react";

export function UseDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(prev => !prev);
  };

  return { darkMode, toggleDarkMode };
}