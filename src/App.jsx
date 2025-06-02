import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrendingMovies from "./pages/TrendingMovies";
import MovieDetail from "./pages/MovieDetail";
import Favourites from "./pages/Favourites";
import Navbar from "./components/Navbar";  // Make sure this path is correct

function App() {
  return (
    <Router>
      <Navbar /> {/* Add this line here */}
      <Routes>
        <Route path="/" element={<TrendingMovies language="" />} />
        <Route path="/hindi" element={<TrendingMovies language="hi" />} />
        <Route path="/english" element={<TrendingMovies language="en" />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
