import './App.css';
import NavBar from './Components/NavBar/NavBar';
import './DarkMode.css';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import Card from './shared/Card/Card'

export default function App() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Home />
      <Footer />
    </div>
  );
}
