import React from 'react';
import "./IndividualProject.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import source from '../../proxy.json'

export default function IndividualProject(props) {
    const project = props.project;
    return (
            <div className = "col-md-3">
                <div className="property-card card">
                    <Link to = {`${project.slug}`}>
                        <div className="property-image" style={{background: `url(${source.proxy+project.random_image_url})`}}>
                            <div className="property-image-title">
                            <h5 className = "property-card-h5">{project.name}</h5>
                            </div>
                        </div>
                    </Link>
                        <div className="property-description">
                            <h5 className = "property-card-h5"> {project.title} </h5>
                            <p>{project.brief_description}</p>
                        </div>
                    <Link to = {`${project.slug}`}>
                        <div className="property-button">
                            <span>View this project</span><span className='ml-2'><ArrowForwardIcon /></span>
                        </div>
                    </Link>
                </div>
            </div>
        )
}
