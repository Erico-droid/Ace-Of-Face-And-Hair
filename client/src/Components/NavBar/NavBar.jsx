import React, {useState, useRef} from 'react';
import './NavBar.css';
import WidgetsSharpIcon from '@mui/icons-material/WidgetsSharp';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Placeholder from './Placeholder';
import FadeIn from "react-fade-in";
import logo from '../../Assets/aofah.png';
import { ThemeContext, themes } from '../../Contexts/ThemeContext'
import Card from '../../shared/Card/Card';

export default function NavBar() {
	const [checked, setChecked] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const handleChange = (event) => {
		setChecked(event.target.checked);
		// changeTheme(checked ? themes.dark : themes.light);
	};
	
	const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <>
    <section className="ftco-section">
		<div className="container-fluid container-fluid-sm">
			{loading ?
			<>
			<div style={{ width: "100%"}}>
				<Placeholder viewBox={windowSize.current[0] < 685 ? "0 0 540 100" : "0 0 1000 100"}/>
			</div>
			</> :
			<>
			<nav className="ftco-navbar-light navbar navbar-expand-lg ftco_navbar" id="ftco-navbar">
		    <div className="container-md container-lg container-xl container-fluid">
				<span className="spanLogo"><img src={logo} className="imglogo" alt="Ace of Face and Hair Logo" /></span>
		    	<a className="navbar-brand" href="index.html">ace of face and hair</a>
		    	<div className="social-media order-lg-last darkmode-place">
		    		<p className="mb-0 d-flex">
		    			<span className="d-flex align-items-center justify-content-center">{checked ? <DarkModeIcon /> : <LightModeIcon />}</span>
		    			<ThemeContext.Consumer>
							{({ changeTheme }) => (
						<Switch
						checked={checked}
						onChange={(evt) => {
							handleChange(evt);
							changeTheme(!checked ? themes.dark : themes.light);
						}}
						inputProps={{ 'aria-label': 'controlled' }}
						/>
						)}
						</ThemeContext.Consumer>
		    		</p>
	        </div>
		      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
		        <span>{<WidgetsSharpIcon/>}</span>
		      </button>
		      <div className="collapse navbar-collapse" id="ftco-nav">
		        <ul className="navbar-nav ml-auto mr-md-3">
		        	<li className="nav-item active"><a href="#" className="nav-link">Home</a></li>
		        	<li className="nav-item"><a href="#" className="nav-link">About</a></li>
		        	<li className="nav-item"><a href="#" className="nav-link">Work</a></li>
		        	<li className="nav-item"><a href="#" className="nav-link">Blog</a></li>
		          <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
		        </ul>
		      </div>
		    </div>
		  </nav>
		  </> 
		  }
  </div>
	</section>
    </>
  )
}
