import "./Search.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import SingleContent from "../../Components/SingleContent/SingleContent"
import Pagination from '@material-ui/lab/Pagination';
import { useLocation } from 'react-router-dom'

import { FavoriteContext } from "../../App";

function Search() {
    // use context for favorite list
    const { favoriteList } = useContext(FavoriteContext);

    // parameters passed from the search bar, including the
    // media type and search keyword.
    const location = useLocation();
    const { mediaType, keyword } = location.state;

    // the current page number
    const [page, setPage] = useState(1);
    // the filtered content using key work search
    const [content, setContent] = useState([]);
    // total number of pages of search results
    const [totalPages, setTotalPages] = useState(0);

    const searchBaseUrl = `https://api.themoviedb.org/3/search/${mediaType}`;
    const apiKey = process.env.REACT_APP_API_KEY;
    
    // Send a GET request to server to retrive search results
    const getSearchResults = async () => {
        const response = await axios.
            get(searchBaseUrl, {
                params: {
                    api_key: apiKey,
                    page: page,
                    language: 'en-US',
                    query: keyword
                }
            })
            .catch((err) => console.log(err));
        return response.data;
    };

    useEffect(() => {
        getSearchResults().then((data) => {
            // pick out favorited content from search result list
            const favoritedContent = data.results.filter((content) => {
                return favoriteList.find((favorite) => favorite.id === content.id)
            });

            // add favorited property to search result list
            const favoritedSeriesList = data.results.map((content) => {
                return favoritedContent.find((favorite) => favorite.id === content.id) ? { ...content, favorited: true } : { ...content, favorited: false }
            });

            setContent(favoritedSeriesList);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        });
    }, [page, mediaType, keyword, favoriteList]);

    const handleChangePagination = (event, value) => {
        setPage(value);
        window.scroll(0, 0);
    };

    return (
        <div>
            <h1>Search Results</h1>
            <div className="result-list">
                {content.map((result, index) => {
                    return (
                        <SingleContent
                            key={index}
                            id={result.id}
                            poster_path={result.poster_path}
                            name={result.name || result.title}
                            date={result.first_air_date || result.release_date}
                            media_type={mediaType}
                            vote_average={result.vote_average}
                            addedToFavorite={result.favorited}
                        />
                    )
                })}
            </div>

            <div className="pagination">
                <Pagination count={totalPages} onChange={handleChangePagination} />
            </div>
        </div>
    );
}

export default Search;