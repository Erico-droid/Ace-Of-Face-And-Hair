import React, {useEffect, useState} from 'react'
import Card from '../../shared/Card/Card'
import ContactIcon from '../../Assets/paper-plane.png'
import ContactIcon2 from '../../Assets/paper-plane2.png'
import ContactIcon3 from '../../Assets/paper-plane3.png'
import "./ContactSection.css"
import Button from '../../shared/Button/Button'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function ContactSection() {

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
    <Card>
      <div className='contact-body'>
        <div className='pattern'></div>
        <div className='last-pattern'></div>
        <div className='text-center contacticon'>
          <img src = {getIcon()} alt = "contact icon" />
        </div>
        <div className='text-center'>
          <h2>We're waiting to hear from you.</h2>
          <p>Contact us today and let's make magic happen!</p>
        </div>
        <div className='text-center'>
          <Button icon = {<PhoneIcon  />} color = {"white"} bg = {"black"} btn = {"sec"}>Contact us</Button>
        </div>
      </div>
    </Card>
  )
}