import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './Contexts/ThemeContext';
import handleUserSession from './sessionID';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }

  const handleDarkMode = async () => {
    const dark_mode = await handleUserSession()
    if (dark_mode.dark_mode === true)
      setTheme(themes.dark)
    else
      setTheme(themes.light)
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.remove('dark-content');
        break;
      case themes.dark:
        document.body.classList.add('dark-content');
        break;
      default:
        document.body.classList.remove('dark-content');
        break;
    }
    handleDarkMode()
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}