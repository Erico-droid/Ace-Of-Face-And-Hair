import React, { useEffect, useRef } from 'react'
import "./Courses.css"
import Heading from '../../shared/Heading/Heading';
import FancyHeading from '../../shared/FancyHeading/FancyHeading';
import Button from '../../shared/Button/Button';
import SchoolIcon from '@mui/icons-material/School';

export default function Courses() {
    const ref = useRef();
    const loadAnimation = () => {
        const figure = document.getElementById('widget-demo');
        let step = 1; 

        const intervalId = setInterval(function() {
            if (step <= 10) {
                
            figure.classList.replace('step_' + (step - 1), 'step_' + step);
            step++; 
            } else {
            clearInterval(intervalId);
            }
        }, 1000);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                loadAnimation();
            }
        });

        observer.observe(ref.current);

        return () => {
            observer.unobserve(ref.current);
        }
    }, []);


    return (
    <div className='container-fluid widgets-loaded' ref={ref}>
        <div className = "bg-white courses card mt-4">
            <div className='row'>
                    <div className='jeez col-md-6 order-md-1 order-2'>
                        <div className = "content-h">
                            <div className = "heading-group">
                                <FancyHeading>Checkout Our</FancyHeading>
                                <Heading>courses</Heading>
                            </div>
                            <div className='content-text text-left'>
                                    <p>Our Basic Makeup Course offers more than just makeup skills, including eyebrow tattoo artistry. You will learn advanced techniques to enhance your beauty and makeup expertise. Whether you're looking to pursue a career in the beauty industry or simply improve your skills, our training can help you reach your goals. Join our course today and expand your makeup artistry knowledge.</p>
                            </div>
                            <div className = "text-center">
                                <Button btn={"outline"} icon = {<SchoolIcon />}>View Our Courses</Button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 div-lg-6 div-xl-6 order-md-2 order-1'>
                        {/* <section className="_container_uazc9_9">
                            <div className="_inner_uazc9_23"> */}
                                <div className="_graphic_uazc9_169">
                                    <figure id="widget-demo" className="_demo_uazc9_255 step_1" aria-label="Animation showing responsive widget layout options">
                                        <div className="demo__item" style={{backgroundColor: "rgb(101, 31, 15)"}}>
                                            <img data-src="https://scontent-gru1-2.cdninstagram.com/v/t51.29350-15/342063834_1603452876823593_1483792821225300110_n.jpg?_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=dDxqaGkZsWcAX-P860j&amp;_nc_ht=scontent-gru1-2.cdninstagram.com&amp;edm=APCawUEEAAAA&amp;oh=00_AfAqxMqOKyhUi8NR4KgOf3NDlboj_JFziqi30PJ1zvQYvQ&amp;oe=64461C25" role="presentation" alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(190, 123, 61)"}}>
                                            <img data-src="https://scontent-gru1-1.cdninstagram.com/v/t51.29350-15/341876257_3499307537021956_5962490852652229595_n.jpg?_nc_cat=101&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=IbQR3bTvOnYAX-UsW3T&amp;_nc_ht=scontent-gru1-1.cdninstagram.com&amp;edm=APCawUEEAAAA&amp;oh=00_AfBiTkcDtGftyspyv67ByLs1Vwz9pav-S7B36bHEbFyMmA&amp;oe=6445E7A6" role="presentation" alt="" src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg" className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(196, 211, 213)"}}>
                                            <img data-src="https://scontent-gru1-1.cdninstagram.com/v/t51.29350-15/342227378_1257435034979101_4464677268968355861_n.webp?stp=dst-jpg&amp;_nc_cat=104&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=4SL4o_oDrXUAX9ItzMw&amp;_nc_ht=scontent-gru1-1.cdninstagram.com&amp;edm=APCawUEEAAAA&amp;oh=00_AfDHjwGiJmEmZM3-DB5Zl7tiCSJ2G0AFsDwAClZnrV-C4g&amp;oe=64472B08" role="presentation" alt="" src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=" className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(160, 174, 193)"}}>
                                            <img data-src="https://scontent-gru2-1.cdninstagram.com/v/t51.29350-15/341847230_6011676065552333_1982212502641724321_n.jpg?_nc_cat=107&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=_jh9uNmQEngAX8ulBV6&amp;_nc_ht=scontent-gru2-1.cdninstagram.com&amp;edm=APCawUEEAAAA&amp;oh=00_AfCH8835A5rii_9CtGuF6QPtQsKiHpYEcAeWsrt29GJMnA&amp;oe=64472E5C" role="presentation" alt="" src="https://media.istockphoto.com/id/637912692/photo/nairobi-cityscape-capital-city-of-kenya.jpg?s=612x612&w=0&k=20&c=S8wPNq9om-IMcapXFC030ew28nhpYCFYBStX5yxCQbs=" className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(195, 142, 72)"}}>
                                            <img data-src="https://scontent-gru2-2.cdninstagram.com/v/t51.29350-15/341908576_203747209073332_8121650024374596166_n.webp?stp=dst-jpg&amp;_nc_cat=102&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=0DwH7ggQGuwAX_N6Q33&amp;_nc_ht=scontent-gru2-2.cdninstagram.com&amp;edm=APCawUEEAAAA&amp;oh=00_AfCrH-_1KKo7buSQHTAsWkbWYSwXhSf6y8B8I5VPWyXx5w&amp;oe=6446264B" role="presentation" alt="" src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg" className="loaded"/></div><div className="demo__item" style={{backgroundColor: "rgb(177, 149, 132)"}}>
                                            <img data-src="https://scontent-gru2-1.cdninstagram.com/v/t51.29350-15/342384628_938476810809173_8688402124848942054_n.jpg?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=sEOtjV6qLCkAX_Fp7rs&amp;_nc_ht=scontent-gru2-1.cdninstagram.com&amp;edm=APCawUEEAAAA&amp;oh=00_AfCXVzdYUVYDM5tgfklIbFK9q8hKrgpoIooIWCYgLbjpyg&amp;oe=64471214" role="presentation" alt="" src="https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg" className="loaded"/></div>
                                        </figure>
                                    </div>
                                {/* </div>
                        </section> */}
                    </div>
                <div className='course'>
                </div>
            </div>
        </div>
    </div>
  )
}
