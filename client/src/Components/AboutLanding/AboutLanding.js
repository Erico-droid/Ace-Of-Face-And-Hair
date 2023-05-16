import React, { useEffect, useRef } from 'react';
import "./AboutLanding.css"
import FancyHeading from "../../shared/FancyHeading/FancyHeading";
import Heading from '../../shared/Heading/Heading';
import { YouTubeEmbed } from 'react-social-media-embed';
import Button from "../../shared/Button/Button"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AboutImage from "../../Assets/aboutArea.png";


export default function AboutLanding() {
  var height;
  const width = window.innerWidth;
  if (width < 768 && width > 500)
    height = window.innerHeight + 118;
  else if (width < 500)
    height = window.innerHeight + 220;
  else
    height = window.innerHeight - 0;
  return (
    <div className='container-fluid'>
      <div className='row about-landing' style = {{height: height, width: "100%"}}>
          <div className='content-area col-md-6 col-sm-12 order-1 order-md-1'>
              <div className='about-content'>
              <div className='heading-group'>
                <FancyHeading>Ace Of Face And Hair</FancyHeading>
                <Heading>Our story unfolded</Heading>
              </div>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus massa quis urna dapibus placerat. Suspendisse potenti. Aliquam sagittis nisl vel tellus efficitur, sed maximus tellus laoreet. 
              </p>
              <div className='button-container'>
              <Button btn = {"prim"}>make an appointment</Button>
              <Button icon = {<ArrowDownwardIcon />} btn = {"text"}>Explore our story</Button>
              </div>
          </div>
          </div>
            <div className='col-md-6 video-area order-2 order-md-2'>
              <div className='about-video'>
                <div className = "glitch">
                  <img src = {AboutImage}  alt = "abt-image"/>
                  <div className="glitch__layers">
                    <div className="glitch__layer"></div>
                    <div className="glitch__layer"></div>
                    <div className="glitch__layer"></div>
                  </div>
                    {/* <YouTubeEmbed url="https://www.youtube.com/watch?v=HpVOs5imUN0" width={width/2} height={400} /> */}
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}
