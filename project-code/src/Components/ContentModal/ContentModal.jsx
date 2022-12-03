import { useState, useEffect } from 'react'
import Modal from "@material-ui/core/Modal"
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";

import "./ContentModal.css"

// image path
import { img_500, unavailable } from '../../config/config'


// use the makeStyles hook to create a style object
const useStyles = makeStyles((theme) => ({ 
    // modal styles
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    // style for the paper
    paper: {
        backgroundColor: "#231942",
        width: "90%",
        height: "80%",
        color: "white",
        borderRadius: 10,
        padding: 20,
      },
}))


// MUI Modal Component https://v4.mui.com/components/modal/#modal  
export default function ContentModal({ media_type, id, open, handleCloeseModal }) {
    const [content, setContent] = useState({}); // useState hook to set the state of the data content
    const [video, setVideo] = useState({}); // useState hook to set the state of the youtube video content

    const classes = useStyles(); // useStyles hook to set the styles of the modal

    // fetch data from the API
    const fetchData = async () => {
        const dataURL = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        const { data } = await axios.get(dataURL);

        setContent(data);
    }

    // fetch youtube video from the API
    const fetchVideo = async () => {
        const videoURL = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        const { data } = await axios.get(videoURL);

        setVideo(data.results[0]?.key); // get the first video from the results array
    }

    // useEffect hook to fetch data and video for display in the modal
    useEffect(() => {
        fetchData();
        fetchVideo();
    }, [])
      
    return (
            <Modal
                open={open}
                onClose={handleCloeseModal}
                className={classes.modal}
                aria-labelledby="media-info-modal"
                aria-describedby="media-modal-description"
            >
                    <div className={classes.paper}>
                        <div className="modal-content">
                            {/* <img
                                className='modal-poster'
                                src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                                alt = {content.name}
                            /> */}
                            <img
                                className='modal-poster-landscape'
                                src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable}
                                alt = {content.name || content.title}
                            />

                            <div className="modal-content-detail">
                                <span className="modal-content-title">
                                    {content.name || content.title}
                                    ({(content.first_air_date || content.release_date || "-----").substring(0, 4)}) 
                                </span>
                                {content.vote_average && (
                                        <span className="modal-content-rating">🌟
                                        {content.vote_average}</span>
                                    )}
                                {content.tagline && (
                                    <span className="tagline">{content.tagline}</span>
                                )}
                                {content.overview && 
                                    <span className='modal-content-overview'>
                                    {content.overview}
                                    </span>
                                }       

                                {/* carousel section */}
                                <div className="modal-content-cast-carousel">
                                    <Carousel media_type={media_type} id={id} />
                                </div>

                                <div className="modal-content-buttons">
                                    <Button
                                        variant="contained"
                                        startIcon = {<YouTubeIcon/>}
                                        color="primary"
                                        target="_blank"
                                        href={  `https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>
  )
}
