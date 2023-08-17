import React, { useEffect, useRef } from 'react'
import "./Courses.css"
import Heading from '../../shared/Heading/Heading';
import FancyHeading from '../../shared/FancyHeading/FancyHeading';
import Button from '../../shared/Button/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import svg from "../../Assets/shapes.svg";
import img from '../../Assets/c1.jpg'
import img2 from '../../Assets/c2.jpg'
import img3 from '../../Assets/c3.webp'
import img6 from '../../Assets/c6.jpg'
import img4 from '../../Assets/c4.jpg'
import img5 from '../../Assets/c5.jpg'

export default function Courses() {
    const ref = useRef();
    const loadAnimation = () => {
        const figure = document.getElementById('widget-demo');
        let step = 1; 

        const intervalId = setInterval(function() {
            if (step <= 10) {
                
            figure.classList.replace('step_' + (step - 1), 'step_' + step);
            step++; 
            } else {
            clearInterval(intervalId);
            }
        }, 1000);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                loadAnimation();
            }
        });

        observer.observe(ref.current);

        return () => {
            if (ref.current instanceof Element) {
                observer.unobserve(ref.current);
            };
        }
    }, []);


    return (
    <div className='container widgets-loaded' ref={ref}>
        <div className = "courses mt-4">
            <div className='image-dots shape'>
              <svg aria-hidden="true" className="shape__inner image-dots" style={{color:" #0a6143"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#dots-2`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='image-dots-2 shape'>
              <svg aria-hidden="true" className="shape__inner image-dots" style={{color:" #0a6143"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#dots-2`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='row'>
                    <div className='jeez col-md-6 order-md-1 order-2'>
                        <div className = "content-h">
                        <div className='heading-group-wording'>
                                <h3 className = "wordheading"> Elevate Your Skills with Our Comprehensive Courses.</h3>
                            </div>
                            <div className='content-text text-left'>
                                    <p>Our Basic Makeup Course offers more than just makeup skills, including eyebrow tattoo artistry. You will learn advanced techniques to enhance your beauty and makeup expertise. Whether you're looking to pursue a career in the beauty industry or simply improve your skills, our training can help you reach your goals. Join our course today and expand your makeup artistry knowledge.</p>
                            </div>
                            <div className = "text-left">
                                {/* <Button btn={"outline"} icon = {<ArrowForwardIcon />}>View Our Courses</Button> */}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 div-lg-6 div-xl-6 order-md-2 order-1'>
                        {/* <section className="_container_uazc9_9">
                            <div className="_inner_uazc9_23"> */}
                                <div className="_graphic_uazc9_169">
                                    <figure id="widget-demo" className="_demo_uazc9_255 step_1" aria-label="Animation showing responsive widget layout options">
                                        <div className="demo__item" style={{backgroundColor: "rgb(101, 31, 15)"}}>
                                            <img data-src={img} role="presentation" alt="" src={img} className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(190, 123, 61)"}}>
                                            <img data-src={img2} role="presentation" alt="" src={img2} className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(196, 211, 213)"}}>
                                            <img data-src={img3} role="presentation" alt="" src={img3} className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(160, 174, 193)"}}>
                                            <img data-src={img4} role="presentation" alt="" src={img4} className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(195, 142, 72)"}}>
                                            <img data-src={img5} role="presentation" alt="" src={img5} className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(177, 149, 132)"}}>
                                            <img data-src={img6} role="presentation" alt="" src={img6} className="loaded"/></div>
                                        </figure>
                                    </div>
                                {/* </div>
                        </section> */}
                    </div>
            </div>
        </div>
    </div>
  )
}
