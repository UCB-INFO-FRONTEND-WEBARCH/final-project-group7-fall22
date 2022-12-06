import "./SortBySelector.css";

function SortBySelector({onChange}) {
    return (
        <div>
            <label for="sort-by" id="sort-by">Sort by: </label>
            <select className="sort-by-selector" name="sort-by" id="sort-by" onChange={onChange}>
                <option value="popularity.desc">Most Popular</option>
                <option value="release_date.desc">Latest</option>
                <option value="vote_average.desc">Top rated</option>
            </select>
        </div>
    );
}

export default SortBySelector;