import React, { useState, useEffect } from 'react'
import favoriteService from '../../services/favoriteService';
import AnimalCard from '../AnimalCard/AnimalCard';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await favoriteService.getFavorites();
        console.log(data)
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching Favorties:', error);
      }
    };
    fetchFavorites();
  }, []);



  return (
    // <>
    //   <div className="card-container">
    //     {favorites.map((favorite) => (
    //       <div key={favorite.id} className="animal-card">
    //         <AnimalCard animal={favorite} />
    //       </div>
    //     ))}
    //   </div>
    // </>
    <>
      <div className="card-container">
        {favorites != undefined ? (
          favorites.map((favorite) => (
            <div key={favorite.id} className="animal-card">
              <AnimalCard animal={favorite} />
            </div>
          ))
        ) : (
          <p>No favorites yet.</p> // Display this message when there are no favorites
        )}
      </div>
    </>

  )
}

export default FavoritesList