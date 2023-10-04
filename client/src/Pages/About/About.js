import React, {useEffect} from 'react';
import AboutLanding from '../../Components/AboutLanding/AboutLanding';
import Story from '../../Components/Story/Story';
import Clients from '../../Components/Clients/Clients';
import GoalsSection from '../../Components/GoalsSection/GoalsSection';
import TeamSection from '../../Components/TeamSection/TeamSection';
import "./About.css"
import PointTab from '../../Components/PointTab/PointTab';
import Seo from '../../Components/Seo/Seo'

export default function About(props) {
  useEffect(() => {
    document.title = "AFH | About"
  }, [])
  return (
    <>
    <Seo title="About us" description="Ace of face and Hair company has been in existence since 2012. The team comprises of certified professionals in the industries of hair, makeup photography, costume and marketing. Our experience includes working in the Film, Theater, Television, Events, Editorial Photography, and we have worked with celebrity, actors, singers, TV presenters, various show hosts, institutions and individuals." />
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
    </>
  )
}
