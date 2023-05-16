import React from 'react';
import AboutLanding from '../../Components/AboutLanding/AboutLanding';
import Story from '../../Components/Story/Story';
import Clients from '../../Components/Clients/Clients';
import GoalsSection from '../../Components/GoalsSection/GoalsSection';
import TeamSection from '../../Components/TeamSection/TeamSection';
import "./About.css"
import PointTab from '../../Components/PointTab/PointTab';

export default function About(props) {
  return (
    <div>
      <div className='about-lndn'>
        <AboutLanding />
      </div>
      <div className='story-main'>
        <Story />
      </div>
      <div className='goal-section-main'>
        <GoalsSection />
      </div>
      <div className='team-section-main'>
        <TeamSection />
      </div>
      <div className = 'client-section-main'>
        <Clients />
      </div>
      <div className='points-section'>
            <PointTab background={"#0a6143"} color = {"#ffffff"} darkmode = {props.darkmode} btns = {true}>
              Make the most outta afh
            </PointTab>
      </div>
    </div>
  )
}
