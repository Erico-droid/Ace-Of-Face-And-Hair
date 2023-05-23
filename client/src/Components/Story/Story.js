import React, { useEffect } from 'react';
import "./Story.css"

export default function Story() {
    return (
        <div className='our-story-area'>
                <div className='cont'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 order-2' style = {{minHeight: "550px"}}>
                                <div className = "about-us-word">
                                    <h3 className = "wordheading text-right mt-md-3" >Get Our Story Right.</h3>
                                    <p>
                                    Habari zenu wapendwa! Leo nimefurahi kuandika makala hii katika lugha ya Kiswahili ili kuwapa wasomaji wetu wote uzoefu wa kusoma makala kwa lugha yetu ya asili. Kama tunavyojua, Kiswahili ni lugha inayozidi kukua na kuvutia watu kutoka sehemu mbalimbali duniani. Hivyo basi, ni muhimu sana kuendelea kuifanyia kazi na kuiboresha zaidi ili iweze kuwa bora zaidi.</p>

                                    <p>Katika makala hii, nitajadili kuhusu umuhimu wa elimu katika maisha yetu. Elimu ni moja ya mambo muhimu sana ambayo yanasaidia kukuza akili na kufungua milango ya fursa mbalimbali. Kupitia elimu, tunapata ujuzi, maarifa na stadi mbalimbali ambazo zinatusaidia kuwa bora zaidi katika maisha yetu. Kwa hiyo, ni muhimu sana kuhakikisha kuwa tunaupata elimu vizuri na kuendelea kusoma na kujifunza hata baada ya kumaliza masomo yetu.</p>
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
