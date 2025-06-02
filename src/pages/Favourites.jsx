import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  const toggleFavourite = (movie) => {
    const exists = favourites.some((fav) => fav.id === movie.id);
    let updatedFavs;
    if (exists) {
      updatedFavs = favourites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavs = [...favourites, movie];
    }
    setFavourites(updatedFavs);
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
  };

  return (
    <div className="bg-slate-900 flex flex-wrap justify-center p-20">
      {favourites.length === 0 ? (
        <p className="text-white">No favourite movies yet.</p>
      ) : (
        favourites.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            isFavourite={true}  // All movies here are favourites
            onToggleFavourite={() => toggleFavourite(movie)}
          />
        ))
      )}
    </div>
  );
};

export default Favourites;
