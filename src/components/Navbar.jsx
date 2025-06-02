import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">🎬 MovieVerse</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          </li>
          <li>
            <Link to="/favourites" className="hover:text-yellow-400 transition">Favourites</Link>
          </li>
          <li>
            <Link to="/hindi" className="hover:text-yellow-400 transition">Hindi</Link>
          </li>
          <li>
            <Link to="/english" className="hover:text-yellow-400 transition">English</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
