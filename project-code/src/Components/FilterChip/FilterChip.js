import Chip from '@material-ui/core/Chip';
import React, { useState, useEffect } from 'react';

function FilterChip(props) {
    const { label, id, selectHandler, deselectHandler } = props;
    const [selected, setSelected] = React.useState(false);

    const handleClick = () => {
        setSelected(!selected);
    }

    useEffect(() => {
        if (selected) {
            selectHandler(id);
        } else {
            deselectHandler(id);
        }
    }, [selected]);

    return (
        <Chip label={label} onClick={handleClick} color={selected ? "primary" : "default"} />
    );
}

export default FilterChip;