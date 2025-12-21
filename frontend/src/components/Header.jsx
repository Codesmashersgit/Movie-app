
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import user from "../assets/user.png";
import { navigation } from "../constent/navigation";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get search query safely
  const query = new URLSearchParams(location.search).get("q") || "";

  const [searchInput, setSearchInput] = useState(query);

  // ✅ Debounced search (industry standard)
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

  return (
    <header className="fixed top-0 w-full h-16 bg-[#23272a]/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex items-center h-full">

        {/* LOGO */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://images.indianexpress.com/2024/01/Movie-Street-feat-2.jpg?w=640"
            alt="Movie Logo"
            
            className="mix-blend-lighten p-2 w-[120px]"
          />
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6 ml-6 text-lg font-semibold">
          {navigation.map((nav) => (
            <NavLink
              key={nav.label}
              to={nav.href}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SECTION */}
        <div className="ml-auto flex items-center gap-6">

          {/* SEARCH */}
          <form
            onSubmit={handleSubmit}
            className="hidden lg:flex items-center bg-gray-800 px-3 py-1 rounded-full"
          >
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-transparent outline-none text-sm text-white w-96"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-xl text-gray-300 hover:text-white"
            >
              <GoSearch />
            </button>
          </form>

          {/* USER */}
          <Link
            to="/login"
            className="w-9 h-9 rounded-full overflow-hidden cursor-pointer active:scale-95 transition"
          >
            <img
              src={user}
              alt="User"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
