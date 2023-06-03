import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './Contexts/ThemeContext';
import axios from 'axios';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.light);

  function changeTheme(theme) {
    setTheme(theme);
  }

  const handleUserSession =async () => {
    let darkmodePlace = document.querySelector(".darkmode-place");
    window.onload = async () => {
      darkmodePlace.style.display= "block"
      let response = await axios.get(`/general_setting/`)
      if (response.data['dark_mode'] === true) {
        setTheme(themes.dark)
      }
      else {
        console.log(response.data['dark_mode'])
        setTheme(themes.Light)
      }
    }
	}

  useEffect(() => {
    console.log(ThemeContext)
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
    handleUserSession()
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}