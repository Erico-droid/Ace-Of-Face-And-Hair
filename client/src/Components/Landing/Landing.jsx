import React from 'react'
import Card from '../../shared/Card/Card'
import './Landing.css'
import Button from '../../shared/Button/Button'
import LandingImage from '../../Assets/untitled-6.jpg';

export default function Landing() {
  return (
    <div className='container-fluid'>
        <Card size={12}>
            <div className='landing-classic'>
                {/* <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css' /> */}

                <div className = "art">
                    <div className='container-fluid'>
                       <div className='wording'>
                            <div className='row'>
                                <div className='col-md-6'>
                                <p>Ace of Face and Hair is a versatile company that offers styling services i.e. Hair, Makeup for TV, FILM &amp;
                                    Theatre. We explore the possibilities of Art on the human body. We work behind the scenes to create
                                    illusions, concealing or unveiling layers of complexity bending and even breaking conventional rules of
                                    beautification. We are fascinated and continue to engage in mixed mediums to tell stories.
                                </p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <Button btn={'prim'}>make an appointment</Button>
                                    </div>
                                    <div className='col-md-6'>
                                        <Button btn={'sec'}>view our portfolio</Button>
                                    </div>
                                </div>
                                </div>
                                <div className='col-md-6'>

                                </div>
                            </div>
                        </div> 
                    </div>
                </div>

                <video autoPlay loop id="video-background" poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148422/screencap-wheel.png" muted>
                    <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/148422/Vienna-SD.mp4" type="video/mp4" />
                </video>
            </div>
        </Card>
    </div>
  )
}
