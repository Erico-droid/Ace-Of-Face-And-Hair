import React from 'react';
import "./FancyHeading.css"

export default function FancyHeading(props) {
  return (
    <h3 className='fancy-h3-heading'>
        {props.children}
    </h3>
  )
}
