import React from 'react'
import Projects from '../../Components/Projects/Projects'

export default function Portfolio(props) {
  return (
    <div className='container-fluid'>
      <Projects darkmode = {props.darkmode}/>
    </div>
  )
}
