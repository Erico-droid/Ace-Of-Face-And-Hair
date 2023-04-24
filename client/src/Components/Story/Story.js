import React, { useEffect } from 'react';
import Heading from '../../shared/Heading/Heading';
import "./Story.css"
import Typewriter, {typeString} from 'typewriter-effect/dist/core';
import AfricanPattern from "../../Assets/african-pattern.jpg";
import { YouTubeEmbed } from 'react-social-media-embed';
import BorderHeading from '../../shared/BorderHeading/BorderHeading';
import Card from '../../shared/Card/Card';

export default function Story() {

    function TypeWriter() {
        var story = document.querySelector(".about-us-heading");
        const heading = story.querySelector('span');
        
        var typeWriter = new Typewriter(heading);

        typeWriter.typeString("Hell, nah").pauseFor(2500).start();
    }       
    
    useEffect(() => {
        // TypeWriter();
    }, [])

    return (
        <div className='container-fluid'>
            <BorderHeading>Our Story</BorderHeading>
            <Card>
                <div className='cont'>
                    <div className='row'>
                        <div className='col-md-6 order-2' style = {{minHeight: "450px", maxHeight: "400px"}}>
                            <div className = "about-us-word">
                                <p>
                                Habari zenu wapendwa! Leo nimefurahi kuandika makala hii katika lugha ya Kiswahili ili kuwapa wasomaji wetu wote uzoefu wa kusoma makala kwa lugha yetu ya asili. Kama tunavyojua, Kiswahili ni lugha inayozidi kukua na kuvutia watu kutoka sehemu mbalimbali duniani. Hivyo basi, ni muhimu sana kuendelea kuifanyia kazi na kuiboresha zaidi ili iweze kuwa bora zaidi.</p>

                                <p>Katika makala hii, nitajadili kuhusu umuhimu wa elimu katika maisha yetu. Elimu ni moja ya mambo muhimu sana ambayo yanasaidia kukuza akili na kufungua milango ya fursa mbalimbali. Kupitia elimu, tunapata ujuzi, maarifa na stadi mbalimbali ambazo zinatusaidia kuwa bora zaidi katika maisha yetu. Kwa hiyo, ni muhimu sana kuhakikisha kuwa tunaupata elimu vizuri na kuendelea kusoma na kujifunza hata baada ya kumaliza masomo yetu.</p>
                            <div className = "about-word-area"></div>
                            </div>
                        </div>
                        <div className='col-md-6 order-1'>
                        <div className = "image-area">
                            <YouTubeEmbed url="https://www.youtube.com/watch?v=HpVOs5imUN0" width={"100%"} height={400} />
                        </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
  )
}
