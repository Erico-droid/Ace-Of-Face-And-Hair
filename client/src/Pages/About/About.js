import React from 'react';
import AboutLanding from '../../Components/AboutLanding/AboutLanding';
import Story from '../../Components/Story/Story';
import Clients from '../../Components/Clients/Clients';
import GoalsSection from '../../Components/GoalsSection/GoalsSection';
import TeamSection from '../../Components/TeamSection/TeamSection';

export default function About() {
  return (
    <div>
      <AboutLanding />
      <Story />
      <GoalsSection />
      <TeamSection />
      <Clients />
    </div>
  )
}
