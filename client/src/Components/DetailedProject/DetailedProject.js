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

    const getData = async () => {
        var imageArr = [];
        const slug = params["slug"];
        const url = `/portfolio/${slug}/`;
        const request = await Axios.get(url)
        .then(resp => {
            const arr = resp.data;
            for (var i = 0; i < arr.images.length; i++) {
                var obj = {};
                if (!obj["src"])
                    obj["src"] = arr.images[i]
                if (!obj["width"])
                    obj["width"] = Math.round(Math.random() * (800 - 550 + 1)) + 550;
                if (!obj["height"])
                    obj["height"] = Math.round(Math.random() * (1200 - 900 + 1) + 900);
                imageArr = [...imageArr, obj];
            }
            setImages(imageArr);
            setHeading(arr.name)
        })
        .catch(error => {throw error})
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
        getData();
        setLoading(false);
        document.title = `AFH | ${heading}`
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
        <div className='container mt-4 mb-5 detailed-project'>
            {loading ?
                <div style = {{width: "100%"}}>
                    {PlaceHolderSettings()}
                </div>
                 :
                <FadeIn>
            <div className='row'>
                <div className = 'col-md-12'>
                    <div className='mb-5'>
                    <div className='project-description'>
                            <div className='heading-group-wording'>
                                <h3 className = "wordheading">{heading}</h3>
                            </div>
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
