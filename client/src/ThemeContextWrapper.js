import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './Contexts/ThemeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.light);

  function changeTheme(theme) {
    // console.log(theme);
    setTheme(theme);
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
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}