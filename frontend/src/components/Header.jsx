

import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import userImg from "../assets/user.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(new URLSearchParams(location.search).get("q") || "");

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const authUser = storedUser ? JSON.parse(storedUser) : null;

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim()) {
        navigate(`/search?q=${searchInput}`);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  const handleUserClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      setOpenMenu(prev => !prev);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpenMenu(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full h-16 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex items-center h-full">
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://images.indianexpress.com/2024/01/Movie-Street-feat-2.jpg?w=640"
            alt="Movie Logo"
            className=" p-2 w-[120px]"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 ml-6 text-lg font-semibold">
          <NavLink to="/explore/movie" className={({ isActive }) => `transition ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}>
            Movies
          </NavLink>
          <NavLink to="/explore/tv" className={({ isActive }) => `transition ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}>
            TV
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-6">
          <form onSubmit={handleSubmit} className="hidden lg:flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-transparent outline-none text-sm text-white w-96"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="text-xl text-gray-300 hover:text-white">
              <GoSearch />
            </button>
          </form>

          {/* Mobile Search Toggle */}
          <button onClick={() => setOpenSearch(!openSearch)} className="lg:hidden text-xl text-gray-300 hover:text-white">
            <GoSearch />
          </button>

          {openSearch && (
            <form onSubmit={handleSubmit} className="absolute top-16 left-0 w-full bg-gray-800 px-3 py-1 rounded-full flex items-center">
              <input
                type="text"
                placeholder="Search movies..."
                className="bg-transparent outline-none text-sm text-white w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="text-xl text-gray-300 hover:text-white">
                <GoSearch />
              </button>
            </form>
          )}

          <div className="relative" ref={dropdownRef}>
            <button onClick={handleUserClick} className="w-9 h-9 rounded-full overflow-hidden active:scale-95 transition">
              <img src={userImg} alt="User" className="w-full h-full object-cover" />
            </button>

            {token && authUser && openMenu && (
              <div className="absolute right-0 mt-3 w-56 bg-[#2c2f33] rounded-lg shadow-lg p-4 text-white z-50">
                <p className="font-semibold">{authUser.name}</p>
                <p className="text-sm text-gray-400 truncate">{authUser.email}</p>
                <hr className="my-3 border-gray-600" />
                <button onClick={handleLogout} className="w-full text-left text-red-400 hover:text-red-500">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
