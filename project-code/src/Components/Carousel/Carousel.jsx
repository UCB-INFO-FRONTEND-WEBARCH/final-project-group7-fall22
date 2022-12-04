import {useEffect, useState} from 'react'
import AliceCarousel from "react-alice-carousel";
import { img_300 } from "../../config/config";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios';
import "./Carousel.css";
import noImgPeople from "../../img/no_img_people.png";

export default function Carousel({ media_type, id }) {
    const [credits, setCredits] = useState([]); // useState hook to set the state of the credits

    // map through the credits and display the cast members
    const items = credits.map((c) => {
        return (
            <div className="cast-info-item">
                <img
                    src={c.profile_path ? `${img_300}/${c.profile_path}` : noImgPeople}
                    alt={c.name}
                    className='cast-info-img'
                />
                <p>{c.name} <br/>
                Character: {c.character}</p>
            </div>
        );
    })
    
    // const items = [
    //     <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
    //     <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
    //     <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
    // ];
    
    // fetch casts data from the API
    const fetchCredits = async () => {
        // console.log(id)
        // console.log(media_type)
        const creditURL = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        // console.log(creditURL)
        const { data } = await axios.get(creditURL); // get the credits from the API
        // console.log(data.cast)
        setCredits(data.cast); // set the state of the credits
    };

    useEffect(() => {
        fetchCredits(); // call the fetchCredits function
    }, []); // empty array as the second argument to prevent infinite loop

    const responsive = {
        0: {
            items: 5
        }
    }

    return (
        <AliceCarousel
            mouseTracking
            disableSlideInfo={false}
            autoPlay
            infinite
            stopOnHover
            disableButtonsControls
            items={items} 
            responsive={responsive} />
    );
}


