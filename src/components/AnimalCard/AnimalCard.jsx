import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import favoriteService from '../../services/favoriteService';

const AnimalCard = ({ animal }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false)

  console.log(animal)
  const displayImage = animal.photo_url.photo.length > 0 ? animal.photo_url.photo[0].medium : null;
  // const displayImage = animal.photo_url;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await favoriteService.getFavorites(); // Fetch the list of favorites
        // Assuming 'favorites' is an array of animal objects or IDs
        const favoriteIds = favorites.map(fav => fav.id); // Adjust based on your data structure
        setIsFavorite(favoriteIds.includes(animal.id));
      } catch (error) {
        console.error('Failed to fetch favorites', error);
      }
    };

    fetchFavorites();
  }, [animal.id]);

  const toggleFavorite = async () => {
    // Toggle favorite logic (add or remove), similar to previous examples
    if (isFavorite) {
      await favoriteService.removeFavorites(animal.id);
    } else {
      await favoriteService.addFavorites(animal.id);
    }
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`/animals/${animal.id}`);
  };

  return (
    // Regular display
    // <div className="animal-card">
    //   {displayImage && <img src={displayImage} alt={`Photo of ${animal.name}`} />}
    //   <h2>{animal.name}</h2>
    //   <p>Age: {animal.age}</p>
    //   <p>Location: {animal.location}</p>
    // </div>

    //Link Alt

    // <Link to={`/animals/${animal.id}`} className="animal-card">
    //   {displayImage && <img src={displayImage} alt={`Photo of ${animal.name}`} />}
    //   <h2>{animal.name}</h2>
    //   <p>Age: {animal.age}</p>
    //   <p>Location: {animal.location}</p>
    //   {/* Add more details as per your requirement */}
    // </Link>

    //Navigate
    // <div className="animal-card" onClick={handleClick}>
    //   {displayImage && <img src={displayImage} alt={`Photo of ${animal.name}`} />}
    //   <h2>{animal.name}</h2>
    //   <p>Age: {animal.age}</p>
    //   <p>Location: {animal.location}</p>
    //   {/* Add more details as per your requirement */}
    // </div>

    //Favorite Button
    <div className="animal-card" onClick={() => navigate(`/animals/${animal.id}`)}>
      {displayImage && <img src={displayImage} alt={animal.name} />}
      <h2>{animal.name}</h2>
      <p>Age: {animal.age}</p>
      <p>Location: {animal.location}</p>
      <button onClick={(e) => {
        e.stopPropagation(); // Prevent navigation
        toggleFavorite();
      }}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>


  )
}

export default AnimalCard