import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

const MovieCard = ({ id, title, poster, rating, summary }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favs.some((movie) => movie.id === id));
  }, [id]);

  const handleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = favs.some((movie) => movie.id === id);

    let updatedFavs;
    if (exists) {
      updatedFavs = favs.filter((movie) => movie.id !== id);
    } else {
      updatedFavs = [...favs, { id, title, poster, rating, summary }];
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setIsFavourite(!exists);
  };

  return (
    <div className="bg-grey-900 rounded-lg shadow-md p-2 w-64 m-0 transition-transform duration-300 hover:scale-105 hover:shadow-xl relative">
      <Link to={`/movie/${id}`}>
        <img
          src={poster}
          alt={title}
          className="rounded-md w-full h-96 object-cover cursor-pointer"
        />
      </Link>

      <button
        onClick={handleFavourite}
        className="absolute top-2 right-2 text-xl"
      >
        {isFavourite ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default MovieCard;
