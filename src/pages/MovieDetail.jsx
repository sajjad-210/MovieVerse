import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7d1a2de8d6959b1e581f50c90bdcecd0`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!movie) return;
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setIsFavourite(favs.some((fav) => fav.id === movie.id));
  }, [movie]);

  const toggleFavourite = () => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = favs.some((fav) => fav.id === movie.id);

    let updatedFavs;
    if (exists) {
      updatedFavs = favs.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavs = [
        ...favs,
        {
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
          summary: movie.overview,
        },
      ];
    }

    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
    setIsFavourite(!exists);
  };

  const handlePlay = () => {
    if (movie.homepage) {
      window.open(movie.homepage, "_blank");
    } else {
      alert("Sorry, no official streaming link available.");
    }
  };

  if (!movie) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col md:flex-row items-center p-8">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full md:w-1/3 rounded-lg shadow-lg mb-6 md:mb-0"
      />
      <div className="md:ml-10 max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
        <p className="text-yellow-400 text-xl font-semibold mb-2">
          ⭐ {movie.vote_average}
        </p>
        <p className="mb-4">
          <span className="text-gray-400">Release Year:</span>{" "}
          {movie.release_date?.slice(0, 4)}
        </p>
        <p className="text-gray-200 mb-6">{movie.overview}</p>

        <div className="flex space-x-4">
          <button
            onClick={handlePlay}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-semibold transition duration-300"
          >
            ▶ Play
          </button>

          <button
            onClick={toggleFavourite}
            className={`px-6 py-2 rounded-md font-semibold transition duration-300 ${
              isFavourite
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {isFavourite ? "❤️ Remove from Favourites" : "🤍 Add to Favourites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
