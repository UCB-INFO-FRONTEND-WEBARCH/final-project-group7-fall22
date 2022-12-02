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
    // Set trending list url from api endpoint
  const trendingListBaseUrl = "https://api.themoviedb.org/3/trending/all/day";
    // Set api key, which is from global
  const apiKey = process.env.REACT_APP_API_KEY;

    // get all trending list by day
  const getTrendingList = async () => {
    const response = await axios.get(trendingListBaseUrl, {
        params: {
            api_Key: apiKey,
            language: 'en-US'
        }
    }). catch((error) => console.log(error))
    return response.data;
  };
    // set current page
  const currentPagination = (event, value) => {
    setPage(value);
    window.scroll(0, 0);
};

  useEffect(() => {
    getTrendingList().then((data) => {
        setTrendingList(data.results);
    });
  }, [page]);

  return (
    <div>
      <span>Trending</span>
      <div className="trending-list">
        {trendingList.map((trending, idx)=>{
            return (
                <SingleContent
                    key={trending.id}
                    id={trending.id}
                    poster={trending.poster_path}
                    title={trending.title || trending.name}
                    date={trending.first_air_date || trending.release_date}
                    media_type={trending.media_type}
                    vote_average={trending.vote_average}>
                </SingleContent>
            )
        })} 
      </div>
      <Pagination onchange={currentPagination} />
    </div>
  );
};

export default Trending;