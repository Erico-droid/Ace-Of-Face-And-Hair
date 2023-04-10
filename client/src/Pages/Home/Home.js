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
import AppsIcon from '@mui/icons-material/Apps';

export default function Home() {
  return (
    <div>
            <Landing/>
            <div className = "services">
              <Heading wording={"Services"}>Services</Heading>
              <ItemSlider />
            </div>
            <div className = "work container-fluid">
              <Heading wording={"Our Work"}>Our Work</Heading>
              {/* <Card> */}
                <Gallery />
                <div className="container">
                  <div className = "button-container button-parent2">
                    <Button btn={"prim"}>Make An Appointment</Button>
                    <Button icon = {<AppsIcon/>} btn={"sec"}>View Our Projects</Button>
                  </div>
                </div>
                <div>
                  <Instagram />
                </div>
              {/* </Card> */}
            </div>

    </div>
  )
}
