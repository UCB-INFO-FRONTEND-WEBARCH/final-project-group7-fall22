// use Badge from material-ui and use the badgeContent prop to display the rating
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@material-ui/lab/Rating';
import { Badge } from "@material-ui/core";
import AddFavorite from "../AddFavorite/AddFavorite";

// use context to get the user's favorite list
import { useContext, useState } from "react";
import { FavoriteContext } from "../../App"
import { useEffect } from "react";

// info card of the movie or tv show, display the poster, title, date, and rating,
// implemented using MUI Card Component
export default function SingleContent({
    id,
    name,
    date,
    media_type,
    poster_path,
    vote_average,
    addedToFavorite,
}) {

    const posterURL = `https://image.tmdb.org/t/p/w300${poster_path}`; // get the poster image from the API


    // handle add to favorite when clicking the heart icon and save to local storage
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

    // track favorited or not
    const [favorited, setFavorited] = useState(false)


    // favorite to unfavorite, vice versa
    const handleAddToFavorite = (e) => {
        setFavorited(!favorited)


    };

    // fetch the favorite list from local storage
    useEffect(() => {
        console.log(favoriteList)   
        if (favorited && favoriteList.filter((item) => item.id === id).length === 0) {
            // avoid duplicate items in the favorite list
            setFavoriteList([...favoriteList, { id, name, date, media_type, poster_path, vote_average, favorited }])
            // save to local storage
            localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        } else {
            //remove from favorite list
            setFavoriteList(favoriteList.filter((item) => item.id !== id))
            // save to local storage
            localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
        }
        
    }, [favorited])
    


    return (
        <div className="single-content-area">
        <ContentModal media_type={media_type} id={id}>
            {/* Do not display rating if it is not available*/}
            <Badge
                invisible={vote_average === 0}
                variant="standard"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                badgeContent={vote_average}
                color={"primary"}
            >
            <Card sx={{ width: 280 }}>
                <CardActionArea className="info-card">
                    
                    <CardMedia
                        component="img"
                        image={posterURL}
                        alt={name}
                        sx={{ objectFit: "contain" }}
                        />
                    
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div" className="info">
                            <span>{media_type === "tv" ? "TV Series" : "Movie"}</span><span>{date}</span>
                        </Typography>
                        {/* Do not display rating if it is not available*/}
                        {vote_average > 0? 
                        <Rating name="half-rating-read" defaultValue={vote_average} precision={0.1} max={10} readOnly />: 
                        <Typography gutterBottom variant="overline" component="div"> Rating not available </Typography>}
                        </CardContent>
                </CardActionArea>
            </Card>
            </Badge>

        </ContentModal>
            <div className="add-to-favorite" onClick={handleAddToFavorite}>
            {/* <div className="overlay"> */}
                <AddFavorite favorited={addedToFavorite}/>
            {/* </div> */}
            </div>
    </div>
  );
}
