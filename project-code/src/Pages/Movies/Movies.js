import SingleContent from "../../Components/SingleContent/SingleContent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import FilterChip from "../../Components/FilterChip/FilterChip";
import Pagination from '@material-ui/lab/Pagination';
import "./Movies.css";
import { FavoriteContext } from "../../App";
const Movies = () => {

    //use context for favorite list
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

    const [genreList, setGenreList] = useState([]);
    const [selectedGenreList, setSelectedGenreList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [moviesList, setMoviesList] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;
    const getMovies = async () => {
        const result = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`, {
            params: {
                page: page,
                with_genres: selectedGenreList.join()
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

    useEffect(() => {
        // window.scroll(0, 0);
        getGenres().then((r) => {
            setGenreList(r.genres);
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
    }, [page, selectedGenreList, favoriteList]);


    return (
        <div>
            <h1>Movies</h1>

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
                </div>

                <div className="movies">
                    {moviesList.map((movie, i) => {
                        return (
                            <SingleContent key={i}
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