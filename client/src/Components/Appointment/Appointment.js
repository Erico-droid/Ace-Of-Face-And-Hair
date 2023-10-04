import React, {useState, useEffect} from 'react'
import './Appointment.css'
import proxy from '../../proxy.json'
import axios from 'axios'
import lwanda from '../../Assets/5.jpg'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import shopIcon from '@mui/icons-material/Shop';
import Seo from '../Seo/Seo'

export default function Appointment() {
    const [services, setServices] = useState([])
    const [showing, setShowing] = useState(0)
    const [selectedServices, setSelectedServices] = useState([])
    const [location, setLocation] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: '',
        additionalNotes: '',
        date: ''
      });
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("info")    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackTime, setSnackTime] = useState(3000)

    const getServices = async () => {
        const url = `${proxy.proxy}/services/get_sub_services/`
        const response = await axios.get(url)
        setServices(response.data.data)
        setShowing(response.data.data.length)
    }

    const handleService = (evt) => {
        let value = evt.target.checked
        let slug = evt.target.getAttribute("id")
        if (value === true) {
            setSelectedServices(
                [...selectedServices, slug]
            )
        } else {
            var servicesArr = selectedServices;
            for (let i = 0; i < servicesArr.length; i++) {
                if (slug === servicesArr[i])
                    console.log(servicesArr.splice(i,1))
            }
            setSelectedServices([...servicesArr])
        }
    }

    const uncheckAll = () => {
        const servicesContainer = document.getElementById("servicesId");
        const children = servicesContainer.children
        for (let i = 0; i < children.length; i++) {
            const input = children[i].querySelector('input')
            if (input.checked) {
                input.checked = false
            }
        }
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleSnackbarOpen = () => {
        setOpenSnackbar(true)
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleLocation = (evt) => {
        let fd;
        if (evt.target.getAttribute("value") === "shop") {
            fd = {...formData, location: "shop"}
            setFormData(fd)
            setLocation(false)
        } else {
            fd = {...formData, location: ""}
            setFormData(fd)
            setLocation(true)
        }
    }

    const validateForm = () => {
        for (var field in formData) {
            if (field !== "additionalNotes" && formData[field].length === 0) {
                setMessage(`${field} input is not filled.`)
                setSeverity("info")
                handleSnackbarOpen()
                return false
            }
        }  
        return true      
    }

    const handleSubmit = async (event) => {        
        event.preventDefault()
        if (validateForm()) {
            let fd = formData;
            fd["selectedServices"] = selectedServices;
            const url = `${proxy.proxy}/services/create_order/`
            const response = await axios.post(url, fd)
            if (response.status === 200) {
                setMessage(response.data.message)
                setSeverity("success")
                setSnackTime(null)
                handleSnackbarOpen()
                document.getElementById("appointmentForm").reset()
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    location: '',
                    additionalNotes: '',
                    date: ''
                })
                setSelectedServices([])
                uncheckAll()
            } else {
                setMessage("There was an unexpected error.")
                setSeverity("info")
                setSnackTime(null)
            }
        }
    }

    useEffect(() => {
        getServices()
    }, [])

  return (
    <div className='container'>
        <Seo title="Make An Appointment" description="You can make an appointment on our site and our team will contact you as quick as possible to make arrangements." />
        <Snackbar
        open={openSnackbar}
        autoHideDuration={snackTime}
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
        <div className='map-text'>
            <h3>Make An Appointment</h3>
        </div>
        {services.length > 0 ? 
        <div className='main-area'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='header'>
                            <h6>Select the services you need</h6>
                            <h6>Showing {showing} Services</h6>
                        </div>
                        <div className='card  tropical'>
                            <div className='container-fluid' id = 'servicesId'>
                                {services.map((Service) => {return (
                                <div className='ind-service' key={Service.slug}>
                                    <input className="checkbox-tools" type="checkbox" name="tools" id={Service.slug} onChange={handleService}/>
                                    <label className="for-checkbox-tools" htmlFor={Service.slug}>
                                    <div className='service-descriptions'>
                                        <p>{Service.name}</p>
                                        <span>{Service.sub_service_description}</span>
                                    </div>
                                    <img src={proxy.proxy + Service.image} alt = ''/>                                    
                                </label>
                                </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
                {selectedServices.length === 0 ?
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='selected-services text-center' style={{padding: "10px"}}>
                            <p>Select a service to proceed.</p>
                        </div>
                    </div>
                </div> :
                <div className='col-md-6'>
                    <div className='card'>
                    <div className="formbold-main-wrapper">
                <div className="formbold-form-wrapper card">
                <form className= "formbold-form" id = "appointmentForm">
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="formbold-mb-5">
                                <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="formbold-form-input"
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="formbold-mb-5">
                                <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="formbold-form-input"
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="formbold-mb-5">
                                <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email"
                                className="formbold-form-input"
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="formbold-mb-5">
                                <input
                                type="phone"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="formbold-form-input"
                                />
                            </div>
                        </div>
                        <label>Location: </label>
                        <div className="cst-bns">                            
                                <input className="checkbox-tools" type="radio" name="tools" id="tool-1" />
                                <label className="for-checkbox-tools" htmlFor="tool-1" onClick={handleLocation}  value="shop">
                                  <span className="material-symbols-outlined">
                                    {/* <shopIcon /> */}
                                  </span><br />
                                  Our shop
                                </label>
                                <input className="checkbox-tools" type="radio" name="tools" id="tool-2" onChange={handleLocation} value="on-site"/>
                                <label className="for-checkbox-tools" htmlFor="tool-2" ng-model = "existingTenant">
                                    <span className="material-symbols-outlined">
                                    person
                                  </span><br />
                                    Your location
                                </label>
                              </div>
                        {location ?
                        <div className="formbold-mb-5">
                            <label>Enter the address: </label>
                                <input
                                type="text"
                                name="location"
                                id="address"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Address"
                                className="formbold-form-input"
                                />
                        </div>: null }
                        <div className="formbold-mb-5">
                            <label>Date of Appointment: </label>
                                <input
                                name="date"
                                id="date"
                                type='date'
                                value={formData.date}
                                onChange={handleChange}
                                className="formbold-form-input"
                                />
                        </div>
                        <div className="formbold-mb-5">
                            <label>Any additional notes? </label>
                                <textarea
                                rows={5}
                                cols={100}
                                name="additionalNotes"
                                id="notes"
                                value={formData.additionalNotes}
                                onChange={handleChange}
                                className="formbold-form-input"
                                />
                        </div>
                    </div>
                    <div className='text-right'>
                        <button className="btn btn-prim" onClick={handleSubmit}>Submit appointment</button>
                    </div>
                </form>
                </div>
                </div>
                </div>
                </div>
                }
            </div>
        </div> :
        <div className='text-center' style={{marginBottom: "100px", marginTop: "50px"}}>
            <p>There aren't any services at the moment.</p>
        </div>
        }
    </div>
  )
}
