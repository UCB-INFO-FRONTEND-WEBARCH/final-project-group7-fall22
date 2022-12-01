// use Badge from material-ui and use the badgeContent prop to display the rating
import { Badge } from "@material-ui/core";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";


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
            {/* different color according to vote */}
            <Badge
                variant="standard"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                badgeContent={vote_average}
                color={vote_average > 5 ? "primary" : "secondary"}
            />

            <img className="poster"
                src={posterURL}
                alt={name}
            />

            <div className="title">{name}</div>
            
            <div className="other-info">
                <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
                <span>{date}</span>
            </div>

        </ContentModal>
  );
}
