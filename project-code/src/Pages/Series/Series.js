import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FilterChip from "../../Components/FilterChip/FilterChip";
import Pagination from '@material-ui/lab/Pagination';
import SingleContent from "../../Components/SingleContent/SingleContent";
import "./Series.css";

import { FavoriteContext } from "../../App";

const Series = () => {
    //use context for favorite list
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

    // List of all possible genres
    const [genreList, setGenreList] = useState([]);
    // List of selected genres
    const [selectedGenreList, setSelectedGenreList] = useState([]);
    // List of fetched series, already filtred based on page and selected genres
    const [seriesList, setSeriesList] = useState([]);
    // Current page
    const [page, setPage] = useState(1);
    // Total number of pages for fetched series
    const [totalPages, setTotalPages] = useState(0);

    const genreListBaseUrl = "https://api.themoviedb.org/3/genre/tv/list";
    const seriesListBaseUrl = "https://api.themoviedb.org/3/discover/tv";
    const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

    // Import the api key from environment variable
    // process.env is a global variable in Node.js
    const apiKey = process.env.REACT_APP_API_KEY;

    // Fetch series to display
    const getSeriesList = async () => {
        const response = await axios.
            get(seriesListBaseUrl, {
                params: {
                    api_key: apiKey,
                    page: page,
                    language: 'en-US',
                    sort_by: 'popularity.desc',
                    with_genres: selectedGenreList.join()
                }
            })
            .catch((err) => console.log(err));
        return response.data;
    };

    // Fetch all possible genres
    const getGenreList = async () => {
        const response = await axios.
            get(genreListBaseUrl, {
                params: {
                    api_key: apiKey,
                    language: 'en-US'
                }
            })
            .catch((err) => console.log(err));
        return response.data;
    };

    const handleChangePagination = (event, value) => {
        setPage(value);
        window.scroll(0, 0);
    };

    const handleSelectGenre = (id) => {
        let newList = [...selectedGenreList];
        newList.push(id);
        setSelectedGenreList(newList);
    };

    const handleDeselectGenre = (id) => {
        let newList = [...selectedGenreList];
        newList = newList.filter(element => element !== id);
        setSelectedGenreList(newList);
    };

    useEffect(() => {
        getGenreList().then((data) => {
            setGenreList(data.genres);
        });

        getSeriesList().then((data) => {
            // setSeriesList(data.results);

            // pick out favorited content from series list
            const favoritedContent = data.results.filter((content) => {
                return favoriteList.find((favorite) => favorite.id === content.id)
            });

            // add favorited property to trending list
            const favoritedSeriesList = data.results.map((content) => {
                return favoritedContent.find((favorite) => favorite.id === content.id) ? { ...content, favorited: true } : { ...content, favorited: false }
            });

            // set favorited trending list to trending list
            setSeriesList(favoritedSeriesList);

            // The Movie DB backend now has a bug that returns an
            // inaccurate total page count. The maximum number of 
            // pages supported by this API at the moment is 500.
            // Please refer to this post for more detail:
            // https://www.themoviedb.org/talk/61bbb4dc6a300b00977d906c
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        });
    }, [page, selectedGenreList, favoriteList]);




    return (
        <div>
            <h1>Series</h1>

            <div id={'grid-container'}>
                <div className="filter">
                    <h2>Filter by Genre</h2>
                    <div className="chips">
                        {genreList.map((genre, index) => {
                            return (<FilterChip key={index} label={genre.name} id={genre.id} selectHandler={handleSelectGenre} deselectHandler={handleDeselectGenre} />);
                        })}
                    </div>
                </div>

                <div className="series-list">
                    {seriesList.map((series, index) => {
                        return (
                            // placeholder
                            // <div key={index}>
                            //     <img src={`${imageBaseUrl}${series.poster_path}`} />
                            //     <p>{series.name}</p>
                            //     <p>Vote Average: {series.vote_average}</p>
                            //     <p>First Air Date: {series.first_air_date}</p>
                            // </div>);

                        // render singlecontent component and pass data to it
                        <SingleContent
                            key={series.id}
                            id={series.id}
                            poster_path={series.poster_path}
                            name={series.name}
                            date={series.first_air_date || series.release_date}
                            media_type="tv"
                            vote_average={series.vote_average}
                            addedToFavorite={series.favorited}
                        />
                    );

                })}
                </div>
                <div className="pagination">
                    <Pagination count={totalPages} onChange={handleChangePagination} />
                </div>
            </div>
        </div>
    );
}

export default Series;