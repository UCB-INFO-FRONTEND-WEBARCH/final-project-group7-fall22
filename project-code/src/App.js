import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import SimpleBottomNavigation from "./Components/BottomNav/BottomNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import { Container } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" component={Trending} exact />
          <Route path="/movies" component={Movies} />
          <Route path="/series" component={Series} />
          <Route path="/search" component={Search} />
        </Routes>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;