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

export default function Gallery(props) {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPhotos() {
    var random = Math.round(Math.random() * 10);
    var object = [];
    const client = await createClient('aqrcwOOWlZKCTMFRklR8ZZSoJ50WJ3gqtbNovW5nFCAonmcQhSWFGDwF');
    client.photos.curated({ per_page: 12, page: random })
      .then(response => {
          object = response.photos;
          return object;
      })
      .then (response => {
        var arr = [];
        for (var i = 0; i < response.length; i++){
          var obj = {}
          obj["src"] = response[i].src["large"];
          obj["width"] = response[i].width
          obj["height"] = response[i].height
          arr[i] = obj;
          obj = {};
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

  return (
    <>
    {loading ?
      <div style={{ width: "100%"}}>
         {PlaceHolderSettings()}
       </div>
      :
      <FadeIn>
      <div>
          <div className='heading-group'>
                <FancyHeading>Browse Our</FancyHeading>
                <Heading wording={"Services"}>Work</Heading>
          </div>
        <MainGallery photos={photos}/>
      </div>
      <div className="container">
        <div className = "button-container button-parent2">
          <Button btn={"prim"}>Make An Appointment</Button>
          <Button icon = {<AppsIcon/>} btn={"sec"}>View Our Projects</Button>
        </div>
      </div>
      </FadeIn>
    }
    </>
  )
}
