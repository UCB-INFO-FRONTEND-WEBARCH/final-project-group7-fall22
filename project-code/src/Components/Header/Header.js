import "./Header.css";
import TopNav from "../TopNav/TopNav";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const onClickLogo = () => {
        window.scroll(0, 0);
        navigate("/");
    }

    return (
        <div className="header">
            <span onClick={onClickLogo} className="website-name">
                HEXAGON
            </span>
            <SearchBar/>
            <TopNav/>
        </div>
    );
};

export default Header;