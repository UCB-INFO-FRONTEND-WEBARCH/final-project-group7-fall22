import SingleContent from "../../Components/SingleContent/SingleContent";
import {useEffect, useState} from "react";
import axios from "axios";
import FilterChip from "../../Components/FilterChip/FilterChip";
import Pagination from '@material-ui/lab/Pagination';
import "./Movies.css";

const Movies = () => {
    const [genreList, setGenreList] = useState([]);
    const [selectedGenreList, setSelectedGenreList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [moviesList, setMoviesList] = useState([]);

    const apiKey = process.env.REACT_APP_API_KEY;
    const getMovies = async ()=>{
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
    
    const getGenres = async ()=>{
        const result = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        ).catch((err) => console.log(err));
        return result.data;
    };

    const handlePagination = (e, value)=>{
        setPage(value);
        window.scroll(0, 0);
    };

    const handleSelectGenre = (id) => {
        setSelectedGenreList([...selectedGenreList, id]);
    };

    const handleDeselectGenre = (id) => {
        setSelectedGenreList([...selectedGenreList].filter(e => e !== id));
    };

    useEffect(()=>{
        window.scroll(0, 0);
        getGenres().then((r)=>{
            setGenreList(r.genres);
        });
        
        getMovies().then((r)=>{
            setMoviesList(r.results);
            setTotalPages(r.total_pages);
        });
    }, [page, selectedGenreList]);


    return (
        <div>
            <h1>Movies</h1>
            <div className="filter">
                
                    {genreList.map((genre, i)=>{
                    return (
                    <FilterChip key={i} 
                    label={genre.name} 
                    id={genre.id} 
                    selectHandler={handleSelectGenre} 
                    deselectHandler={handleDeselectGenre} />)
                })}
            
            </div>
            <div className="movies">
                    {moviesList.map((movie, i)=>{
                        return (
                        <SingleContent key={i}
                        id={movie.id}
                        poster_path={movie.poster_path}
                        name={movie.name || movie.title}
                        date={movie.first_air_date || movie.release_date}
                        media_type="movie"
                        vote_average={movie.vote_average}
                            />)
                    })}
            </div>

            <div className="pagination">
                <Pagination count={totalPages} color="primary" onChange={handlePagination} />
            </div>
        </div>
    );
}

export default Movies;