import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { InstagramEmbed } from 'react-social-media-embed';
import "./Instagram.css";
import Card from '../../shared/Card/Card';

export default function Instagram() { 
    const [mediaUrls, setMediaUrls] = useState([]);
    const APP_ID = "611462390832386";
    const APP_SECRET = "e555f27c41ea1a17ab5acac3b4a43666"
    const TOKEN = "IGQVJVaDFETkh3VDQyeExCQ0h4M1MzdGxqVi1fUjlvSFY4MW5XU0JKaXBYM3FWUEx4UWxVZAFF0ZATBvN2RYOEpQWjZAuc0RKQU9FRWtxVDJUMXFXUldIRVRkZAWIzN1BpR0RlOFJQYnlKYWYyaHg1bDV6eAZDZD"
    const CLIENT_TOKEN = "f35469ddfaa5c11b1285e8adfabc9696"

    const EMBED_CLIENT_TOKEN = `${APP_ID}|${CLIENT_TOKEN}`;
    

    async function getMediaUrls() {
        const limit = 10;
        // const queryHash = "d21519993e8dfc09b3149a6a9bad7a3bb29fa660dba3d83c92b177f69c0f2c8d";
        const url = `https://graph.instagram.com/me/media?fields=permalink&access_token=${TOKEN}&limit=${limit}`;  
        // const url = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables={"d:${Profile-ID},first:12}`
        try {
            axios.get(url)
            .then((resp) => {
                setMediaUrls(resp.data.data);
            })
        } catch(err) {
            throw(err);
        }
    }

    useEffect(() => {
        getMediaUrls();
    }, [])

    return (
        <div className='instagram-section'>
        <div className = "card  wavy-card"><span className='instagram-header'>scroll to the right to view more of our instagram feed.</span></div>
        <div className="instagram-container">
            { mediaUrls.map(Post => {
                    return <div key={Math.random()}><InstagramEmbed url={Post.permalink} width={340}/></div>
                })
            }
        </div>
        </div>
    )
}