import React, {useEffect, useState } from 'react'
import "./ContactForm.css"
import Button from '../../shared/Button/Button'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios'
import source from '../../proxy.json'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

export default function ContactForm() {

    const [firstNameError, setFirstNameError] = useState(true)
    const [lastNameError, setLastNameError] = useState(true)
    const [emailError, setEmailError] = useState(true)
    const [phoneError, setPhoneError] = useState(true)
    const [messageError, setMessageError] = useState(true)
    const [btnActive, setBtnActive] = useState(false);
    const [inputArray, setInputArray] = useState([])
    const [faqs, setFaqs] = useState([])
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState("info")    

    //use a array to push each form input being touched by the user at first the check if it is contained in there. If not do not put anything in the form inputs.

    const getFaqs = async () => {
      let response = await axios.get(`${source.proxy}/general_setting/frequently_asked_questions/`)
      response = response.data
      setFaqs(response)
    }

    const handleSnackbarOpen = () => {
      setSnackbarOpen(true)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      if (!btnActive) {
          setMessage("Finish filling your contact form.")
          setSeverity("warning")
          handleSnackbarOpen()
        }
        else {        
        const url = `${source.proxy}/general_setting/create_reach_out/`;
        const data = {
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "phone": phone,
          "message": message
        }

        const response = await axios.post(url, data)
        if (response.status === 200){
          setSeverity("success")
          document.getElementById("contactForm").reset()
          setFirstName("")
          setLastName("")
          setEmail("")
          setPhone("")
          setFirstNameError(null)
          setMessage("Thank you for reaching out. Our team will get back to you shortly.")
          handleSnackbarOpen()
        }
      }
    }


    const handleAccordion = () => {
      let accordion = document.querySelector("section .accordion");
      let targetId;
      if (accordion) {
        accordion.addEventListener('click', (evt) => {
            evt.preventDefault();
            let target = (evt.target);
            for (var i = 0; i < accordion.children.length; i++) {
                if (accordion.children[i].contains(target))
                    var targetChild = accordion.children[i];
            }
            targetId = targetChild.getAttribute("id");
            window.location.hash = targetId;
        })
      }
    }

    useEffect(() => {
        (() => {
            handleAccordion()
            getFaqs()
        })()
        
        //check form inputs
        const checkFormInputs = () => {
          //validate names
          function validateName (name) {
            if (name < 2) return false;
            else return true;
          }
    
          //validate email addrss logic
          const validateEmail = (email) => {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            
            // Check if the email matches the pattern
            if (!emailRegex.test(email)) return false;
            const atIndex = email.indexOf("@");
    
            // Check if there is exactly one "@" symbol
            if (atIndex === -1 || email.indexOf("@", atIndex + 1) !== -1) {
              return false;
            }
          
            return true;
         }
    
    
         const validateMessage = (message) => {
            if (message.length < 5) return false;
            else return true;
         }
    
         //validate phone number logic.
         const validatePhone = (phoneNumber) => {
            const cleanedNumber = phoneNumber.replace(/\D/g, "");
            // Check if the cleaned number starts with "+254" or "0"
    
            if (!/^(\+254|0)/.test(cleanedNumber) && !/^254/.test(cleanedNumber)) {
              return false;
            }
            // Check the length of the cleaned number based on the prefix
            const length = cleanedNumber.length;
            if (cleanedNumber.startsWith("254") && length !== 12) {
              return false;
            } else if (cleanedNumber.startsWith("0") && length !== 10) {
              return false;
            }
            // Check if the remaining digits are all numeric
            if (!/^\d+$/.test(cleanedNumber.slice(1))) {
              return false;
            }
            return true;
         }
    
          //check first name
          const firstName = document.getElementById("firstName");
          firstName.addEventListener('input', (event) => {
            const note = "first-name"
            if (inputArray.indexOf(note) === -1) {
              var arr = inputArray;
                    arr.push(note);
              setInputArray(arr);
            }
    
            let firstName = event.target.value.trim();
            if (validateName(firstName) === true){
              setFirstNameError(false)
            }
            else{
              setFirstNameError(true)
            }
            setFirstName(firstName)
          })
    
           //check last name
           const lastName = document.getElementById("lastName");
           lastName.addEventListener('input', (event) => {
            const note = "last-name"
            if (inputArray.indexOf(note) === -1) {
              var arr = inputArray;
                    arr.push(note);
              setInputArray(arr);
            }
    
             let lastName = event.target.value.trim();
             if (validateName(lastName) === true){
               setLastNameError(false)
             }
             else{
               setLastNameError(true)
             }
             setLastName(lastName)
           })
    
    
           //check the email address
            const emailInput = document.getElementById("emailAddress");
            emailInput.addEventListener('input', function(event) {
              const note = "email"
              if (inputArray.indexOf(note) === -1) {
                var arr = inputArray;
                    arr.push(note);
                setInputArray(arr)
            }
            const email = event.target.value.trim();
            const isValid = validateEmail(email);
            if (isValid) {
              setEmailError(false);
            } else {
              setEmailError(true);
            }
            setEmail(email)
          });
    
          //check the message
          const messageInput = document.getElementById("message");
          messageInput.addEventListener('input', function(event) {
            const note = "message"
            if (inputArray.indexOf(note) === -1) {
              var arr = inputArray;
                    arr.push(note);
              setInputArray(arr);
          }
    
            const message = event.target.value.trim();
            const isValid = validateMessage(message);
            if (!isValid) setMessageError(true);
            else setMessageError(false)
            setMessage(message)
          })       
    
          //check the phone number
          const phoneInput = document.getElementById("phone");
          phoneInput.addEventListener('input', function(event) {
                const note = "phone"
                if (inputArray.indexOf(note) === -1) {
                    var arr = inputArray;
                    arr.push(note);
                    setInputArray(arr);
                }
    
                const phoneNumber = event.target.value.trim();
                const isValid = validatePhone(phoneNumber);
              
                if (isValid) {
                  setPhoneError(false);
                } else {
                  setPhoneError(true);
                }
                setPhone(phoneNumber)
          });
        }


        //set the button active or false
    const activateButton = () => {
      const formElement = document.getElementById("contactForm");
      formElement.addEventListener('input', function(event) {
        // Perform actions whenever the form is updated
        if ((firstNameError !== false ) ||
            (lastNameError  !== false ) ||
            (emailError !== false) ||
          (phoneError !== false) ||
          (messageError !== false))
          {
               setBtnActive(false)
              }
            else{
               setBtnActive(true)
              }
      });
    }

        checkFormInputs();
        activateButton();
    }, [  firstNameError,
          lastNameError,
          emailError,
          phoneError,
          messageError,
          inputArray
          ]);

    return (
        <div className = "container mb-4">
          <Snackbar
            open={SnackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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
            <div className="contact-wrapper">
            <div className = "row">
                <div className = "col-md-6">
                    <div className='card'>
                            <div className="inner">
                            <div className="border-heading-div"><h4 className="border-heading">Get in touch</h4></div>
                                <form onSubmit={handleSubmit} id = "contactForm" >
                                    <div className="form-group">

                                        {/* //firstname */}
                                        <div className="form-wrapper">
                                        {inputArray.includes("first-name") && firstNameError ?
                                          <div><label htmlFor="" style={{color: "red"}}>First Name<span className = "status-icon"><CancelIcon /></span></label><input type="text" className="form-control first-name incomplete" id="firstName"/></div> : 
                                          !inputArray.includes("first-name") && firstNameError ?
                                          <div><label htmlFor="" >First Name</label><input type="text" className="form-control first-name" id="firstName"/></div> :
                                          <div><label htmlFor="" style={{color: "green"}}>First Name<span className = "status-icon"><CheckCircleIcon /></span></label><input type="text" className="form-control first-name complete" id="firstName"/></div>
                                          }
                                        </div>

                                          {/* {last-name} */}
                                        <div className="form-wrapper">
                                        {inputArray.includes("last-name") && lastNameError ?
                                          <div><label htmlFor="" style={{color: "red"}}>Last Name<span className = "status-icon"><CancelIcon /></span></label><input type="text" className="form-control last-name incomplete" id="lastName"/></div> : 
                                          !inputArray.includes("last-name") && lastNameError ?
                                          <div><label htmlFor="" >Last Name</label><input type="text" className="form-control last-name" id="lastName"/></div> :
                                          <div><label htmlFor="" style={{color: "green"}}>Last Name<span className = "status-icon"><CheckCircleIcon /></span></label><input type="text" className="form-control last-name complete" id="lastName"/></div>
                                          }
                                        </div>
                                    </div>
                                    
                                    {/* Email Address */}
                                    <div className="form-wrapper">
                                    {inputArray.includes("email") && emailError ?
                                      <div><label htmlFor="" style={{color: "red"}}>Email Address<span className = "status-icon"><CancelIcon /></span></label><input type="text" className="form-control email incomplete" id="emailAddress"/></div> : 
                                      !inputArray.includes("email") && emailError ?
                                      <div><label htmlFor="">Email Address</label><input type="text" className="form-control email" id="emailAddress"/></div>:
                                      <div><label htmlFor="" style={{color: "green"}}>Email Address<span className = "status-icon"><CheckCircleIcon /></span></label><input type="text" className="form-control email complete" id="emailAddress"/></div>
                                      }
                                    </div>

                                      {/* Phone */}
                                    <div className="form-wrapper">
                                    {inputArray.includes("phone") && phoneError ?
                                      <div><label htmlFor="" style={{color: "red"}}>Phone Address<span className = "status-icon"><CancelIcon /></span></label><input type="tel" name = "phone" id = "phone" className="form-control phone incomplete" /></div> : 
                                      !inputArray.includes("phone") && phoneError ?
                                      <div><label htmlFor="">Phone Address</label><input type="tel" name = "phone" id = "phone" className="form-control phone incomplete" /></div>:
                                      <div><label htmlFor="" style={{color: "green"}}>Phone Address<span className = "status-icon"><CheckCircleIcon /></span></label><input type="tel" name = "phone" id = "phone" className="form-control phone complete" /></div>
                                      }
                                    </div>

                                    <div className="form-wrapper">
                                    {inputArray.includes("message") && messageError ?
                                      <div><label htmlFor="" style={{color: "red"}}>Message<span className = "status-icon"><CancelIcon /></span></label><textarea id="message" name="message" rows="4" className="form-control incomplete message" cols="35" placeholder="Enter message here"></textarea></div> : 
                                      !inputArray.includes("message") && messageError ?
                                      <div><label htmlFor="">Message</label><textarea id="message" name="message" rows="4" className="form-control message" cols="35" placeholder="Enter message here"></textarea></div>:
                                      <div><label htmlFor="" style={{color: "green"}}>Message<span className = "status-icon"><CheckCircleIcon /></span></label><textarea id="message" name="message" rows="4" className="form-control complete message" cols="35" placeholder="Enter message here"></textarea></div>}
                                    </div>

                                    {btnActive ? <div className='btn-group text-center w-100'><Button btn={"prim"}>Send us a messsage</Button></div> : <div className='btn-group deactivated text-center w-100'><Button btn={"prim"} type = "submit">Send us a messsage</Button></div>}
                                </form>
                            </div>
                        </div>
                    </div>
                {faqs.length > 0 ? <div className='col-md-6'>
                    <div className='heading-group-wording'>
                    <h3 className = "wordheading">Frequently Asked Questions.</h3>
                    </div>
                    <section className='accordion'>
                    <div className="container">
                      <div className="accordion">
                      
                      {faqs.map((faq, counter = 0) => {
                        return (<div className="accordion-item" id={`question${counter}`} key = {Math.random()}>
                                <a className="accordion-link" href={`#question${counter}`}>
                                  <div className="flex">
                                    <h3>{faq.question}</h3>
                                  </div>
                                  <i className="icon ion-md-arrow-forward"><ArrowRightIcon /></i>
                                  <i className="icon ion-md-arrow-down"><ArrowDropDownIcon /></i>
                                </a>
                                <div className="answer">
                                  <p>{faq.answer}</p>
                                </div>
                                <hr/>
                            </div>)
                            counter++;
                        })
                      }
     </div>
    </div>
  </section>
                </div> :
                <div className='col-md-6 text-center'>
                  <p>There aren't any faqs at the moment</p>
                  </div>
                  }
                </div>
            </div>
          <div className='map-details-area'>
            <div className='row'>
                <div className='col-md-8'>
                <div style={{width: "100%"}}>
                  <iframe title = "Ace Of Face And Hair" width="100%" height="400" frameBorder="0" scrolling="no" marginweight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=-1.2097244791600448,%2036.65186665857499+(AceOfFaceAndHair)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe></div>
                </div>
                <div className='col-md-4'>
                  <div className = "card mt-2">
                  <div className='contact-details-all'>
                      <div className='mt-2 location-details'>
                        <p><MyLocationIcon/><span className = "contact-text">Crescent road, Zambezi, Kiambu.</span></p>
                      </div>
                  </div>
                  </div>
                  <div className = "card mt-2">
                  <div className='contact-details-all'>
                      <div className='mt-2 phone-details'>
                        <p><PhoneIphoneIcon/><span className = "contact-text">+254 721 227843</span></p>
                      </div>
                    </div>
                  </div>
                  <div className = "card mt-2">
                  <div className='contact-details-all'>
                      <div className='mt-2 email-details'>
                        <p><EmailIcon/><span className = "contact-text">aceoffaceandhar@gmail.com</span></p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        
        </div>
    )
}
