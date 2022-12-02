import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent"
import Pagination from '@material-ui/lab/Pagination';
import "./Trending.css";

import { FavoriteContext } from "../../App";

const Trending = () => {
    // Set current page
    const [page, setPage] = useState(1);
    // Set current content
    const [trendingList, setTrendingList] = useState([]);

    const [totalPages, setTotalPages] = useState(0);

    // use context for favorite list
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);


    // Set api key, which is from global
    const apiKey = process.env.REACT_APP_API_KEY;
    // Set trending list url from api endpoint
    const trendingListUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`;

    // get all trending list by day
    const getTrendingList = async () => {
        const response = await axios.get(trendingListUrl).catch((error) => console.log(error))
        // console.log(response)
        return response.data;
    };


    // set current page

    const currentPagination = (event) => {
        setPage(event.target.textContent);
        // console.log(page)
        window.scroll(0, 0);
    };

    useEffect(() => {
        getTrendingList().then((data) => {
            // setTrendingList(data.results);
            // pick out favorited content from trending list
            const favoritedContent = data.results.filter((content) => {
                return favoriteList.find((favorite) => favorite.id === content.id)
            });

            // add favorited property to trending list
            const favoritedTrendingList = data.results.map((content) => {
                return favoritedContent.find((favorite) => favorite.id === content.id) ? { ...content, favorited: true } : { ...content, favorited: false }
            });

            // set favorited trending list to trending list
            setTrendingList(favoritedTrendingList);
            // console.log(favoritedTrendingList)

            console.log(totalPages);
            setTotalPages(data.total_pages > 10 ? 10 : data.total_pages);
        });
    }, [page, favoriteList]);

    return (
        <div>
            <span className="trending-title">Trending Today</span>
            <div className="trending-list">
                {trendingList.map((trending, idx) => {
                    return (
                        <SingleContent
                            key={trending.id}
                            id={trending.id}
                            poster_path={trending.poster_path}
                            name={trending.title || trending.name}
                            date={trending.first_air_date || trending.release_date}
                            media_type={trending.media_type}
                            vote_average={trending.vote_average}
                            addedToFavorite={trending.favorited}>
                        </SingleContent>
                    )
                })}
            </div>
            <Pagination count={totalPages} onChange={currentPagination} />
        </div>
    );
};

export default Trending;