import { useState, useEffect } from "react";
import MovieContext from "./MovieContext";

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isInFavorites = (movieId) =>
    favorites.some((movie) => movie.id === movieId);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
