import React from 'react'
import './Button.css';

export default function Button(props) {
  return (
    <div>
        <button className = {`btn btn-${props.btn}`}>
            {props.children}
        </button>
    </div>
  )
}
