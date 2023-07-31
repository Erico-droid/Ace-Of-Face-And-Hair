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
import Login from './Pages/Login/Login';
import HomeDashboard from './Pages/HomeDashboard/HomeDashboard';
import ManageProjects from './Pages/ManageProjects/ManageProjects';
import ProjectUploadForm from './Components/ProjectUploadForm/ProjectUploadForm';
import ManageFAQ from './Pages/ManageFAQ/ManageFAQ';
import EditProject from './Pages/EditProject/EditProject';
import ManageTestimonials from './Pages/ManageTestimonials/ManageTestimonials';
import ViewReachOuts from './Pages/ViewReachOuts/ViewReachOuts';

export default function App() {

  const [dark, setDark] = useState(false);
  const getDark = (value) => {
    setDark(value);
  }

  return (
      <>
          <header>
            <NavBar getDark = {getDark} />
          </header>
      <Routes>
          <Route path = "/" exact element = {<Home darkmode = {dark} />} />
          <Route path = "/portfolio" exact element = {<Portfolio darkmode = {dark} />} />
          <Route path = "/portfolio/:slug" exact element = {<DetailedProject darkmode = {dark} />} />
          <Route path = "/about" exact element = {<About />} />
          <Route path = "/contact" exact element = {<Contact />} />
          <Route path = "/login" exact element = {<Login />} />
          <Route path='/dashboard' exact element = {<HomeDashboard />} />
          <Route path='/dashboard-actions/manage-projects' exact element = {<ManageProjects />} />
          <Route path='/dashboard-actions/manage-projects/create-project' exact element = {<ProjectUploadForm />} />
          <Route path='/dashboard-actions/manage-projects/edit-project/:slug' exact element = {<EditProject />} />
          <Route path='/dashboard-actions/manage-faqs' exact element = {<ManageFAQ />} />
          <Route path='/dashboard-actions/manage-testimonials' exact element = {<ManageTestimonials />} />
          <Route path='/dashboard-actions/view-reach-outs' exact element = {<ViewReachOuts />} />
      </Routes>
      <Footer/>
    </>
  );
}
