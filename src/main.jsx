import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { FavoritesProvider } from "./Context/FavoriteContext";
import './scrollHelper.js'; 

const Main = () => {
  return (
    <React.StrictMode>
      <FavoritesProvider> 
        <RouterProvider router={router} />
      </FavoritesProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
