import React, { useEffect } from 'react';
import "./Story.css"

export default function Story() {
    return (
        <div className='our-story-area' id='storyDiv'>
                <div className='cont'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 order-2' style = {{minHeight: "550px"}}>
                                <div className = "about-us-word">
                                    <h3 className = "wordheading text-right mt-md-3" >Get Our Story Right.</h3>
                                    <p>
                                    We would like to introduce Ace Of Face and Hair company. We are a leading team of creative
                                    artists specializing in Makeup Artistry and Hair styling.
                                    Ace of face and Hair company has been in existence since 2012. The team comprises of
                                    certified professionals in the industries of hair, makeup photography, costume and marketing.
                                    Our experience includes working in the Film, Theater, Television, Events, Editorial Photography,
                                    and we have worked with celebrity, actors, singers, TV presenters, various show hosts,
                                    institutions and individuals.
                                    </p>

                                    <p>
                                        
                                    In 2014 we were awarded a Kalasha award for best special effects for film makeup, and since
                                    we have worked collaboratively with various productions to produce award winning stories.
                                    We also have been hosting master classes, to train upcoming artists wishing to be become
                                    professionals in the industry.
                                    </p>
                                {/* <div className = "about-word-area"></div> */}
                                </div>
                            </div>
                            <div className='col-md-6 order-1'>
                            <div className = "image-area">
                                <div className = "video-sim">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VEMWabj-2FQ" title="OUR STORY : ACE OF FACE AND HAIR - Hair &amp; Makeup for FILM/TV &amp; THEATRE 🎭" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                                {/* <YouTubeEmbed url="https://www.youtube.com/watch?v=HpVOs5imUN0" width={"100%"} height={400} /> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
  )
}
