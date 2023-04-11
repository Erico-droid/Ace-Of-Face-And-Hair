import React, {useEffect, useRef} from 'react'
import Card from '../../shared/Card/Card'
import './Landing.css'
import Button from '../../shared/Button/Button'
import LandingImage from '../../Assets/untitled-6.jpg';
import InfoIcon from '@mui/icons-material/Info';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { Fade } from '@mui/material';
import $ from "jquery";

export default function Landing() {

    const windowHeight = useRef(window.innerHeight);
    const LandingHeight = parseInt(windowHeight.current) - 118;


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

        // window.addEventListener('scroll', () => {
        // const rect = video.getBoundingClientRect();
        // const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        // if (isVisible) {
        //     video.play();
        // } else {
        //     video.pause();
        // }
    // });

    }, [])
        
    return (
        <div className='container-fluid'>
            <Card constraints = {"pl-0 pr-0"} size={12}>
            <div className="landing-container" style={{height: LandingHeight}}>
            <div className="overlay"></div>
            <div className="content">
            <div className='wording'>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12 col-xs-12'>
                        <p>Ace of Face and Hair is a versatile company that offers styling services i.e. Hair, Makeup for TV, FILM &amp;
                            Theatre. We explore the possibilities of Art on the human body. We work behind the scenes to create
                            illusions, concealing or unveiling layers of complexity bending and even breaking conventional rules of
                            beautification. We are fascinated and continue to engage in mixed mediums to tell stories.
                        </p>
                        <div className='row text-sm-center text-xl-left text-lg-left button-parent'>
                            <div className='col-md-6 col-sm-6 col-xs-6'>
                                <Button btn={'prim'}>make an appointment</Button>
                            </div>
                            <div className='col-md-6 col-sm-6 col-xs-6'>
                                <Button icon={<InfoIcon />} btn={'sec'}>Our Story Unfolded</Button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="video-wrapper">
                    <video autoPlay id = "my-video" muted poster = "https://vid.alarabiya.net/images/2014/10/14/22d9be89-163d-4f3a-855e-368d6227533f/22d9be89-163d-4f3a-855e-368d6227533f_16x9_1200x676.jpg">
                        <source src="https://media.istockphoto.com/id/1317499240/video/young-woman-hiking-and-looking-at-camera.mp4?s=mp4-640x640-is&k=20&c=RRKwc-dZR6ENt0CGaAmKV5rEunUjRCZF6Qznl1zgev8=" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            </Card>
        </div>
  )
}
