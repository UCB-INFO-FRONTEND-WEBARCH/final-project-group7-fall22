import "./Header.css";
import TopNav from "../TopNav/TopNav";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
    return (
        <div className="header">
            <span onClick={() => window.scroll(0, 0)} className="website-name">
                HEXAGON
            </span>
            <SearchBar/>
            <TopNav/>
        </div>
    );
};

export default Header;