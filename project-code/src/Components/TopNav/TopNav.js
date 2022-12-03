import { Link } from "react-router-dom";
import "./TopNav.css";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FavoriteIcon from '@material-ui/icons/Favorite';

function TopNav() {
    return (
        <div className="top-nav">
            <ul className="top-nav-ul">
                <li className="top-nav-li">
                    <Link to="/"><WhatshotIcon className="icon" />Trending</Link>
                </li>
                <li className="top-nav-li">
                    <Link to="/movies"><MovieIcon className="icon" />Movies</Link>
                </li>
                <li className="top-nav-li">
                    <Link to="/series"><TvIcon className="icon" />TV Series</Link>
                </li>
                <li className="top-nav-li">
                    <Link to="/favorite"><FavoriteIcon className="icon" />Favorite</Link>
                </li>
            </ul>
        </div>
    );
};

export default TopNav;