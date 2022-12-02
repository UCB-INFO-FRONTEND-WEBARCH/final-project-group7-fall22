import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../Components/SingleContent/SingleContent"
import Pagination from '@material-ui/lab/Pagination';
import "./Trending.css";

const Trending = () => {
    // Set current page
    const [page, setPage] = useState(1);
    // Set current content
    const [trendingList, setTrendingList] = useState([]);

    const [totalPages, setTotalPages] = useState(0);


    // Set api key, which is from global
    const apiKey = process.env.REACT_APP_API_KEY;
    // Set trending list url from api endpoint
    const trendingListUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`;

    // get all trending list by day
    const getTrendingList = async () => {
        const response = await axios.get(trendingListUrl).catch((error) => console.log(error))
        console.log(response)
        return response.data;
    };


    // set current page

    const currentPagination = (event) => {
        setPage(event.target.textContent);
        console.log(page)
        window.scroll(0, 0);
    };

    useEffect(() => {
        getTrendingList().then((data) => {
            setTrendingList(data.results);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
        });
    }, [page]);

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
                            vote_average={trending.vote_average}>
                        </SingleContent>
                    )
                })}
            </div>
            <Pagination count={totalPages} onChange={currentPagination} />
        </div>
    );
};

export default Trending;