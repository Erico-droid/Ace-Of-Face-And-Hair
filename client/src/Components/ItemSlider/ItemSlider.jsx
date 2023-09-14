import React, {useState, useEffect, useRef} from 'react'
import "./ItemSlider.css";
import Placeholder from './Placeholder'
import FadeIn from 'react-fade-in/lib/FadeIn';
import Button from '../../shared/Button/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import svg from "../../Assets/shapes.svg";
import afh1slide from "../../Assets/afh1slide.webp"
import afh2slide from "../../Assets/afh2slide.webp"

export default function ItemSlider(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    // async function getImages() {
    //     var object = [];
    //     var random = Math.round(Math.random() * 50);
    //     const client = createClient('aqrcwOOWlZKCTMFRklR8ZZSoJ50WJ3gqtbNovW5nFCAonmcQhSWFGDwF');
    //     client.photos.curated({ per_page: 8, page: random })
    //       .then(response => {
    //           object = response.photos;
    //           return object;
    //       })
    //       .then (response => {
    //         setImages(response);
    //         setLoading(false);
    //       })
    //       .catch(err => {
    //         throw err;
    //       });
    // }

    // const carouselRef = useRef(null);



    useEffect(() => {
        // getImages();
    }, [])

    const PlaceHolderSettings = () => {
        if (props.darkmode)
          return <Placeholder backgroundColor="grey" foregroundColor="#ecebeb" />
        else
          return <Placeholder backgroundColor="#f3f3f3" foregroundColor="#ecebeb" />
      }

    return (
      <div className = "services-inner">
      {loading ? 
        
        <div style={{ width: "100%"}}>
          {PlaceHolderSettings()}
        </div>
        :
        <FadeIn>
          <div className='service-desktop-content'>
            <div className="container-xl container-fluid-md">
            <div className='shape-work-left shape '>
              <svg aria-hidden="true" className="shape__inner top-right" style={{color:" #cd7a00"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#triangle`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='shape-work-top-left shape '>
              <svg aria-hidden="true" className="shape__inner top-right" style={{color:" #000"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#dots`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
                <div className = 'row'>
                    <div className='col-md-6'>
                    <div className='service-text-home'>
                        <div className='centralizer'>
                            <div className='heading-group-wording text-center'>
                                <h3 className = "wordheading"> Explore Our Diverse Collection of Work.</h3>
                            </div>
                            <div className='p-wording text-center'>
                                <p className='text-left'>Ace of Face and Hair offers leading makeup artistry and hair styling services for TV, film, and theatre productions. With a team of certified professionals, we excel in creating captivating looks and special effects. Our expertise spans across events, editorial photography, and working with celebrities, actors, and institutions.</p>
                                <Button btn = {"sec"} icon = {<ArrowRightAltIcon />}>View Our Services</Button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className="photo-album">
                        <div className='floater'>
                            <img src={afh2slide} className = "img-1" alt="" />
                            <img src={afh1slide} className = "img-2" alt="" />
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div> 
            </div>
            <div className='service-mobile-content'>
                <div className='container-fluid'>
                    <div className='mobile-all-content'>
                        <div className='mobile-images'>
                        <img src={afh2slide} className = "img-1" alt="" />
                            <img src={afh1slide} className = "img-2" alt="" />
                      </div>
                  </div>
                  <div className='mobile-wording'>
                            <div className='heading-group-wording text-center'>
                                <h3 className = "wordheading"> Explore Our Diverse Collection of Work.</h3>
                            </div>
                            <div className='p-mobile-wording text-center'>
                                <p className='text-left'>
                                Ace of Face and Hair offers hair and makeup styling for TV, film, and theatre. We use art to transform the human body and challenge conventional beauty standards. Our work involves concealing or unveiling complexity, and we explore mixed mediums to tell stories.
                                </p>
                                <Button btn = {"sec"} icon = {<ArrowRightAltIcon />}>View Our Services</Button>
                            </div>
                      </div>
                </div>
            </div>  
        </FadeIn>
      }  
      </div>
    )
}
