import React from 'react'
import { useEffect, useContext } from 'react'
import SingleContent from '../../Components/SingleContent/SingleContent'
import { FavoriteContext } from '../../App';

import './Favorite.css'


export default function Favorite() {

    // use context favorite list
    const { favoriteList, setFavoriteList } = useContext(FavoriteContext);

    useEffect(() => {
        // if the favorite list is not empty, get the favorite list from local storage
        if (localStorage.getItem("favoriteList")) {
            setFavoriteList(JSON.parse(localStorage.getItem("favoriteList")))
        } else {
            setFavoriteList(favoriteList)
            localStorage.setItem("favoriteList", JSON.stringify(favoriteList))
        }
    }, [])

    return (
        // map through favoriteList and render each item on page else display word
        
      <div>
        
        <span className="favorite-title">Favorited list</span>
            <div className="favorite-list">
                {favoriteList?.length === 0? <h1>No items yet</h1>: ""}
                {
                    favoriteList && favoriteList.map((item, idx) => {
                        return (
                            <SingleContent
                                key={item.id}
                                id={item.id}
                                poster_path={item.poster_path}
                                name={item.title || item.name}
                                date={item.date}
                                media_type={item.media_type}
                                vote_average={item.vote_average}
                                addedToFavorite = {item.favorited}>
                            </SingleContent>
                        )
                    })
                }
        </div>
        {/* <Pagination count={totalPages} onChange={currentPagination} /> */}
  </div>
        
              
    
  )
}
