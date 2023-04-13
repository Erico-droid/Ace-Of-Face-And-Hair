import './App.css';
import NavBar from './Components/NavBar/NavBar';
import './DarkMode.css';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Card from './shared/Card/Card'
import { useState } from 'react';

export default function App() {

  const [dark, setDark] = useState(false);

  const getDark = (value) => {
    setDark(value);
  }

  return (
    <div>
      <header>
        <NavBar getDark = {getDark} />
      </header>
      <Home darkmode = {dark} />
      <Footer />
    </div>
  );
}
