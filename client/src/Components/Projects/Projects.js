import React, { useEffect, useState } from 'react'
import "./Projects.css"
import BorderHeading from '../../shared/BorderHeading/BorderHeading';
import Axios from 'axios';
import IndividualProject from '../IndividualProject/IndividualProject';
import PlaceHolder from './PlaceHolder';
import FadeIn from 'react-fade-in/lib/FadeIn';
import source from '../../proxy.json'

export default function Projects(props) {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading]  = useState(true);

    const fetchProjects = async () => {
        const url = `${source.proxy}/portfolio/`;
        var counter = 0;
        const request = await Axios.get(url)
        .then((resp) => {
            var respArray = resp.data;
            setProjects(respArray)
        })
        .catch(error => {
            throw error;
        })
    }

    useEffect(() => {
        fetchProjects();
        setLoading(false);
    }, [])

    const PlaceHolderSettings = () => {
        if (props.darkmode)
          return <PlaceHolder backgroundColor="grey" foregroundColor="#ecebeb" />
        else
          return <PlaceHolder backgroundColor="#f3f3f3" foregroundColor="#ecebeb" />
    }
        
    return (
        <div style = {{marginBottom: "50px"}}>
        {loading ?
            <div style = {{width: "100%", minHeight: "100vh", position: "relative", display: "block"}}>
                {/* {PlaceHolderSettings()} */}
            </div>
            :
            projects.length > 0 ?
        <FadeIn>
            <BorderHeading>Projects</BorderHeading>
            <div className='row'>
                {projects.map(project => {return  <IndividualProject project = {project} key = {project.slug} />})}
            </div>
         </FadeIn>
            :
            <div style={{padding: "150px 0px", display: "flex",
                justifyContent: "center", alignItems: "center"}}>
            <p>There aren't any projects at the moment.</p>
            </div>
        }
        </div>
  )
}
