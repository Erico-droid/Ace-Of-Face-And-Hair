import React, { useEffect } from 'react'
import "./ContactForm.css"
import Button from '../../shared/Button/Button'
import Card from '../../shared/Card/Card'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';

export default function ContactForm() {

    useEffect(() => {
        (() => {
            let accordion = document.querySelector("section .accordion");
            let targetId;
            accordion.addEventListener('click', (evt) => {
                evt.preventDefault();
                let target = (evt.target);
                for (var i = 0; i < accordion.children.length; i++) {
                    if (accordion.children[i].contains(target))
                        var targetChild = accordion.children[i];
                }
                targetId = targetChild.getAttribute("id");
                // console.log(window.location.hash.substring(1) ," ", targetId)
                // if (window.location.hash.substring(1) === targetId) {
                //     // window.location.hash = "";
                //     // Remove the hash from the URL
                //     window.location.hash = "";
                //     console.log(window.location)
                // }
                // else
                window.location.hash = targetId;
            })
        })()
    }, []);

    return (
        <div className = "container mb-4">
            <div className="contact-wrapper">
            <div className = "row">
                <div className = "col-md-6">
                    <div className='card'>
                            <div className="inner">
                                <form action="">
                                    <div className="form-group">
                                    <div className="form-wrapper">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-wrapper">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" className="form-control" />
                                    </div>
                                    </div>
                                    <div className="form-wrapper">
                                    <label htmlFor="">Email</label>
                                    <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-wrapper">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="tel" name = "phone" id = "phone" className="form-control" />
                                    </div>
                                    <div className="form-wrapper">
                                    <label htmlFor="">Message</label>
                                    <textarea id="message" name="message" rows="4" className="form-control" cols="35" placeholder="Enter message here"></textarea>
                                    </div>
                                    <Button btn={"prim"}>Send us a messsage</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                <div className='col-md-6'>
                    <div className='heading-group-wording'>
                    <h3 className = "wordheading" style = {{color: "#000"}}>Frequently Asked Questions.</h3>
                    <p style = {{color: "#000"}}>
                    primeForce Property Manager Plus is a custom-built solution for complex businesses managing thousands of units. 
                    </p>
                    </div>
                    <section className='accordion'>
    <div className="container">
      <div className="accordion">
        <div className="accordion-item" id="question1">
          <a className="accordion-link" href="#question1">
            <div className="flex">
              <h3>BRANDING</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"><ArrowRightIcon /></i>
            <i className="icon ion-md-arrow-down"><ArrowDropDownIcon /></i>
          </a>
          <div className="answer">
            <p> We believe in the greater good, we strive to do something for people, we aim to make their lives easier and more enjoyable, we love businesses that keep this</p>
          </div>
          <hr/>
      </div>
        <div className="accordion-item" id="question2">
          <a className="accordion-link" href="#question2">
            <div className="flex">
              <h3>UX/UI DESIGN</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"><ArrowRightIcon /></i>
            <i className="icon ion-md-arrow-down"><ArrowDropDownIcon /></i>
          </a>
          <div className="answer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
          <hr/>
      </div>
        <div className="accordion-item" id="question3">
          <a className="accordion-link" href="#question3">
            <div className="flex">
              <h3>FRONTEND DEVELOPMENT</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"><ArrowRightIcon /></i>
            <i className="icon ion-md-arrow-down"><ArrowDropDownIcon /></i>
          </a>
          <div className="answer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
          <hr/>
      </div>
        <div className="accordion-item" id="question4">
          <a className="accordion-link" href="#question4">
            <div>
              <h3>BACKEND DEVELOPMENT</h3>
              <ul>
                <li>#Figma</li>
                <li>#Sketch</li>
                <li>#Adobe</li>
                <li>#Invision</li>
                <li>#Protopie</li>
              </ul>
            </div>
            <i className="icon ion-md-arrow-forward"><ArrowRightIcon /></i>
            <i className="icon ion-md-arrow-down"><ArrowDropDownIcon /></i>
          </a>
          <div className="answer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
          </div>
          <hr/>
      </div>
     </div>
    </div>
  </section>
                </div>
                </div>
            </div>
          <div className='map-details-area'>
            <div className='row'>
                <div className='col-md-8'>
                <div style={{width: "100%"}}>
                  <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=-1.2097244791600448,%2036.65186665857499+(AceOfFaceAndHair)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe></div>
                </div>
                <div className='col-md-4'>
                  <div className = "card mt-2">
                  <div className='contact-details-all'>
                      <div className='mt-2 location-details'>
                        <p><MyLocationIcon/><span className = "contact-text">hello world</span></p>
                      </div>
                  </div>
                  </div>
                  <div className = "card mt-2">
                  <div className='contact-details-all'>
                      <div className='mt-2 phone-details'>
                        <p><PhoneIphoneIcon/><span className = "contact-text">hello world</span></p>
                      </div>
                    </div>
                  </div>
                  <div className = "card mt-2">
                  <div className='contact-details-all'>
                      <div className='mt-2 email-details'>
                        <p><EmailIcon/><span className = "contact-text">hello world</span></p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        
        </div>
    )
}
