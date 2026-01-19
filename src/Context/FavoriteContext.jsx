import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    setFavorites([...favorites, item]);
  };

  const removeFavorite = (item) => {
    setFavorites(favorites.filter(fav => fav.name !== item.name));
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite, 
      removeFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;