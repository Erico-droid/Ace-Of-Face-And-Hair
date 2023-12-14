import React, {useState, useRef, useEffect} from 'react';
import './NavBar.css';
import WidgetsSharpIcon from '@mui/icons-material/WidgetsSharp';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Placeholder from './Placeholder';
import FadeIn from "react-fade-in";
import logo from '../../Assets/aofah.png';
import { ThemeContext, themes } from '../../Contexts/ThemeContext'
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Heading from "../../shared/Heading/Heading"
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import source from "../../proxy.json"
import handleUserSession from '../../sessionID'


export default function NavBar(props) {
	const [checked, setChecked] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [open, setOpen] = useState({open: false,Transition: Slide});
	const [scrollPosition, setScrollPosition] = useState(0);
	const [pathName, setPathName] = useState("")

	function SlideTransition(props) {
		return <Slide {...props} direction="up" />;
	}

	const submitDarkModeState = async (darkmode) => {
		// get the session and the url
		let sessionId = localStorage.getItem('sessionID');
		const url =  `${source.proxy}/general_setting/`
		try {
			const response = await axios.get(`${source.proxy}/general_setting/get_csrf_token/`);
			const token = response.data.csrfToken;
			const data = {
				user_session: sessionId,
				dark_mode: darkmode
			}
			const headers = {
				'X-CSRFToken': token,
				'Content-Type': 'application/json',
			};		
			let resp = await axios.post(url, data, { headers });
		}
		catch(error) {
			console.error(error)
		}
	}

	let location = useLocation()

	const handleClose = () => {
		setOpen({
		  ...open,
		  open: false,
		});
	};

	(() => {
		window.addEventListener("scroll", (evt) => {
			setScrollPosition(window.scrollY)
		})
	})(); 	  

	const handleChange = (event, Transition) => {
		setChecked(event.target.checked);
		setOpen({
			open: true,
			Transition: Slide,
		});
		props.getDark(!checked);
		if (checked === false) var darkMode = true
		else {
			darkMode = false
		}
		submitDarkModeState(darkMode)
	};

	
	const windowSize = useRef([window.innerWidth, window.innerHeight]);

	const handleStart = async () => {
		let startData = await handleUserSession();
		setChecked(startData.dark_mode)
	}
	
	let isDropdownOpen = false
	const handleDropdown = () => {
		const toggler = document.querySelector(".navbar-toggler");		
		const dropdown = document.getElementById("ftco-nav")
		if (!isDropdownOpen) {
			dropdown.classList.add("show")
			isDropdownOpen = true
		} else {
			dropdown.classList.remove("show")
			isDropdownOpen = false
		}
	}

	const listenForClick = () => {
		const nav = document.getElementById('ftco-nav')
		if (nav) {
			nav.addEventListener('click', (evt) => {
				let element = evt.target;
				while (element.tagName !== 'LI') {
					element = element.parentNode
				}				
				nav.classList.remove("show")
				isDropdownOpen = false
			})
		}
	}

	useEffect(() => {
		setPathName(location.pathname)
		handleStart()
		listenForClick()
	}, [location])



  return (
    <>
    <section className="ftco-section" style={scrollPosition <= 500 ? { position: "relative", transition: "position .3s ease", transitionDelay: ".3s"} : { position: "fixed",transition: "position .3s ease", transitionDelay: ".3s" }}>
		<div className="container-fluid container-fluid-sm">
			{loading ?
			<>
			<div style={{ width: "100%"}}>
				<Placeholder viewBox={windowSize.current[0] < 685 ? "0 0 540 100" : "0 0 1000 50"}/>
			</div>
			</> :
			<FadeIn>
			<nav className="ftco-navbar-light navbar navbar-expand-lg ftco_navbar" id="ftco-navbar">
		    <div className="container-md container-lg container-xl container-fluid">
				<span className="spanLogo">
					{ pathName === "/" && windowSize.current[0] > 1000 ? scrollPosition <= 200 ? <h3 className = "wordheading text-right mt-md-3" >Ace Of Face And Hair</h3> : <img src={logo} className="imglogo" alt="Ace of Face and Hair Logo" /> : <img src={logo} className="imglogo" alt="Ace of Face and Hair Logo" /> }
				</span>
				<div className='icons-place icons-place-mobile'>
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
									inputProps={{ 'aria-label': 'controlled', 'id' : 'dark_mode' }}
									/>
						)}
						</ThemeContext.Consumer>
		    		</p>
	        </div>
		      <a onClick={handleDropdown} style={{width:"30px", height: "30px"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
		        <span>{<WidgetsSharpIcon/>}</span>
		      </a>
			  </div>
		    	{/* <a className="navbar-brand" href="index.html">ace of face and hair</a> */}
		    	
		      <div className="collapse navbar-collapse" id="ftco-nav">
		        <ul className="navbar-nav ml-auto mr-md-3">
		        	<li className="nav-item"><NavLink to="/" className = "nav-link" activeclassname="active">Home</NavLink></li>
		        	<li className="nav-item"><NavLink to="/portfolio" className = "nav-link" activeclassname="active">Portfolio</NavLink></li>
		        	<li className="nav-item"><NavLink to="/about" className="nav-link" activeclassname="active">About</NavLink></li>
		        	<li className="nav-item"><NavLink to="/services"  className="nav-link">Services</NavLink></li>
		          <li className="nav-item"><NavLink to="/contact" className="nav-link" activeclassname="active">Contact</NavLink></li>
		        </ul>
		      </div>
			  <div className='icons-place icons-place-desktop'>
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
									inputProps={{ 'aria-label': 'controlled', 'id' : 'dark_mode' }}
									/>
						)}
						</ThemeContext.Consumer>
		    		</p>
	        </div>
		      <a onClick={handleDropdown} style={{width:"30px", height: "30px"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
		        <span>{<WidgetsSharpIcon/>}</span>
		      </a>
			  </div>
		    </div>
		  </nav>
		  <Snackbar
				open={open.open}
				onClose={handleClose}
				TransitionComponent={open.Transition}
				message={checked ?  "Dark Mode Activated." : "Light Mode Activated"}
				key={open ? "abracdabra-light" : "abracdabra-dark"}
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
		  </FadeIn> 
		  }
  </div>
	</section>
    </>
  )
}
