import './App.css';
import NavBar from './Components/NavBar/NavBar';
import './DarkMode.css';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import React, { useState, useEffect } from 'react';
import Portfolio from './Pages/Portfolio/Portfolio';
import {Routes, Route, Navigate, useLocation, useNavigate} from 'react-router-dom';
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
import ManageServices from './Pages/ManageServices/ManageServices';
import ManageCategories from './Pages/ManageCategories/ManageCategories';
import Shop from './Components/Shop/Shop';
import Appointment from './Components/Appointment/Appointment';
import ManageOrders from './Pages/ManageOrders/ManageOrders';
import axios from 'axios'
import proxy from './proxy.json'

export default function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const getDark = (value) => {
    setDark(value);
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRedirect = async () => {
    const path = location.pathname;
    let auth;
    if ((path.startsWith('/dashboard') || path.startsWith('/dashboard-actions'))) {
      const csrfResponse = await axios.get(`${proxy.proxy}/general_setting/get_csrf_token`);
      const csrfToken = csrfResponse.data.csrfToken; 
      const url = `${proxy.proxy}/general_setting/authentication_check/`;
      const headers = {
        'X-CSRFToken': csrfToken,
      };
      try {
        const data = localStorage.getItem('afh_uu_rierf')
        var response;
        if (data)
          response = await axios.post(url, {"token": data}, { headers });
        else
          response = await axios.post(url, {"token": "user_not_authenticated"}, { headers });
        if (!response.data["authenticated"]) {
          setIsAuthenticated(response.data["authenticated"])
          navigate('/login')
        } else {
          setIsAuthenticated(response.data["authenticated"])
        }
      } catch (error) {
        console.error(error);
      }
    }
    if ((path.startsWith('/dashboard') || path.startsWith('/dashboard-actions')) && isAuthenticated === false) {
      navigate('/login')
    }
  }

  useEffect(() => {
      handleRedirect()
  }, [location])

  return (
      <>
      <header>
        <NavBar getDark = {getDark} />
      </header>
      <Routes>
        <Route path="/" element={<Home darkmode={dark} />} />
        <Route path="/portfolio" element={<Portfolio darkmode={dark} />} />
        <Route path="/portfolio/:slug" element={<DetailedProject darkmode={dark} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />        
        <Route path="/make-an-appointment" element={<Appointment />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />
        <Route path="/services" element={<Shop />} />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<HomeDashboard  isAuthenticated={isAuthenticated} />} />
            <Route path="/dashboard-actions/manage-projects" element={<ManageProjects />} />
            <Route path="/dashboard-actions/manage-projects/create-project" element={<ProjectUploadForm />} />
            <Route path="/dashboard-actions/manage-projects/edit-project/:slug" element={<EditProject />} />
            <Route path="/dashboard-actions/manage-faqs" element={<ManageFAQ />} />
            <Route path="/dashboard-actions/manage-testimonials" element={<ManageTestimonials />} />
            <Route path="/dashboard-actions/view-reach-outs" element={<ViewReachOuts />} />
            <Route path="/dashboard-actions/manage-services" element={<ManageServices />} />
            <Route path="/dashboard-actions/manage-categories" element={<ManageCategories />} />
            <Route path="/dashboard-actions/manage-orders" element={<ManageOrders />} />
          </>
        ) : null }
      </Routes>
      <Footer isAuthenticated={isAuthenticated}/>
    </>
  );
}
