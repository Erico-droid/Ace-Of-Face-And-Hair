import React, {useState, useEffect, useRef} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

export default function ItemSlider(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    async function getImages() {
        var object = [];
        var random = Math.round(Math.random() * 50);
        const client = createClient('aqrcwOOWlZKCTMFRklR8ZZSoJ50WJ3gqtbNovW5nFCAonmcQhSWFGDwF');
        client.photos.curated({ per_page: 12, page: random })
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

    function loadSlider() {


        try {
            $(document).ready(function() {
                // $('#carouselExample').carousel({
                //     interval: 1000,
                //     pause: 'hover',
                //     wrap: false
                // });

                $.noConflict();
                $('#carouselExample').on('slide.bs.carousel', function(e) {
                    var $e = $(e.relatedTarget);

                    console.log($e);
                    var idx = $e.index();
                    var itemsPerSlide = 4;
                    var totalItems = $('.carousel-item').length;
                    console.log(totalItems);
        
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
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
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
         <div className="container page-top">

        <div className="container">
            <div id="carouselExample" className="carousel slide" data-ride="carousel" data-interval="9000">
                <div className="carousel-inner row w-100 mx-auto" role="listbox">
                    <div className="carousel-item col-md-3  active">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/907267/pexels-photo-907267.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/907267/pexels-photo-907267.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Diane</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/1036628/pexels-photo-1036628.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/1036628/pexels-photo-1036628.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>John Doe</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="
        https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Margaret E</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/452738/pexels-photo-452738.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/372042/pexels-photo-372042.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Dolor</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/843256/pexels-photo-843256.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/326559/pexels-photo-326559.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Mr.Lorem</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/119972/pexels-photo-119972.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Dipendra</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/274011/pexels-photo-274011.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Paul</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item col-md-3  ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="myback-img ">
                                    <img src="https://images.pexels.com/photos/734725/pexels-photo-734725.jpeg?auto=compress&cs=tinysrgb&h=350" className="" />
                                </div>
                                <div className="myoverlay"></div>
                                <div className="profile-img">
                                    <div className="borders avatar-profile">
                                        <img src="https://images.pexels.com/photos/211050/pexels-photo-211050.jpeg?auto=compress&cs=tinysrgb&h=350" />
                                    </div>
                                </div>
                                <div className="profile-title">
                                    <a href="#">
                                        <h3>Ipsum</h3>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
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
  </div> 
        </FadeIn>
      }  
      </>
    )
}
