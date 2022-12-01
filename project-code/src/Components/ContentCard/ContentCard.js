import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@material-ui/lab/Rating';

function ContentCard(props) {
    const {name, img, rating, first_air_date} = props;

    return (
        <Card sx={{ width: 280 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={img}
              alt={name}
              sx={{objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                  {first_air_date}
              </Typography>
              {rating > 0? 
              <Rating name="half-rating-read" defaultValue={rating} precision={0.1} max={10} readOnly />: 
              <Typography gutterBottom variant="overline" component="div"> Rating not available </Typography>}
            </CardContent>
          </CardActionArea>
        </Card>
    );
}

export default ContentCard;