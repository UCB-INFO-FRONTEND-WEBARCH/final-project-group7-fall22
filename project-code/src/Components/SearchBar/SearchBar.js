import { Button, TextField, } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
    const [mediaType, setMediaType] = useState("movie");
    const [keyword, setKeyword] = useState("");

    const handleChange = (event) => {
        setMediaType(event.target.value);
    }

    const handleInput = (event) => {
        setKeyword(event.target.value);
    }

    return (
        <div className="search-bar">
            <select
                value={mediaType}
                onChange={handleChange}
                size="small"
                className="search-selector"
                >
                <option value={"movie"}>Movie</option>
                <option value={"tv"}>TV Series</option>
            </select>

            <input type="text" className="search-input" onInput={handleInput}/>

            <Link to="/search" state={{ mediaType: mediaType, keyword: keyword }} >
                <button className="search-button">
                    <SearchIcon fontSize="medium"/>
                </button>
            </Link>
        </div>
    );
}

export default SearchBar;