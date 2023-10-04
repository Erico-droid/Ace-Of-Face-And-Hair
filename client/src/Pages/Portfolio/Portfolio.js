import React, {useEffect} from 'react'
import Projects from '../../Components/Projects/Projects'
import Seo from '../../Components/Seo/Seo'

export default function Portfolio(props) {
  useEffect(() => {
    document.title = "AFH | Portfolio"
  }, [])
  return (
    <div className='container'>
      <Seo title="Portfolio" description="We have done many projects with different clients in the past. You'll be able to see some of the projects that we've posted here." />
      <Projects darkmode = {props.darkmode} loading={props.load}/>
    </div>
  )
}
