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
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';


export default function NavBar(props) {
	const [checked, setChecked] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = React.useState({open: false,Transition: Slide,});

	function SlideTransition(props) {
		return <Slide {...props} direction="up" />;
	}

	const handleClose = () => {
		setOpen({
		  ...open,
		  open: false,
		});
	};

	const handleChange = (event, Transition) => {
		setChecked(event.target.checked);
		// changeTheme(checked ? themes.dark : themes.light);
		setOpen({
			open: true,
			Transition,
		});
		props.getDark(!checked);
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
						onChange={(evt, SlideTransition) => {
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
		        	<li className="nav-item"><NavLink to="/" className = "nav-link" activeclassname="active">Home</NavLink></li>
		        	<li className="nav-item"><NavLink to="/portfolio" className = "nav-link" activeclassname="active">Portfolio</NavLink></li>
		        	<li className="nav-item"><NavLink to="/about" className="nav-link">About</NavLink></li>
		        	<li className="nav-item"><a href="#" className="nav-link">Blog</a></li>
		          <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
		        </ul>
		      </div>
		    </div>
		  </nav>
		  <Snackbar
				open={open.open}
				onClose={handleClose}
				TransitionComponent={open.Transition}
				message={checked ?  "Dark Mode Activated." : "Light Mode Activated"}
				key={Math.random()}
				autoHideDuration={2000}
				action = {
					<React.Fragment>
					<IconButton
					aria-label="close"
					color="inherit"
					sx={{ p: 0.5 }}
					onClick={handleClose}
					>
					<CloseIcon />
					</IconButton>
				</React.Fragment>
				}
			/>
		  </> 
		  }
  </div>
	</section>
    </>
  )
}
