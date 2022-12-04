import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
// import { Container } from "@material-ui/core";
import Favorite from "./Pages/Favorite/Favorite";
// create context for favorite list
import { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext();


function App() {
  // set favorite list

  const [favoriteList, setFavoriteList] = useState([]);
  // const [favorited, setFavorited] = useState(false);


  // useEffect to set favorite list to local storage
  useEffect(() => {
    const localFavoriteList = localStorage.getItem("favoriteList");
    if (localFavoriteList) {
      setFavoriteList(JSON.parse(localFavoriteList));
    } else {
      localStorage.setItem("favoriteList", JSON.stringify([]));
    }
  }, []);

  return (
    // provide context for favorite list to all children
    <FavoriteContext.Provider value={{
      favoriteList, setFavoriteList,
    }}>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Routes>
            <Route path="/" element={<Trending />} exact />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </div>
      </BrowserRouter >
    </FavoriteContext.Provider>
  );

}

export default App;