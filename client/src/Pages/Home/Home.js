import React from 'react'
import Card from '../../shared/Card/Card'
import Player from '../../Components/Player/Player'
import Button from '../../shared/Button/Button'
import Landing from '../../Components/Landing/Landing'
import Heading from '../../shared/Heading/Heading'
import ItemSlider from '../../Components/ItemSlider/ItemSlider'
import "./Home.css"

export default function Home() {
  return (
    <div>
            <Landing/>
            <div className = "services">
              <Heading wording={"Services"}>Services</Heading>
              <ItemSlider />
            </div>
    </div>
  )
}
