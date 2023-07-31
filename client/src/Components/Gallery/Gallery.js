import React, {useEffect, useState} from 'react'
import "./Gallery.css";
import MainGallery from "react-photo-gallery";
import { createClient } from 'pexels';
import PlaceHolder from './PlaceHolder'
import FadeIn from 'react-fade-in/lib/FadeIn';
import FancyHeading from '../../shared/FancyHeading/FancyHeading';
import Heading from '../../shared/Heading/Heading';
import Button from '../../shared/Button/Button';
import AppsIcon from '@mui/icons-material/Apps';
import svg from "../../Assets/shapes.svg"
import axios from 'axios'
import source from '../../proxy.json'

export default function Gallery(props) {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getPhotos() {
    var random = Math.round(Math.random() * 10);
    var object = [];
    axios.get(`${source.proxy}/general_setting/work_area_images/`)
      .then (response => {
        response = response.data["images"]
        var arr = [];
        for (var i = 0; i < response.length; i++){
          var obj = {}
          obj["src"] = response[i]
          obj["width"] = 3000 //response[i].width
          obj["height"] = 4000 //response[i].height
          arr[i] = obj;
        }
        setPhotos(arr);
        setLoading(false);
      })
      .catch(err => {
        throw err;
      });
  }

  useEffect(() => {
    getPhotos();
  }, [])

  const PlaceHolderSettings = () => {
    if (props.darkmode)
      return <PlaceHolder backgroundColor="grey" foregroundColor="#ecebeb" />
    else
      return <PlaceHolder backgroundColor="#f3f3f3" foregroundColor="#ecebeb" />
  }

  const BasicRows = () => <MainGallery photos={photos}/>;

  return (
    <div className='container'>
      <div className='shape-top-left shape '>
            <svg aria-hidden="true" className="shape__inner top-left" style={{color:" #0a6143"}} data-v-67de5fba="">
              <use xlinkHref={`${svg}#square`} data-v-67de5fba="">
                </use>
            </svg>
          </div>
    {loading ?
      <div style={{ width: "100%"}}>
         {PlaceHolderSettings()}
       </div>
      :
      <FadeIn>
      <div className='gal'>
        <div className = "row">
          <div className='col-md-6'>
          <div className='top-phots'>
            <div className='shadower'>
              <BasicRows />
              </div>
          </div>
          </div>
          <div className='col-md-6 content-centre'>
          {/* <div className='heading-group'>
                <FancyHeading>Browse Our</FancyHeading>
                <Heading wording={"Services"}>Work</Heading>
          </div> */}

<div className="container art-text">
          <div className='heading-group-wording'>
              <h3 className = "wordheading"> Explore Our Diverse Collection of Work.</h3>
          </div>
          <p>We create art through hair and makeup. Our skilled stylists explore the possibilities of the human body, crafting stunning looks that challenge conventional beauty. From intricate makeup designs to bold hairstyles, we tell stories that capture the imagination. Whether it's for TV, film, theatre, or a high-profile photoshoot, we bring your vision to life. Trust us to provide the best in the business, with the expertise to make you look and feel amazing.</p>
        <div className = "button-container button-parent2">
          <Button btn={"prim"}>Make An Appointment</Button>
          <Button icon = {<AppsIcon/>} btn={"sec"}>View Our Projects</Button>
        </div>
      </div>
          </div>
          </div>
      </div>
      </FadeIn>
    }
    </div>
  )
}
