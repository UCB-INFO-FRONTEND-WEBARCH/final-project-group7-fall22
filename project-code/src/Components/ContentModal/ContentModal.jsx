import { useState, useEffect } from 'react'
import Modal from "@material-ui/core/Modal"
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";

import "./ContentModal.css"

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
        backgroundColor: "black",
        width: "80%",
        height: "80%",
        borderRadius: 10,
        padding: 10,
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

    // prepare info to display on modal
    const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
    const backdropFullUrl = `${backdropBaseUrl}/${content.backdrop_path}`;
    const date = media_type == "movie"? content.release_date : content.first_air_date;
    const year = date? date.substring(0, 4) : null;

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
                <div className='modal-background' style={{backgroundImage: `url(${backdropFullUrl})`}}>
                    <div className='modal-background-dark-overlay'>
                        <div className='content'>
                            <h1 className="title">{media_type=="movie"? content.title : content.name} {`(${year})`}</h1>                                    
                            
                            <p>🌟
                                <span className='rating-score'>
                                    {content.vote_average? content.vote_average: "Rating not available"}
                                </span>
                            </p>

                            <p><i>{content.tagline}</i></p>

                            <h3 className="overview-title">Overview</h3>
                            <div className="overview-trailer">
                                <div className="overview-detail">
                                    <p>{content.overview}</p>
                                </div>

                                <Button
                                    className="trailer-button"
                                    variant="contained"
                                    startIcon = {<YouTubeIcon/>}
                                    color="primary"
                                    target="_blank"
                                    href={  `https://www.youtube.com/watch?v=${video}`}
                                >
                                    Player Trailer
                                </Button>
                            </div>

                            <div className="modal-content-cast-carousel">
                                <h3>Cast</h3>
                                <Carousel media_type={media_type} id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
  )
}
