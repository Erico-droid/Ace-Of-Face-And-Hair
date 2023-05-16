import React from 'react'
import "./PointTab.css"
import Button from '../../shared/Button/Button'
import svg from "../../Assets/shapes.svg"

export default function PointTab(props) {
  return (
    <div>
    <div className='image-square-big-area shape'>
        <svg aria-hidden="true" className="shape__inner image-square-area" style={{color:" yellow"}} data-v-67de5fba="">
        <use xlinkHref={`${svg}#square`} data-v-67de5fba="">
            </use>
        </svg>
    </div>
    <div className = "big-bg" style={{backgroundColor: props.background}}>
        <div className='container'>
            <div className='big-heading'>
                <div className='content-group'>
                    <h3 className = "wordheading" style = {{color: props.color}}>{props.children}</h3>
                    <p style = {{color: props.color, textAlign: "center"}}>We are dedicated. We are dedicated. We are dedicated. We are dedicated. We are dedicated. We are dedicated. We are dedicated. We are dedicated. We are dedicated.We are dedicated.We are dedicated. </p>
                    {props.btns ? 
                        <Button btn={"prim"}>
                            Book an appointment
                        </Button>
                    : null
                    }
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
