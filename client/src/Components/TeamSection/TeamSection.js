import React from 'react'
import "./TeamSection.css"
import FancyHeading from "../../shared/FancyHeading/FancyHeading"
import Heading from '../../shared/Heading/Heading'
import Vickie from '../../Assets/victor.png'
import Charles from '../../Assets/charles.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function TeamSection() {
  return (
    <div className='container-fluid'>
        <div className='team'>
            <div className='heading-group'>
                <FancyHeading>Discover the dedicated</FancyHeading>
                <Heading>crew behind AFH</Heading>
            </div>
            <div className="team-boxed">
        <div className="container">
          <div className="content-div">
            <div className="row people">
                <div className="col-md-6 col-lg-6 item">
                    <div className="box"><img className="rounded-circle" src={Charles} />
                        <h3 className="name">Charles Nderitu</h3>
                        <p className="title">Founder and Creative</p>
                        <p className="description">Loved by students and staff alike, Charles brings knowledge, enthusiasm, and joy to Ace of Face & Hair. As our Course Coordinator, he is an invaluable member of the team.</p>
                        <div className="social"><a href="#"><FacebookIcon /></a><a href="#"><TwitterIcon /></a><a href="#"><InstagramIcon /></a></div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 item">
                    <div className="box"><img className="rounded-circle" src={Vickie} />
                        <h3 className="name">Wachira wa Kahihia</h3>
                        <p className="title">Founder and Creative</p>
                        <p className="description">Since founding Ace of Face & Hair, Wachira has consistently brought a passion and dedication with him each day. He has over 15 years experience in the cosmetology world.</p>
                        <div className="social"><a href="#"><FacebookIcon /></a><a href="#"><TwitterIcon /></a><a href="#"><InstagramIcon /></a></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
        </div>
    </div>
  )
}
