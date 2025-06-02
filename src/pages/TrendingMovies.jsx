import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useLocation } from "react-router-dom";

const TrendingMovies = ({ language }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchTrendingMovies();
    }
    // refetch when language changes or path changes (Home, Hindi, English)
  }, [language, location.pathname]);

 const fetchTrendingMovies = async () => {
  let url = "";

  // Home: trending movies (all)
  if (!language) {
    url = `https://api.themoviedb.org/3/trending/movie/week?api_key=7d1a2de8d6959b1e581f50c90bdcecd0`;
  }
  // Hindi or English: use discover with original_language
  else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=7d1a2de8d6959b1e581f50c90bdcecd0&with_original_language=${language}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
};


  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchTrendingMovies();
      return;
    }

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=7d1a2de8d6959b1e581f50c90bdcecd0&query=${searchQuery}`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-center p-20 bg-slate-900">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-4 py-2 rounded-l bg-white text-black w-64 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Movie Cards */}
      <div className="bg-slate-900 flex flex-wrap justify-center p-4">
        {movies.length === 0 ? (
          <p className="text-white">No movies found.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
              summary={movie.overview?.slice(0, 100) + "..."}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TrendingMovies;
