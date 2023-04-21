import React, {useEffect, useState, useCallback} from 'react';
import "./DetailedProject.css";
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import BorderHeading from '../../shared/BorderHeading/BorderHeading';
import PlaceHolder from './PlaceHolder';
import FadeIn from 'react-fade-in/lib/FadeIn';



export default function DetailedProject(props) {
    const params = useParams();
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [heading, setHeading] = useState("");
    const [loading, setLoading] = useState(true);

    const getImages = async () => {
        var imageArr = [];
        const id = params["id"];
        const url = `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;
        const request = await Axios.get(url)
        .then(resp => {
            const arr = resp.data;
            for (var i = 0; i < arr.length; i++) {
                var obj = {};
                if (!obj["src"])
                    obj["src"] = arr[i]["url"];
                if (!obj["width"])
                    obj["width"] = Math.round(Math.random() * (800 - 550 + 1)) + 550;
                if (!obj["height"])
                    obj["height"] = Math.round(Math.random() * (1200 - 900 + 1) + 900);
                imageArr = [...imageArr, obj];
                setImages(imageArr);
            }
            
        })
        .catch(error => {throw error})
    }

    const getAlbumDetails = async () => {
        const id = params["id"];
        const url = `https://jsonplaceholder.typicode.com/albums?id=${id}`;
        const request = Axios.get(url)
        .then(resp => {
            setHeading(resp.data[0]["title"]);
        })
    }

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        getAlbumDetails();
        getImages();
        setLoading(false);
    }, [])

    const PlaceHolderSettings = () => {
        if (props.darkmode)
          return <PlaceHolder backgroundColor="grey" foregroundColor="#ecebeb" />
        else
          return <PlaceHolder backgroundColor="#f3f3f3" foregroundColor="#ecebeb" />
    }


    if (!params) {
        return <div>Project Not Found.</div>
    }

    return (
        <div className='container-fluid'>
            {loading ?
                <div style = {{width: "100%"}}>
                    {PlaceHolderSettings()}
                </div>
                 :
                <FadeIn>
            <div className='row'>
                <div className = 'col-md-12'>
                    <div className='card mb-3'>
                    <div className='project-description'>
                        <BorderHeading size = {"small"}>{heading}</BorderHeading>
                        <p>Project Description Project Description Project Description Project Description Project Description 
                        Project Description Project Description Project Description Project Description Project Description Project Description 
                        Project Description Project Description Project Description Project Description Project Description Project Description 
                        Project Description Project Description Project Description Project Description Project Description Project Description.
                        </p>
                        </div>
                    </div>
                    <div>
                    <Gallery photos={images} onClick={openLightbox} />
                    <ModalGateway>
                    {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                        currentIndex={currentImage}
                        views={images.map(x => ({
                            ...x,
                            srcset: x.srcSet,
                            caption: x.title
                        }))}
                        />
                    </Modal>
                    ) : null}
                </ModalGateway>
                    </div>
                </div>
            </div>
            </FadeIn>
            }
        </div>
    )
}
