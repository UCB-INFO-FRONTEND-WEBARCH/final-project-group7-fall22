import SingleContent from "../../Components/SingleContent/SingleContent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import FilterChip from "../../Components/FilterChip/FilterChip";
import Pagination from '@material-ui/lab/Pagination';
import "./Movies.css";
import { FavoriteContext } from "../../App";
import SortBySelector from "../../Components/SortBySelector/SortBySelector";

const Movies = () => {

    //use context for favorite list
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

    const [watchProviderList, setWatchProviderList] = useState([]);
    const [selectedWatchProviderList, setSelectedWatchProviderList] = useState([]);
    const [year, setYear] = useState("");
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [genreList, setGenreList] = useState([]);
    const [selectedGenreList, setSelectedGenreList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [moviesList, setMoviesList] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;
    const getMovies = async () => {
        console.log(selectedWatchProviderList);
        const result = await axios.get(
            `https://api.themoviedb.org/3/discover/movie`, {
            params: {
                api_key: apiKey,
                page: page,
                with_genres: selectedGenreList.join(),
                sort_by: sortBy,
                primary_release_year: year,
                language: "en-US",
                with_watch_providers: selectedWatchProviderList.join(),
                watch_region: "US"
            }
        })
            .catch((err) => console.log(err));
        return result.data;

    };

    const getGenres = async () => {
        const result = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        ).catch((err) => console.log(err));
        return result.data;
    };

    const getWatchProviders = async () => {
        const result = await axios.get(
            `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&language=en-US&watch_region=US`
        ).catch((err) => console.log(err));
        return result.data;
    };

    const handlePagination = (e, value) => {
        setPage(value);
        window.scroll(0, 0);
    };

    const handleSelectGenre = (id) => {
        setSelectedGenreList([...selectedGenreList, id]);
    };

    const handleDeselectGenre = (id) => {
        setSelectedGenreList([...selectedGenreList].filter(e => e !== id));
    };

    const handleSelectWatchProvider  = (id) => {
        setSelectedWatchProviderList([...selectedWatchProviderList, id]);
    };

    const handleDeselectWatchProvider  = (id) => {
        setSelectedWatchProviderList([...selectedWatchProviderList].filter(e => e !== id));
    };

    useEffect(() => {
        getGenres().then((data) => {
            setGenreList(data.genres);
        });
        
        // display top 15 providers
        getWatchProviders().then((data) => {
            setWatchProviderList(data.results.slice(0, 16));
        });

        getMovies().then((data) => {
            // setMoviesList(r.results);

            // pick out favorited content from series list
            const favoritedContent = data.results.filter((content) => {
                return favoriteList.find((favorite) => favorite.id === content.id)
            });

            // add favorited property to trending list
            const favoritedMoviesList = data.results.map((content) => {
                return favoritedContent.find((favorite) => favorite.id === content.id) ? { ...content, favorited: true } : { ...content, favorited: false }
            });

            // set favorited trending list to trending list
            setMoviesList(favoritedMoviesList);
            setTotalPages(data.total_pages);
        });
    }, [page, selectedGenreList, favoriteList, sortBy, year, selectedWatchProviderList]);

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    }

    const handleYearSubmit = (event) => {
        event.preventDefault();
        setYear(event.target.year.value);
    }

    return (
        <div>
            <h1>Movies</h1>
            <SortBySelector onChange={handleSortByChange}/>

            <div id="grid-container">

                <div className="filter">
                    <h2>Filter by Genre</h2>
                    <div className="chips">
                        {genreList.map((genre, i) => {
                            return (
                                <FilterChip key={i}
                                    label={genre.name}
                                    id={genre.id}
                                    selectHandler={handleSelectGenre}
                                    deselectHandler={handleDeselectGenre} />);
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

                <div className="movies">
                    {moviesList.map((movie, i) => {
                        return (
                            <SingleContent key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                name={movie.name || movie.title}
                                date={movie.first_air_date || movie.release_date}
                                media_type="movie"
                                vote_average={movie.vote_average}
                                addedToFavorite={movie.favorited}
                            />)
                    })}
                </div>

                <div className="pagination">
                    <Pagination count={totalPages} onChange={handlePagination} />
                </div>
            </div>
        </div>
    );
}

export default Movies;