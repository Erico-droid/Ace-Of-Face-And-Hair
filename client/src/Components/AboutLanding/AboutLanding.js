import React, { useEffect, useRef } from 'react';
import "./AboutLanding.css"
import Heading from '../../shared/Heading/Heading';
import Button from "../../shared/Button/Button"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AboutImage from "../../Assets/aboutArea.png";
import {Link} from 'react-router-dom'

export default function AboutLanding() {
    var height;
    const width = window.innerWidth;
    if (width < 768 && width > 500)
      height = window.innerHeight - 80;
    else if (width < 500)
      height = window.innerHeight - 100;
    else
      height = window.innerHeight - 100;

    const handleBtnClick = () => {
      const btn = document.getElementById("exploreStory")
      if (btn) {
        btn.addEventListener('click', () => {
          window.location.href = window.location.origin + window.location.pathname + "#storyDiv"
        })
      }
    }

    useEffect(() => {
      handleBtnClick()
    }, [])

  return (
    <div className='container-fluid'>
      <div className='row about-landing' style = {{height: height, width: "100%"}}>
          <div className='content-area col-md-6 col-sm-12 order-1 order-md-1'>
              <div className='about-content'>
                <div className='headContent'>
                  <div className='heading-group' style = {{height: '70px'}}>
                    <Heading>Our story unfolded</Heading>
                  </div>
                  <p>Ace of face and Hair company has been in existence since 2012. The team comprises of
                      certified professionals in the industries of hair, makeup photography, costume and marketing.
                      Our experience includes working in the Film, Theater, Television, Events, Editorial Photography,
                      and we have worked with celebrity, actors, singers, TV presenters, various show hosts,
                      institutions and individuals.</p>
                  <div className='button-container'>
                    <Link to={'/make-an-appointment'}>
                      <Button btn = {"prim"}>make an appointment</Button>
                    </Link>
                    <a id = "exploreStory">
                      <Button icon = {<ArrowDownwardIcon />} btn = {"text"}>Explore our story</Button>
                    </a>
                  </div>
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
