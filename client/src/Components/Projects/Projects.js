import React, { useEffect, useState } from 'react'
import "./Projects.css"
import BorderHeading from '../../shared/BorderHeading/BorderHeading';
import Axios from 'axios';
import IndividualProject from '../IndividualProject/IndividualProject';
import PlaceHolder from './PlaceHolder';
import FadeIn from 'react-fade-in/lib/FadeIn';

export default function Projects(props) {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading]  = useState(true);

    const fetchProjects = async () => {
        const url = "https://jsonplaceholder.typicode.com/albums?_limit=10";
        var counter = 0;
        const request = await Axios.get(url)
        .then((resp) => {
            var respArray = resp.data;
            for (var i = 0; i < respArray.length; i++) {
                const img_req = Axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${i}`)
                .then((resp) => {
                    if (resp.data.length !== 0) {
                        var img = resp.data[0]["url"];
                        if(!respArray[counter]["img"])
                            respArray[counter]["img"] = img;
                    } else {
                        if(!respArray[counter]["img"]  === undefined)
                            respArray[counter]["img"] = respArray[counter - 1]["img"];
                    }
                    setProjects(respArray)
                    counter++;
                })
                .catch(error => {
                    throw error;
                })
            }
            return respArray;
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
        <>
        {loading ?
            <div style = {{width: "100%", minHeight: "100vh"}}>
                {PlaceHolderSettings()}
            </div>
            :
        <FadeIn>
            <BorderHeading>Projects</BorderHeading>
            <div className='row'>
                {projects.map(project => {return  <IndividualProject project = {project} key = {project.title} />})}
            </div>
         </FadeIn>
        }
        </>
  )
}
