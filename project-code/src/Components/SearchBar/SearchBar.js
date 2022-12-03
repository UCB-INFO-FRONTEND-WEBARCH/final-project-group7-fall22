import { Button, TextField, } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={mediaType}
                onChange={handleChange}
                >
                <MenuItem value={"movie"}>Movie</MenuItem>
                <MenuItem value={"tv"}>TV Series</MenuItem>
            </Select>

            <TextField onInput={handleInput}/>

            <Link to="/search"  state={{ mediaType: mediaType, keyword: keyword }} >
                <Button>
                    <SearchIcon fontSize="medium" />
                </Button>
            </Link>
        </div>
    );
}

export default SearchBar;