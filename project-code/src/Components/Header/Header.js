import "./Header.css";
import TopNav from "../TopNav/TopNav";

const Header = () => {
    return (
        <div className="header">
            <span onClick={() => window.scroll(0, 0)} className="website-name">
                HEXAGON
            </span>
            <TopNav/>
        </div>
    );
};

export default Header;