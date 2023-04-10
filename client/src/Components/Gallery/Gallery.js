import React, {useEffect, useState} from 'react'
import "./Gallery.css";
import MainGallery from "react-photo-gallery";
import { createClient } from 'pexels';
import PlaceHolder from './PlaceHolder'
import FadeIn from 'react-fade-in/lib/FadeIn';

export default function Gallery() {

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

  return (
    <>
    {loading ?
      <div style={{ width: "100%"}}>
         <PlaceHolder />
       </div>
      :
      <FadeIn>
      <div>
        <MainGallery photos={photos}/>
      </div>
      </FadeIn>
    }
    </>
  )
}
