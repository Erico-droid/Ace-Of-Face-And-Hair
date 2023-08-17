import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GradeIcon from '@mui/icons-material/Grade';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import wPlaceholder from '../../Assets/wpHolder.png';
import bPlaceholder from '../../Assets/blackpHolder.png';
import axios from 'axios'
import proxy from '../../proxy.json'

export default function DashboardAside() {

  const [darkMode, setDarkMode] = useState(false);

  const handlePlaceHolder = () => {
    const body = document.querySelector("body");
    let bodyClass = body.classList;
    if (bodyClass.contains("dark-content")) {
      setDarkMode(true);
    } else {
      setDarkMode(false)
    }
  }

  const authenticatedCheck = async () => {
    const response = await axios.get(`${proxy.proxy}/general_setting/authentication_check/`);
    console.log(response)
  }

  useEffect (() =>{
    handlePlaceHolder();
    authenticatedCheck()
  }, [handlePlaceHolder])

  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-1 cursor-pointer text-black opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a className="navbar-brand m-0 text-center" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
        {darkMode ? <img src={wPlaceholder}></img> : <img src={bPlaceholder}></img>}
        <span className="font-weight-bold text-black" style={{marginLeft: "20px"}}>What's up, Guy.</span>
      </a>
    </div>
    <hr className="horizontal light mt-0 mb-2"></hr>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link text-black" to = "/dashboard">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className='icon-black'><DashboardIcon /></i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black" to = "/dashboard-actions/manage-projects">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
            <i ><AccountTreeIcon /></i>
            </div>
            <span className="nav-link-text ms-1">Manage Projects</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black " to = "/dashboard-actions/manage-faqs">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><QuestionAnswerIcon/></i>
            </div>
            <span className="nav-link-text ms-1">Manage Faq`s</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black " to = "/dashboard-actions/manage-testimonials">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><QuestionAnswerIcon/></i>
            </div>
            <span className="nav-link-text ms-1">Manage Testimonials</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black " to = "/dashboard-actions/view-reach-outs">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><QuestionAnswerIcon/></i>
            </div>
            <span className="nav-link-text ms-1">View Reach Outs</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link text-black " href="../pages/virtual-reality.html">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><GradeIcon /></i>
            </div>
            <span className="nav-link-text ms-1">Manage Orders</span>
          </a>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black " to="/dashboard-actions/manage-categories">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><DesignServicesIcon/></i>
            </div>
            <span className="nav-link-text ms-1">Manage Categories</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-black " to="/dashboard-actions/manage-services">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><DesignServicesIcon/></i>
            </div>
            <span className="nav-link-text ms-1">Manage Services</span>
          </NavLink>
        </li>
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-8">Accounts </h6>
        </li>
        <li className="nav-item">
          <a className="nav-link text-black " href="../pages/notifications.html">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><AccountCircleIcon/></i>
            </div>
            <span className="nav-link-text ms-1">Manage Users</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-black " href="../pages/notifications.html">
            <div className="text-black text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10"><LogoutIcon /></i>
            </div>
            <span className="nav-link-text ms-1">Log out</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
  )
}
