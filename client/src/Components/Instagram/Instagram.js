import React, {useEffect, useState, useRef, Profiler} from 'react'
import axios from 'axios'
import { InstagramEmbed } from 'react-social-media-embed';
import "./Instagram.css";
import Card from '../../shared/Card/Card';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '../../shared/Button/Button'


export default function Instagram() { 
    const [mediaUrls, setMediaUrls] = useState([]);
    const [profileDetails, setProfileDetails] = useState([]);
    const APP_ID = "611462390832386";
    const APP_SECRET = "e555f27c41ea1a17ab5acac3b4a43666"
    const TOKEN = "IGQVJVaDFETkh3VDQyeExCQ0h4M1MzdGxqVi1fUjlvSFY4MW5XU0JKaXBYM3FWUEx4UWxVZAFF0ZATBvN2RYOEpQWjZAuc0RKQU9FRWtxVDJUMXFXUldIRVRkZAWIzN1BpR0RlOFJQYnlKYWYyaHg1bDV6eAZDZD"
    const CLIENT_TOKEN = "f35469ddfaa5c11b1285e8adfabc9696"

    const EMBED_CLIENT_TOKEN = `${APP_ID}|${CLIENT_TOKEN}`;
    
    async function getProfileDetails() {
        const url = `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${TOKEN}
        `;
        try {
            await axios.get(url)
            .then((res) => {
                setProfileDetails(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        } catch(err) {
            throw(err);
        }
    }

    async function getMediaUrls() {
        const limit = 10;
        // const queryHash = "d21519993e8dfc09b3149a6a9bad7a3bb29fa660dba3d83c92b177f69c0f2c8d";
        const url = `https://graph.instagram.com/me/media?fields=permalink,caption,media_url,timestamp&access_token=${TOKEN}&limit=${limit}`;  
        // const url = `https://www.instagram.com/graphql/query/?query_hash=${queryHash}&variables={"d:${Profile-ID},first:12}`
        try {
            axios.get(url)
            .then((resp) => {
                // console.log(resp.data)
                setMediaUrls(resp.data.data);
            })
        } catch(err) {
            throw(err);
        }
    }

    async function myTest() {
        const url = "https://www.instagram.com/_kab.ira_/?__a=1";
        const resp = await axios.get(url, {
            withCredentials: true,
            headers: {
                'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Access-Control-Allow-Origin':'localhost:3000'
            }
        });
        resp.the((res) => {
            console.log(res);
        })
    }

    useEffect(() => {
        getMediaUrls();
        getProfileDetails();
        myTest();
    }, [])

    return (
        <div className='instagram-section'>
        <div className = "card  wavy-card">
            <div className = "container">
                <div className = "row">
                    <div className='col-md-8'>
                <div className="profile">
                    <div className="profile-image">
                        <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />

                    </div>

                    <div className="profile-user-settings">
                        <h1 className="profile-user-name text-bold">{profileDetails.username}</h1>
                        <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true"></i></button>
                    </div>

                    <div className="profile-stats">
                        <ul>
                            <li><span className="profile-stat-count">164</span> posts</li>
                            <li><span className="profile-stat-count">188</span> followers</li>
                            <li><span className="profile-stat-count">206</span> following</li>
                        </ul>
                    </div>

                    <div className="profile-bio">
                        <p><span className="profile-real-name">{profileDetails.username}</span> Ace Of Face and Hair (AFH)
Hair & Makeup Artistry.
Special Makeup Effects!
NETFLIX, SHOWMAX, MNET & MORE
📸📽️🎭⚔️💈🎨🎞️🎬
Creative Consulting.©
🇰🇪🌍</p>
                    </div>
                    </div>
                </div>
                <div className='col-md-4' >
                    <div className = "btn-container">
                    <div className = "center"><Button icon = {<InstagramIcon/>} btn = {"instagram"}>Connect with us on Instagram</Button></div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        <div className="instagram-container">
                {mediaUrls.map(Post => {
                    return (
                <div className="instagram-card" key = {Post.id}>
            
                <div className="intagram-card-image">
                <img src={Post.media_url} alt = {Post.caption}/>
                </div>
            
                <div className="instagram-card-content">
                <p><a className="instagram-card-content-user" href="https://www.instagram.com/followmeto/">{profileDetails.username}</a>  {Post.caption}</p>
                </div>
            </div>)
            })}
            
        </div>
        </div>
    )
}