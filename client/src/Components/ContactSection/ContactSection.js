import React, {useEffect, useState} from 'react'
import Card from '../../shared/Card/Card'
import ContactIcon from '../../Assets/paper-plane.png'
import ContactIcon2 from '../../Assets/paper-plane2.png'
import ContactIcon3 from '../../Assets/paper-plane3.png'
import "./ContactSection.css"
import Button from '../../shared/Button/Button'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import svg from "../../Assets/shapes.svg"

export default function ContactSection(props) {

  const [icon, setIcon] = useState(2);

  function getIcon() {
    var icons = 3;
    var randomIcon = Math.round(Math.random() * icons);
    if (randomIcon === 1) {
      return ContactIcon;
    } else if (randomIcon === 2) {
      return ContactIcon2;
    } else {
      return ContactIcon3;
    }
  } 

  return (
      <div className='contact-body'>
            <div className='shape-right shape '>
              <svg aria-hidden="true" className="shape__inner top-right" style={{color:" #cd7a00"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#triangle`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='shape-left shape '>
              <svg aria-hidden="true" className="shape__inner bottom-left" style={{color:"#0077be"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#circle`}>
                  </use>
              </svg>
            </div>
        <div className='text-center contacticon'>
          <img src = {getIcon()} alt = "contact icon" />
        </div>
        <div className='text-center  container' style={{maxWidth: '80%'}}>
          <h2>We're waiting to hear from you.</h2>
          <p>We would like to hear from you. You can always make a call to us or drop by our offices for a cup of coffee. Contact us today and let's make magic happen! </p>
        </div>
        <div className='text-center'>
          <Button icon = {<PhoneIcon  />} color = {"white"} bg = {props.darkmode ? "#101215" : "black"} btn = {"sec"}>Contact us</Button>
        </div>
      </div>
  )
}
