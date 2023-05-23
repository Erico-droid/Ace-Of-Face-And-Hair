import React, {useEffect, useRef, useState} from 'react'
import "./GoalsSection.css";
import Typewriter, {typeString} from 'typewriter-effect/dist/core';
import { useLocation } from 'react-router-dom';
import svg from "../../Assets/shapes.svg"

export default function GoalsSection() {
    const ref = useRef();
    const [text, setText] = useState("Empowering individuals with exceptional, inclusive styling services.");

    var checker = false;

    function TypeWriter() {
        var story = document.querySelector(".type-goal");
        const heading = story.querySelector('h2');
        var typeWriter = new Typewriter(heading);
        var arr = ["We liberate individuals to showcase their genuine identity through art.", "We empower people to express their authentic selves through style and art.", "We enable individuals to exhibit their true selves through style and art.", "We unleash the power of self-expression through the art of the human form."]
        var random = Math.round(Math.random() * arr.length - 1);
        if (random < 0)
            random = 1;
        typeWriter.typeString(arr[random]).pauseFor(500).start();
    }

    function handleClick (evt) {
        var button  = evt.target;
        var toBeRemoved = document.querySelector("#nav-tab .active");
        toBeRemoved.classList.remove("active");
        button.classList.add('active');
        var attr = button.getAttribute("data-bs-target");
        var showTab = document.querySelector(`#nav-tabContent ${attr}`);
        var toBeRemoved = document.querySelector("#nav-tabContent .active");
        toBeRemoved.classList.remove("active");
        toBeRemoved.classList.remove("show");
        showTab.classList.add("active");
        showTab.classList.add("show");
        changeText();
    }

    function changeText() {
        var target = document.querySelector("#nav-tab .active");
        var aria = target.getAttribute("aria-controls");
        if (aria === "nav-vision")
            setText("Unleashing unique beauty through diversity and authenticity.");
        if (aria === "nav-who")
            setText("Empowering individuals with exceptional, inclusive styling services.");
        if (aria === "nav-history") 
            setText("Exceeding expectations with professionalism, creativity, and inclusivity.");
    }
    

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (!checker){
                    TypeWriter();
                    checker = true;
                }
            } 
        });

        const element = ref.current;
        observer.observe(element);

        return () => {
            if (element instanceof Element) {
                observer.unobserve(element);
                checker = false;
            }
        }
    }, [])

    return (
        <div className='container'>
        <div className='our-section' ref={ref}>
            <div className='image-dots-type-write shape'>
              <svg aria-hidden="true" className="shape__inner image-dots" style={{color:" #0a6143"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#dots`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='image-square-type-write shape'>
              <svg aria-hidden="true" className="shape__inner image-dots" style={{color:" #155bd5"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#square`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='image-square-2-type-write shape'>
              <svg aria-hidden="true" className="shape__inner image-dots" style={{color:" #00aeae"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#square`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
            <div className='combined-sections'>
                <div className = "row">
                    <div className='col-md-6'>
                        <div className='type-goal'>
                            <h2 className='h2-type'>
                                
                            </h2>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <section className="about-area about-five">
                            <div className="about-five-content">
                                <h6 className="small-title change-text text-lg">{text}</h6>
                                <div className="about-five-tab">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-who-tab" onClick = {handleClick} data-bs-toggle="tab" data-bs-target="#nav-who"
                                        type="button" role="tab" aria-controls="nav-who" aria-selected="true">Our Goal</button>
                                    <button className="nav-link" id="nav-vision-tab" onClick = {handleClick} data-bs-toggle="tab" data-bs-target="#nav-vision"
                                        type="button" role="tab" aria-controls="nav-vision" aria-selected="false">our Vision</button>
                                    <button className="nav-link" id="nav-history-tab" data-bs-toggle="tab" data-bs-target="#nav-history"
                                        type="button" role="tab" aria-controls="nav-history" onClick = {handleClick} aria-selected="false">What to expect</button>
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade active show" id="nav-who" role="tabpanel" aria-labelledby="nav-who-tab">
                                    <p>At Ace of Face and Hair, our goal is to provide exceptional styling services that go above and beyond our clients' expectations. We believe in fostering a diverse and inclusive community that celebrates individuality, and we strive to stay up-to-date with the latest trends and techniques in the industry.</p>
                                    </div>
                                    <div className="tab-pane fade" id="nav-vision" role="tabpanel" aria-labelledby="nav-vision-tab">
                                    <p>Our vision at Ace of Face and Hair is to revolutionize the beauty industry by offering an innovative and creative approach to styling that empowers individuals to embrace their unique selves and feel confident in their own bodies. We believe in the art of the human body and strive to enhance its natural beauty through our services.</p>
                                    
                                    </div>
                                    <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                                    <p>Expect our stylists to be creative and innovative, offering fresh and unique ideas while staying up-to-date with the latest industry trends and techniques. We are dedicated to providing personalized services that exceed expectations and leave clients feeling confident and satisfied.</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
