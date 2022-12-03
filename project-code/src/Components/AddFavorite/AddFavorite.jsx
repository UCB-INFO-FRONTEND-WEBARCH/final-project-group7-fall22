import React from 'react'

// use heart icon from material-ui
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function AddFavorite({favorited }) {
    return (
      //if the item is in the favorite list, show the red heart icon
      <>
            <div className='favorite-area' style={{ color: "red" }}>
                {favorited ? <FavoriteIcon className='favorite-icon' /> :
                    <span className='add-to-favorite-text'>Add to favorite</span>}
            </div>

       
      </>
  )
}
