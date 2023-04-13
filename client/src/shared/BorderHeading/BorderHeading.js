import React from 'react'
import "./BorderHeading.css"

export default function BorderHeading(props) {
  return (
    <div className = "border-heading-div">
        <h4 className='border-heading'>{props.children}</h4>
    </div>
  )
}
