import './App.css';
import NavBar from './Components/NavBar/NavBar';
import './DarkMode.css';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';
import Portfolio from './Pages/Portfolio/Portfolio';
import {Routes, Route} from 'react-router-dom';
import DetailedProject from './Components/DetailedProject/DetailedProject';
import AboutHeader from './Components/AboutLanding/AboutLanding';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';


export default function App() {

  const [dark, setDark] = useState(false);
  const [pageLoading, setPageLoading] = useState(true)
  const getDark = (value) => {
    setDark(value);
  }

  const handleLoading = (loading) => {
    if (!loading) {
      setTimeout(() => {
        setPageLoading(false);
      }, 2000)
    }
  }

  return (
      <>
          <header>
            <NavBar getDark = {getDark} />
          </header>
      <Routes>
          <Route path = "/" exact element = {<Home darkmode = {dark} />} />
          <Route path = "/portfolio" exact element = {<Portfolio darkmode = {dark} load={handleLoading}/>} />
          <Route path = "/portfolio/project/:id" exact element = {<DetailedProject darkmode = {dark} />} />
          <Route path = "/about" exact element = {<About />} />
          <Route path = "/contact" exact element = {<Contact />} />
      </Routes>
      <Footer loading = {pageLoading} />
    </>
  );
}
