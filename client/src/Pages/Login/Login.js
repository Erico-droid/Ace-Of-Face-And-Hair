import React, { useEffect, useState } from 'react'
import "./Login.css"
import Button from '../../shared/Button/Button'
import AceLogo from "../../Assets/aofahcute.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios'
import source from '../../proxy.json'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

export default function Login(props) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("info")

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleSnackbarOpen = () => {
        setOpenSnackbar(true)
    }

    const handleLogin = async (data) => {
        data = JSON.stringify(data)
          const csrf = await axios.get(`${source.proxy}/general_setting/get_csrf_token`);
		  const csrfToken = csrf.data.csrfToken;
		  const headers = {
			'X-CSRFToken': csrfToken,
			'Content-Type': 'application/json',
		  };
        const response = await axios.post(`${source.proxy}/general_setting/login/`, data, {headers})
        if (response.status === 200 && response.data.message !== 'Invalid Credentials') {
            setMessage("You have been logged in successfuly.")
            setSeverity("success")
            setOpenSnackbar(true)
            localStorage.setItem('afh_uu_rierf', response.data["afh_uu_rierf"]);
            props.setIsAuthenticated(true)
            localStorage.setItem('loginSuccessMessageShown', false);
        } else {
            setMessage("Wrong username/password.")
            setSeverity("error")
            setOpenSnackbar(true)
        }
    }


    useEffect(() => {
        document.getElementById("loginForm").addEventListener('submit', (event) => {
            event.preventDefault()
            let username = document.querySelector(".username-input").value
            let password = document.querySelector(".password-input").value
            const formData = {
                username, password
            }
            handleLogin(formData)
        })
    }, [])

  return (

    <div className="page">
        <Snackbar
            open={openSnackbar}
            autoHideDuration={null}
            onClose={handleSnackbarClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={severity} // Can be "success", "error", "warning", or "info"
            >
                {message}
            </MuiAlert>
            </Snackbar>
        <div className='container-fluid'>
    <div className="login-row row">
        <div className="col-sm-8 text-center signin card">
        
        <div className='heading-group-wording text-center login-heading'>
                    <h3 className = "wordheading">Sign In to Ace of face and hair</h3>
                </div>
    
        <form className='loginform' id = "loginForm">
    
            <input type="text" className="username-input form-control mb-4"  placeholder={"Username"} style={{fontFamily:"Arial, FontAwesome"}} />
    
            <input type="password" className="password-input form-control mb-4" placeholder={"Password"} style={{fontFamily:"Arial, FontAwesome"}} />
    
            <Button btn = {"sec"} >Sign In</Button>
    
        </form>
    
        </div>
        <div className="col-sm-4 signup text-center">
            <img src={AceLogo} alt='Ace Of Face And Hair Logo' />
        </div>
    </div>
    </div>
    </div>
  )
}
