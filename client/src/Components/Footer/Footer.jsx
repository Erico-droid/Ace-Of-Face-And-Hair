import React from 'react'
import './Footer.css'
import Logo2 from '../../Assets/aofahcute.png';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Button from '../../shared/Button/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {Link} from "react-router-dom"

export default function Footer(props) {
    let currentYear = new Date().getFullYear();

  return (

<footer className="kilimanjaro_area">
    <div className=''></div>
        <div className="foo_top_header_one section_padding_100_70">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="kilimanjaro_part text-center">
                            {/* <h5>About Us</h5> */}
                            <img src={Logo2} className = "logo-2" alt="Ace of Face and Hair Logo 2" />
                            </div>
                        <div className="kilimanjaro_part m-top-15">
                            {/* <h5>Social Links</h5> */}
                            <ul className="kilimanjaro_social_links">
                                <li><a target = "_blank" href="https://web.facebook.com/aceoffaceandhair/"><FacebookIcon style={{color: "#1877f2"}} /> Facebook</a></li>
                                <li><a target = "_blank" href="https://www.instagram.com/aceoffaceandhair/"><InstagramIcon style = {{ background: '-webkit-linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)',
                                                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} />Instagram</a></li>
                                <li><a target = "_blank" href="https://www.youtube.com/@aceoffaceandhair1961"><YouTubeIcon style = {{color: "#FF0000"}}/> YouTube</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="kilimanjaro_part m-top-15 pt-lg-5">
                            <h5 className='text-center'>Quick Links</h5>
                            <ul className="kilimanjaro_links">
                                <li><Link to={"/"}><i className="fa fa-angle-right" aria-hidden="true"></i>Home (Ace Of Face And Hair)</Link></li>
                                <li><Link to={"/portfolio"}><i className="fa fa-angle-right" aria-hidden="true"></i>Our Portfolio (Completed Projects)</Link></li>
                                <li><Link to={"/about"}><i className="fa fa-angle-right" aria-hidden="true"></i>About us / Our Story</Link></li>
                                <li className="footer-cancelled" title='coming soon...'><Link ><i className="fa fa-angle-right" aria-hidden="true"></i>Shop (Our Services)</Link></li>
                                <li><Link to={"/contact"}><i className="fa fa-angle-right" aria-hidden="true"></i>Get in touch (Contact Us)</Link></li>
                                <li><Link to={"/contact"}><i className="fa fa-angle-right" aria-hidden="true"></i>Frequently Asked Questions (FAQ)</Link></li>
                                <li><Link to={"/dashboard"}><i className="fa fa-angle-right" aria-hidden="true"></i>Dashboard</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6 col-lg-4 text-left">
                        <div className="kilimanjaro_part pt-lg-5">
                            <div className="kilimanjaro_single_text">
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                Aenean commodo ligula eget dolor. Aenean massa. 
                                Cum sociis natoque penatibus et magnis dis parturient montes, 
                                nascetur ridiculus mus. Donec quam felis, ultricies nec, 
                                pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. 
                                Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. 
                                </p>
                            <div className='text-center'>
                                <Button btn={'prim'}>Book an appointment</Button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className=" kilimanjaro_bottom_header_one section_padding_50 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <p>All rights reserved {currentYear}. &#169; Ace Of Face And Hair</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
