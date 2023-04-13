import './App.css';
import NavBar from './Components/NavBar/NavBar';
import './DarkMode.css';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';
import Portfolio from './Pages/Portfolio/Portfolio';
import {Router, Routes, Route, Link, NavLink} from 'react-router-dom';


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
      <Routes>
          <Route path = "/" exact element = {<Home darkmode = {dark} />} />
          <Route path = "/portfolio" exact element = {<Portfolio darkmode = {dark} />} />
      </Routes>
      <Footer />
    </div>
  );
}
