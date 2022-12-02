import "./MediaTypeSelector.css";

function MediaTypeSelector(props) {
    const {handleChange} = props;

    return (
        <select className="media-type-selector" name="media-type" id="media-type" onChange={handleChange}>
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
        </select>
    );
}

export default MediaTypeSelector;