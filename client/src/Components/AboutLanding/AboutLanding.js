import React, { useEffect, useRef } from 'react';
import "./AboutLanding.css"
import FancyHeading from "../../shared/FancyHeading/FancyHeading";
import Heading from '../../shared/Heading/Heading';
import { YouTubeEmbed } from 'react-social-media-embed';
import Button from "../../shared/Button/Button"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AboutImage from "../../Assets/aboutArea.png";


export default function AboutHeader() {
  const height = window.innerHeight - 118;
  const width = window.innerWidth;

  const p5container = useRef();
  function getGlitchEffect () {
    // const p5Instance = new p5(draw);
  }

  useEffect(() => {
    // getGlitchEffect()
  })


  return (
    <div className='container-fluid'>
      <div className='about-landing' style = {{height: height, width: "100%"}}>
          <div className='content-area col-md-6 pl-0 in-b order-2 order-md-1'>
              <div className='about-content'>
              <div className='heading-group'>
                <FancyHeading>Ace Of Face And Hair</FancyHeading>
                <Heading>Our story unfolded</Heading>
              </div>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus massa quis urna dapibus placerat. Suspendisse potenti. Aliquam sagittis nisl vel tellus efficitur, sed maximus tellus laoreet. Vivamus venenatis dolor vel turpis ultrices blandit. Nullam vitae ante sit amet ante vestibulum tristique euismod vitae quam. Aliquam pharetra quam ac diam mollis aliquet. Vestibulum consequat lorem vel lectus gravida, a auctor mauris faucibus. Sed semper vitae odio at lobortis. 
              </p>
              <div className='button-container'>
              <Button btn = {"prim"}>make an appointment</Button>
              <Button icon = {<ArrowDownwardIcon />} btn = {"text"}>Explore our story</Button>
              </div>
          </div>
          </div>
            <div className='col-md-6 in-b video-area order-1 order-md-2'>
              <div className='about-video'>
              <img src = {AboutImage}  alt = "abt-image"/>
                {/* <YouTubeEmbed url="https://www.youtube.com/watch?v=HpVOs5imUN0" width={width/2} height={400} /> */}
              </div>
            </div>
          </div>
      </div>
  )
}
