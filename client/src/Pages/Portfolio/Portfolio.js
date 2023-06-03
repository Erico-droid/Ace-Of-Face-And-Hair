import React, {useEffect} from 'react'
import Projects from '../../Components/Projects/Projects'

export default function Portfolio(props) {
  useEffect(() => {
    document.title = "AFH | Portfolio"
  }, [])
  return (
    <div className='container'>
      <Projects darkmode = {props.darkmode} loading={props.load}/>
    </div>
  )
}
