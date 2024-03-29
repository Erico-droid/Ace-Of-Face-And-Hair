import React from 'react'
import './Card.css'

export default function Card (props) {
  return (
    <div  className={`card col-md-${props.size} col-sm-12 ${props.constraints}`} style={{height: "100%", background: props.background}}>
        {props.children}
    </div>
  )
}
