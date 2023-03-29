import React, {useState, useEffect, useRef} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { createClient } from 'pexels';
import Axios from 'axios';
import "./ItemSlider.css";
import Card from "../../shared/Card/Card";
import Placeholder from './Placeholder'

export default function ItemSlider(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    async function getImages() {
        var object = [];
        const client = createClient('aqrcwOOWlZKCTMFRklR8ZZSoJ50WJ3gqtbNovW5nFCAonmcQhSWFGDwF');
        client.photos.curated({ per_page: 12 })
          .then(response => {
              object = response.photos;
              return object;
          })
          .then (response => {
            setImages(response);
            setLoading(false);
          })
          .catch(err => {
            throw err;
          });
    }

    useEffect(() => {
        getImages();
    }, [])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
      <>
      {loading ? 
        
        <div style={{ width: "100%"}}>
          <Placeholder />
        </div>
        :
        <div className='container-fluid carousel'>
            <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
              {images.map(image => {
                return <div className="card m-1" key={image.alt}>
                          <img src = {image.src["large"]} alt = {image.alt} className = "img-services p-0"/>
                          <div className = "container-fluid detailed-text">
                              <p>{image.photographer}</p>
                          </div>
                        </div>
              })}
            </Carousel>
        </div>  
      }  
      </>
    )
}
