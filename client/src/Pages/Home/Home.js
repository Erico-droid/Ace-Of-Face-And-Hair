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

export default function Home() {
  return (
    <div>
            <Landing/>
              <div className = "services">
                <ItemSlider />
              </div>
             <div className = "work container-fluid">
                <Gallery />
            </div>
            <div className='instagram-section container-fluid'>
              <Instagram />
            </div>
            <div className='contact-section container-fluid'>
              <ContactSection />
            </div>


    </div>
  )
}
