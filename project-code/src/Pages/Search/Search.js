
import { Button, createMuiTheme, Tab, Tabs, TextField, } from "@material-ui/core";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../Components/SingleContent/SingleContent"
import Pagination from '@material-ui/lab/Pagination';

function Search() {
    //set type as movies or TV Series
    const [type, setType] = useState(0);
    //set the key word used to search content
    const [keyWord, setKeyWord] = useState("");
    //seting the current category is movies or tv
    const [category, setCategory] = useState(1);
    //the filtered content using key work search
    const [content, setContent] = useState([]);
    //get total pages of contents
    const [totalPages, setTotalPages] = useState(0);

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${keyWord}&page=${category}&include_adult=false`
            );
            setContent(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, category]);

    const handleChangePagination = (event, value) => {
        setCategory(value);
        window.scroll(0, 0);
    };

    return (
        <div>
            <div className="search">
                <TextField
                    style={{ flex: 1 }}
                    className="searchBox"
                    label="Input Key Words"
                    variant="filled"
                    onChange={(e) => setKeyWord(e.target.value)}
                />
                <Button
                    onClick={fetchSearch}
                    variant="contained"
                    style={{ marginLeft: 10 }}
                >
                    <SearchIcon fontSize="large" />
                </Button>
            </div>

            <Tabs
                value={type}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, newValue) => {
                    setType(newValue);
                    setCategory(1);
                }}
                style={{ paddingBottom: 5 }}
                aria-label="disabled tabs example"
            >
                <Tab style={{ width: "50%" }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />
            </Tabs>

            <div className="series-list">
                {content.map((series, index) => {
                    return (
                        <SingleContent
                            key={series.id}
                            id={series.id}
                            poster_path={series.poster_path}
                            name={series.name}
                            date={series.first_air_date || series.release_date}
                            media_type={type ? "tv" : "movie"}
                            vote_average={series.vote_average}
                        />
                    )
                })}
            </div>

            <div>
                {totalPages > 1 && (
                    <Pagination count={totalPages} color="primary" onChange={handleChangePagination} />
                )}
            </div>
        </div>
    );
}

export default Search;