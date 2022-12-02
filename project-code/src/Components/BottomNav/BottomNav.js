import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles"; // makeStyles hook from Material UI, used to style components

// Import the BottomNavigation component from Material UI, used to create the bottom navigation bar
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useNavigate } from "react-router-dom"; // use this to navigate to different pages

const useStyles = makeStyles({
    root: {
        width: "100%",

        // navitagion bar will be fixed at the bottom of the screen
        position: "fixed",
        bottom: 0, // position the bottom nav at the bottom of the screen
        backgroundColor: "#231942",
        zIndex: 100, // make sure the bottom nav is always on top of other elements
    }
});

export default function SimpleBottomNavigation() {
    const classes = useStyles(); // use this to apply styles to the bottom nav
    const [value, setValue] = useState(0); //default value is 0, trending page
    const navigate = useNavigate(); // use this to navigate to different pages

    // navigation to different pages
    useEffect(() => {
        if (value === 0) {
            navigate("/");
        } else if (value === 1) {
            navigate("/movies");
        } else if (value === 2) {
            navigate("/series");
        } else if (value === 3) {
            navigate("/search");
        }
    }, [value, navigate]);

    return (
        // navigation bar
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue); // route to different pages according to the value
            }}
            showLabels
            className={classes.root} // use the style defined above
        >
            <BottomNavigationAction
                style={{ color: "white" }} // change color of the icon
                label="Trending"
                icon={<WhatshotIcon />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Movies"
                icon={<MovieIcon />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="TV Series"
                icon={<TvIcon />}
            />
            <BottomNavigationAction
                style={{ color: "white" }}
                label="Search"
                icon={<SearchIcon />}
            />
        </BottomNavigation>
    );
}