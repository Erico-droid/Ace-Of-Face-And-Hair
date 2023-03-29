import React, { useState } from 'react'
import ReactPlayer from 'react-player'

export default function Player() {
    const [loading, setLoading] = useState(true);
    const FetchUrl = () => {
        const url = fetch("https://www.youtube.com/watch?v=ysz5S6PUM-U")
        .then((res) => {
            setLoading(false);
        })
        return url;
    }
    return (
        <div>
           <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> 
        </div>
    )
}
