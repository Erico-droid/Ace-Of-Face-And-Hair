import React from 'react';
import "./IndividualProject.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

export default function IndividualProject(props) {
    const project = props.project;
    return (
            <div className = "col-md-3">
                <div className="property-card card">
                    <Link to = {`project/${project.id}`}>
                        <div className="property-image" style={{background: `url(${project.img})`}}>
                            <div className="property-image-title">
                            <h5 className = "property-card-h5">{project.title}</h5>
                            </div>
                        </div>
                    </Link>
                        <div className="property-description">
                            <h5 className = "property-card-h5"> {project.title} </h5>
                            <p>Lorem Ipsum Dipsum hortata. Mixcall Horcho. Mixwell Chingo. More Bingo. Lorem Ipum doth be hard.</p>
                        </div>
                    <Link to = {`project/${project.id}`}>
                        <div className="property-button">
                            <span>View this project</span><span className='ml-2'><ArrowForwardIcon /></span>
                        </div>
                    </Link>
                </div>
            </div>
        )
}
