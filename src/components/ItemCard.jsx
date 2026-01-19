import React from 'react';
import { useFavorites } from '../Context/FavoriteContext';
import "../Styles/ItemCard.css";

const ItemCard = ({ item, type, onLearnMore }) => {
  const { addFavorite } = useFavorites();

  const getImageUrl = () => {
    const baseUrl = 'https://starwars-visualguide.com/assets/img';
    
    switch(type) {
      case 'characters':
        return `${baseUrl}/characters/${item.uid}.jpg`;
      case 'planets':
        return `${baseUrl}/planets/${item.uid}.jpg`;
      case 'species':
        return `${baseUrl}/species/${item.uid}.jpg`;
      case 'starships':
        return `${baseUrl}/starships/${item.uid}.jpg`;
      case 'vehicles':
        return `${baseUrl}/vehicles/${item.uid}.jpg`;
      default:
        return 'https://via.placeholder.com/300x400?text=No+Image';
    }
  };

  const handleAddFavorite = () => {
    const properties = item.properties || item;
    
    addFavorite({
      ...properties,
      url: item.url,
      name: item.name,
      id: item.uid,
      type: type
    });
  };

  return (
    <div className="item-card">
      <div className="card-image-container">
        <img
          src={getImageUrl()}
          alt={item.name}
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        
        <div className="card-actions">
          <button 
            className="btn btn-learn-more" 
            onClick={() => onLearnMore(item)}
            title="View detailed information"
          >
            Learn More
          </button>
          
          <button 
            className="btn btn-favorite" 
            onClick={handleAddFavorite}
            title="Add to favorites"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
