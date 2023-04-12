import React, {useState, useEffect, useRef} from 'react'
import { createClient } from 'pexels';
import Axios from 'axios';
import "./ItemSlider.css";
import Card from "../../shared/Card/Card";
import Placeholder from './Placeholder'
import FadeIn from 'react-fade-in/lib/FadeIn';
import $ from 'jquery';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import {Carousel} from 'bootstrap';
import Heading from '../../shared/Heading/Heading';
import FancyHeading from '../../shared/FancyHeading/FancyHeading';

export default function ItemSlider(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    async function getImages() {
        var object = [];
        var random = Math.round(Math.random() * 50);
        const client = createClient('aqrcwOOWlZKCTMFRklR8ZZSoJ50WJ3gqtbNovW5nFCAonmcQhSWFGDwF');
        client.photos.curated({ per_page: 16, page: random })
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

    const carouselRef = useRef(null);

    function getSlider() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                const carouselwareva = document.getElementById("carouselExample");
                if (carouselwareva)
                    resolve(carouselwareva);
                else
                    reject("There was an unexpected error");
              }, 1000);
        });
    }

    function loadSlider() {
        getSlider()
        .then((result) => {
            const carouselElement = result;
            if (carouselElement) {
                const carousel = new Carousel(carouselElement);
                
                $('#carouselExample').carousel({
                    interval: 2000
                });

                $(document).ready(function() {
                    $('#carouselExample').on('slide.bs.carousel', function(e) {

                        var $e = $(e.relatedTarget);
                        var idx = $e.index();
                        var itemsPerSlide = 4;
                        var totalItems = $('.carousel-item').length;
                        
                        if (idx >= totalItems - (itemsPerSlide - 1)) {
                            var it = itemsPerSlide - (totalItems - idx);
                            for (var i = 0; i < it; i++) {
                                // append slides to end
                                if (e.direction == "left") {
                                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                                } else {
                                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                                }
                            }
                        }
                    });
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
        
    }

    useEffect(() => {

        console.log(images);
        getImages();
        loadSlider();
    }, [])

    return (
      <>
      {loading ? 
        
        <div style={{ width: "100%"}}>
          <Placeholder />
        </div>
        :
        <FadeIn>
         <div className="container">
            <div className='heading-group'>
                <FancyHeading>Discover our</FancyHeading>
                <Heading wording={"Services"}>Services</Heading>
            </div>
                <div id="carouselExample" ref={carouselRef} className="carousel slide" data-ride="carousel" data-interval="9000">
                    <div className="carousel-inner row w-100 mx-auto">
                        {images.map((Image, index) => {
                            return (
                                <div className={index === 0 ? "carousel-item col-sm-6 col-xs-12 col-md-3 active" :  "carousel-item col-sm-12 col-xs-12 col-md-3" } key={Image.id}>
                                    <div className="card h-100">
                                            <div className="card-body">
                                                <div className="myback-img ">
                                                    <img src={Image.src["large"]} className="" />
                                                </div>
                                                <div className="myoverlay"></div>
                                                <div className="profile-img">
                                                    <div className="borders avatar-profile">
                                                        <img src={Image.src["large"]} />
                                                    </div>
                                                </div>
                                                <div className="profile-title">
                                                    <a href="#">
                                                        <h3>{Image.photographer}</h3>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            )
                            index++;
                        })}                   
                        
                </div>
                    <a className="card carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
                        <IconButton>
                        <ArrowBackIosNewIcon  style={{ fontSize: 35, color: "#000", fontWeight: 800}}/>
                        </IconButton>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="card carousel-control-next text-faded" href="#carouselExample" role="button" data-slide="next">
                        <IconButton>
                        <ArrowForwardIosIcon style={{ fontSize: 35, color: "#000", fontWeight: 800}}/>
                        </IconButton>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div> 
        </FadeIn>
      }  
      </>
    )
}
