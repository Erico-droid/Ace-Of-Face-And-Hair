import React, {useEffect, useRef} from 'react'
import Card from '../../shared/Card/Card'
import './Landing.css'
import Button from '../../shared/Button/Button'
import LandingImage from '../../Assets/untitled-6.jpg';
import InfoIcon from '@mui/icons-material/Info';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Fade } from '@mui/material';
import Vid from '../../Assets/vidBox.mp4'
import Banner from '../../Assets/untitled-6.jpg'
import $ from "jquery";
import Logo2 from '../../Assets/aofahcute.png';

export default function Landing() {

    const windowHeight = useRef(window.innerHeight);

    if (window.innerWidth > 435 && window.innerWidth < 500) {
        var LandingHeight = parseInt(windowHeight.current) - 118;
        var mgBt = (LandingHeight * ( Math.sqrt(2.855)/6));
    }
    else  if (window.innerWidth <= 434) {
        var LandingHeight = parseInt(windowHeight.current) - 279;
        var mgBt = (LandingHeight * ( Math.sqrt(2.855)/4))
    }
    else {
        var LandingHeight = parseInt(windowHeight.current) - 88;
        var mgBt = 0;
    }

    // var longStory = "Ace of Face and Hair is a versatile company that offers styling services i.e. Hair, Makeup for TV, FILM &amp;  Theatre. We explore the possibilities of Art on the human body. We work behind the scenes to create illusions, concealing or unveiling layers of complexity bending and even breaking conventional rules of beautification. We are fascinated and continue to engage in mixed mediums to tell stories."
    var story = "Ace of Face and Hair offers hair and makeup styling for TV, film, and theatre. We use art to transform the human body and challenge conventional beauty standards. Our work involves concealing or unveiling complexity, and we explore mixed mediums to tell stories.";
   
    useEffect(() => {
        $(document).ready(function() {
            const video = $("#my-video");
            video.attr({"autoplay": true, "muted": true})
            $("#my-video").prop('muted', true);
            
            $("#my-video").bind('play', function (e) {
            $("#my-video").css('opacity', 1.0);
            });
        });

        const video = document.getElementById("my-video");
        video.addEventListener("ended", function() {
        video.style.opacity = 0;
        });


        var scrolledPast = false;
        window.addEventListener('scroll', function checkScroll() {
            const scrollY = window.scrollY;

            if (scrollY > 668 && scrolledPast === false) 
                scrolledPast = true;
            
            if (scrollY > 668 && !video.ended) {
                video.pause();
                video.style.opacity = 0;
            }

            if (scrollY < 368 && !video.ended) {
                video.play();
                video.style.opacity = 1;
            }
            
            if (scrolledPast && video.ended)
                video.style.opacity = 0;
            });

    }, [])
        
    return (
        <div className='container-fluid home-landing'>
            <Card constraints = {"pl-0 pr-0"} background = {"#f5f5f5"} size={12}>
            <div className="landing-container" style={{height: LandingHeight, marginBottom: mgBt}}>
            <div className="overlay"></div>
            <div className="content">

            <div className='main-logo-landing-div'>
                <img src={Logo2}  alt = "Ace Of Face And Hair Main Logo" />
            </div>
            <div className='wording'>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12 col-xs-12'>
                        <p>{story}</p>
                        <div className = "button-container button-parent2">
                            {/* <div className='col-md-6 col-sm-6 col-xs-6'> */}
                                <Button btn={'prim'}>make an appointment</Button>
                            {/* </div> */}
                            {/* <div className='col-md-6 col-sm-6 col-xs-6'> */}
                                <Button icon={<InfoIcon />} btn={'sec'}>Our Story Unfolded</Button>
                            {/* </div> */}
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="video-wrapper" style={{backgroundImage: Banner}}>
                    <video autoPlay id = "my-video" muted poster = "https://vid.alarabiya.net/images/2014/10/14/22d9be89-163d-4f3a-855e-368d6227533f/22d9be89-163d-4f3a-855e-368d6227533f_16x9_1200x676.jpg">
                        <source src={Vid} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            </Card>
        </div>
  )
}
