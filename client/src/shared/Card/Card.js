import React from 'react'
import './Card.css'

export default function Card (props) {
  return (
    <div className={`card col-md-${props.size} col-sm-12`} style={{height: "100%"}}>
        {props.children}
    </div>
  )
}
