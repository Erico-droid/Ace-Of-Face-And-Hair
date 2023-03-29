import React from 'react';
import './Heading.css';


export default function Heading(props) {
  return (
    <div className='text-center mirror'>
      <h1 data-text={props.wording}><span>{props.children}</span></h1>
    </div>
  )
}
