import React from 'react'
import Card from '../../shared/Card/Card'
import Player from '../../Components/Player/Player'
import Button from '../../shared/Button/Button'
import Landing from '../../Components/Landing/Landing'
import Heading from '../../shared/Heading/Heading'
import ItemSlider from '../../Components/ItemSlider/ItemSlider'
import Gallery from '../../Components/Gallery/Gallery'
import "./Home.css"
import Instagram from '../../Components/Instagram/Instagram'
import ContactSection from '../../Components/ContactSection/ContactSection'
import Courses from '../../Components/Courses/Courses'
import Clients from '../../Components/Clients/Clients'

export default function Home(props) {
  return (
    <div>
            <Landing/>
              <div className = "services">
                <ItemSlider darkmode = {props.darkmode}/>
              </div>
             <div className = "work">
                <Gallery darkmode = {props.darkmode}/>
            </div>
            <div className='contact-section container-fluid'>
              <ContactSection />
            </div>
            <div className='courses-section'>
              <Courses />
            </div>
            //why AFH
            <div className='instagram-section container-fluid'>
              <Instagram />
            </div>
            //what AFH is all about in details and testimonials
            <div className='clients-section container fluid'>
              <Clients />
            </div>

    </div>
  )
}
