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
                var arr = resp.data.data;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].caption.length < 35) {
                        arr[i].caption += "\n ...";
                    }

                    if (arr[i].caption.length >= 35) {
                        if (arr[i].caption.length > 48) {
                            arr[i].caption = arr[i].caption.slice(0, 48);
                            arr[i].caption += "...";
                        } else {
                            arr[i].caption = arr[i].caption.slice(0, 48);
                        }
                    }
                }
                setMediaUrls(arr);
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
                'User-Agent':'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Access-Control-Allow-Origin':'localhost:3000'
            }
        });
    }

    useEffect(() => {
        getMediaUrls();
        getProfileDetails();
    }, [])

    return (
        <div className='instagram-section'>
            <div className='heading-group-wording text-center'>
                <h3 className = "wordheading">Our latest Instagram Posts.</h3>
            </div>
            <div className="instagram-container">
                    {mediaUrls.map(Post => {
                        return (
                    <div className="instagram-card" key = {Post.id}>
                
                    <div className="intagram-card-image">
                    <img src={Post.media_url} alt = {Post.caption}/>
                    </div>
                
                    <div className="instagram-card-content">
                    {/* <p><a className="instagram-card-content-user" href="https://www.instagram.com/followmeto/">{profileDetails.username}</a>  {Post.caption}</p> */}
                    {Post.caption}
                    </div>
                </div>)
                })}
            </div>

            <div className='text-center ig-btn-grp'>
                    <Button btn = {"instagram"}>Connect With Us On Instagram</Button>
                </div>
        </div>
    )
}