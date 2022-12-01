// use Badge from material-ui and use the badgeContent prop to display the rating
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@material-ui/lab/Rating';

// info card of the movie or tv show, display the poster, title, date, and rating
export default function SingleContent({
    id,
    name,
    date,
    media_type,
    poster_path,
    vote_average,
}) {

    const posterURL = `https://image.tmdb.org/t/p/w300${poster_path}`; // get the poster image from the API

    return (
        <ContentModal media_type={media_type} id={id}>
            <Card sx={{ width: 280 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    image={posterURL}
                    alt={name}
                    sx={{objectFit: "contain" }}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div" className="info">
                        <span>{media_type === "tv" ? "TV Series" : "Movie"}</span><span>{date}</span>
                    </Typography>
                    {vote_average > 0? 
                    <Rating name="half-rating-read" defaultValue={vote_average} precision={0.1} max={10} readOnly />: 
                    <Typography gutterBottom variant="overline" component="div"> Rating not available </Typography>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </ContentModal>
  );
}
