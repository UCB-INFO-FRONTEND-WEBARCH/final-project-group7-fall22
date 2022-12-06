import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FilterChip from "../../Components/FilterChip/FilterChip";
import Pagination from '@material-ui/lab/Pagination';
import SingleContent from "../../Components/SingleContent/SingleContent";
import "./Series.css";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";

import { FavoriteContext } from "../../App";

const Series = () => {
    //use context for favorite list
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

    // Value of the sort by selector
    const [sortBy, setSortBy] = useState("popularity.desc");

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
    const [year, setYear] = useState("");

    const [watchProviderList, setWatchProviderList] = useState([]);
    const [selectedWatchProviderList, setSelectedWatchProviderList] = useState([]);

    const genreListBaseUrl = "https://api.themoviedb.org/3/genre/tv/list";
    const seriesListBaseUrl = "https://api.themoviedb.org/3/discover/tv";

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
                    sort_by: sortBy,
                    with_genres: selectedGenreList.join(),
                    first_air_date_year: year,
                    with_watch_providers: selectedWatchProviderList.join(),
                    watch_region: "US"
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

    const getWatchProviders = async () => {
        const result = await axios.get(
            `https://api.themoviedb.org/3/watch/providers/tv?api_key=${apiKey}&language=en-US&watch_region=US`
        ).catch((err) => console.log(err));
        return result.data;
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

    const handleSelectWatchProvider  = (id) => {
        setSelectedWatchProviderList([...selectedWatchProviderList, id]);
    };

    const handleDeselectWatchProvider  = (id) => {
        setSelectedWatchProviderList([...selectedWatchProviderList].filter(e => e !== id));
    };

    useEffect(() => {
        getGenreList().then((data) => {
            setGenreList(data.genres);
        });

        // display top 15 providers
        getWatchProviders().then((data) => {
            setWatchProviderList(data.results.slice(0, 16));
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
    }, [page, selectedGenreList, favoriteList, sortBy, year, selectedWatchProviderList]);

    const handleSortByChange = (event) => {
        setSortBy(event.target.value)
    }

    const handleYearSubmit = (event) => {
        event.preventDefault();
        setYear(event.target.year.value);
    }

    return (
        <div>
            <h1>Series</h1>
            <SortBySelector onChange={handleSortByChange}/>

            <div id={'grid-container'}>
                <div className="filter">
                    <h2>Filter by Genre</h2>
                    <div className="chips">
                        {genreList.map((genre, index) => {
                            return (<FilterChip key={index} label={genre.name} id={genre.id} selectHandler={handleSelectGenre} deselectHandler={handleDeselectGenre} />);
                        })}
                    </div>
                    <h2>Filter by Year</h2>
                    <form onSubmit={handleYearSubmit}>
                        <input type={"text"} name={"year"}/>
                        <p>Example: 2022</p>
                        <input type={"submit"}/>
                    </form>

                    <h2>Filter by Watch Provider</h2>
                    <div className="chips">
                        {watchProviderList.map((provider, i) => {
                            return (
                                <FilterChip key={i}
                                    label={provider.provider_name}
                                    id={provider.provider_id}
                                    selectHandler={handleSelectWatchProvider}
                                    deselectHandler={handleDeselectWatchProvider} />);
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