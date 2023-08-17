import React, {useState, useEffect} from 'react'
import "./AFHDetails.css"
import Art from "../../Assets/contactArt.jpg"
import svg from "../../Assets/shapes.svg"
import axios from 'axios';
import proxy from '../../proxy.json'

export default function AFHDetails() {
    const [isChecked, setIsChecked] = useState(false);
    const [testimonials, setTestimonials] = useState([])
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }

    const getTestimonials = async () => {
        const url = `${proxy.proxy}/general_setting/testimonials`
        const response = await axios.get(url)
        setTestimonials(response.data)
    }

    let counter = 0;

    useEffect(() => {
        getTestimonials()
    }, [])
 return (
    <div className = "container">
        <div className='image-dots-why-area'>
              <svg aria-hidden="true" className="shape shape__inner image-dots" style={{color:" #fff"}} data-v-67de5fba="">
                <use xlinkHref={`${svg}#dots`} data-v-67de5fba="">
                  </use>
              </svg>
            </div>
        <div className = "row">
            <div className='col-md-6 order-2'>
                <div className='details-section'>
                    <div className='heading-group-wording'>
                    <h3 className = "wordheading" style = {{color: "#ffffff"}}> Explore Our Diverse Collection of Work.</h3>
                    <p style = {{color: "#ffffff"}}>
                    primeForce Property Manager Plus is a custom-built solution for complex businesses managing thousands of units. Flexible workflows allow you to consistently execute processes, seamlessly deliver exceptional experiences, and quickly gain full transparency, even if you have a large team working across many properties.
                    </p>
                    <ul className="two-column-list">
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 1</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 2</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 3</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 4</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 5</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 6</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 7</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 8</li>
                    </ul>
                    <div className='testimonial-area'>
                    <div class="slider"> 
                        {testimonials.map(() => {                            
                            counter++;
                            return (
                            <input type="radio" name="slider" title={`slide${counter}`} class="slider__nav"/>
                            )
                        })}
                        <div class="slider__inner">
                            {testimonials.map((Testimonial) => {
                            return (<div class="slider__contents"><i class="slider__image fa fa-diamond"></i>
                            <p class="slider__txt">{Testimonial.testimonial}</p>
                            <p className='change-text2'>~ {Testimonial.testimonial_by}</p>
                            </div>
                            )})}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='col-md-6 order-1'>
                <div className = "img-fluid-big">
                    <img src= {Art} alt= "why AFH image (Why Choose us?)" />
                </div>
            </div>
        </div>
    </div>
  )
}
