import React, {useState, useEffect} from 'react'
import "./AFHDetails.css"
import Art from "../../Assets/contactArt.jpg"
import svg from "../../Assets/shapes.svg"
import axios from 'axios';
import proxy from '../../proxy.json'

export default function AFHDetails() {
    const [isChecked, setIsChecked] = useState(false);
    const [testimonials, setTestimonials] = useState([])
    const [sliderInner, setSliderInner] = useState(0)
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }

    const getTestimonials = async () => {
        const url = `${proxy.proxy}/general_setting/testimonials`
        const response = await axios.get(url)
        let width = response.data.length * 100
        width = width.toString() + '%'
        setSliderInner(width)
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
                    <h3 className = "wordheading" style = {{color: "#ffffff"}}>Always looking forward to working with you.</h3>
                    <p style = {{color: "#ffffff"}}>
                    We have always been dedicated to giving our customers the best services and the excellent value for your time and dedication towards you working with us. We have listed down a couple of sevices that we offer and some testimonials of some of the clients we have worked with in the past.
                    </p>
                    <ul className="two-column-list">
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Professional Makeup Artistry</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Photoshoots</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Training and Masterclasses</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Special Effects and Prosthetics</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Costume and Set Design</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Mixed Medium Storytelling</li>
                        <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Hair Styling</li>
                        {/* <li><svg id="small-checkmark" viewBox="0 0 16 16" aria-hidden="true" width="32" height="32" className="icon feature-icon" data-v-962c30ae="" data-v-35214c05="">
                        <path d="M13.2348 5.67829C13.6094 5.27246 13.5841 4.63981 13.1783 4.2652C12.7725 3.8906 12.1398 3.9159 11.7652 4.32172L6.41899 10.1135L3.65081 7.74075C3.23148 7.38133 2.60018 7.42989 2.24076 7.84921C1.88134 8.26854 1.9299 8.89984 2.34923 9.25926L5.84923 12.2593L6.58105 12.8865L7.23482 12.1783L13.2348 5.67829Z" data-v-962c30ae=""></path>
                        </svg>Item 8</li> */}
                    </ul>
                    <div className='testimonial-area'>
                    <div className="slider" style={testimonials.length > 0 ? null: {alignItems: "center"}}> 
                    {testimonials.length > 0 ?
                        testimonials.map(() => {                            
                            counter++;
                            return (
                            <input type="radio" name="slider" title={`slide${counter}`} className="slider__nav"/>
                            )
                        }): null }
                        {testimonials.length > 0 ?
                        <div className="slider__inner" style={{width: sliderInner}}>
                            {testimonials.map((Testimonial) => {
                            return (<div className="slider__contents"><i className="slider__image fa fa-diamond"></i>
                            <p className="slider__txt">{Testimonial.testimonial}</p>
                            <p className='change-text2'>~ {Testimonial.testimonial_by}</p>
                            </div>
                            )})}
                        </div> :
                        <p style={{color: "#fff"}}>There aren't any testimonials at the moment</p>
                        }
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
