import React from 'react'
import "./PointTab.css"
import Button from '../../shared/Button/Button'
import svg from "../../Assets/shapes.svg"
import {Link} from 'react-router-dom'

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
                    <p style = {{color: props.color, textAlign: "center"}}>Transforming Beauty and Unveiling Artistry: Discover Your Unique Style with Ace of Face and Hair.</p>
                    {props.btns ?
                    <Link to={'/make-an-appointment'}> 
                        <Button btn={"prim"}>
                            Make an appointment
                        </Button>
                    </Link>
                    : null
                    }
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}
