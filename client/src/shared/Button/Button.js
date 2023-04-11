import React from 'react'
import './Button.css';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

export default function Button(props) {
  return (
    <div>
        <button className = {`btn btn-${props.btn}`}>
            <span className="detail-icon">{props.btn === "prim" ? <InsertInvitationIcon /> : props.icon ? props.icon : null }</span>
            {props.children}
        </button>
    </div>
  )
}
