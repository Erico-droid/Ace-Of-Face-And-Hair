import React from 'react'
import './Footer.css'
import Logo2 from '../../Assets/aofahcute.jpg';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Button from '../../shared/Button/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

export default function Footer() {
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
                                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i> Facebook</a></li>
                                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i> Twitter</a></li>
                                <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i> Pinterest</a></li>
                                <li><a href="#"><i className="fa fa-youtube" aria-hidden="true"></i> YouTube</a></li>
                                <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i> Linkedin</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="kilimanjaro_part m-top-15 pt-lg-5">
                            <ul className="kilimanjaro_links">
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Terms & Conditions</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>About Licences</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Help & Support</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Careers</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Privacy Policy</a></li>
                                <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Community & Forum</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6 col-lg-4 text-center">
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
