import React, { useEffect } from 'react'
import Landing from '../../Components/Landing/Landing'
import ItemSlider from '../../Components/ItemSlider/ItemSlider'
import Gallery from '../../Components/Gallery/Gallery'
import "./Home.css"
import Instagram from '../../Components/Instagram/Instagram'
import ContactSection from '../../Components/ContactSection/ContactSection'
import Courses from '../../Components/Courses/Courses'
import Clients from '../../Components/Clients/Clients'
import AFHDetails from '../../Components/AFHDetails/AFHDetails'
import PointTab from '../../Components/PointTab/PointTab'

export default function Home(props) {

  useEffect(() => {
    document.title = "AFH | Home"
  }, [])

  return (
    <>
            <Landing/>
              <div className = "services">
                <ItemSlider darkmode = {props.darkmode}/>
              </div>
             <div className = "work">
                <Gallery darkmode = {props.darkmode}/>
            </div>
            <div className='contact-section container-fluid'>
              <ContactSection darkmode = {props.darkmode}/>
            </div>
            <div className='courses-section'>
              <Courses />
            </div>
            <div className='afh-details'>
              <AFHDetails />
            </div>
            {/* <div className='instagram-section container-fluid'>
              <Instagram />
            </div> */}
            <div className='clients-section container fluid'>
              <Clients />
            </div>
            <div className='points-section'>
            <PointTab background={"#0a6143"} color = {"#ffffff"} darkmode = {props.darkmode} btns = {true}>
              Make the most outta afh
            </PointTab>
            </div>
    </>
  )
}
