
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import userImg from "../assets/user.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState(
    new URLSearchParams(location.search).get("q") || ""
  );
  const [openMenu, setOpenMenu] = useState(false);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const authUser = storedUser ? JSON.parse(storedUser) : null;

  // 🔹 Debounced Search
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
      setOpenMenu((prev) => !prev);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpenMenu(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <p className="tracking-widest lg:text-[25px] text-[14px] text-red-500 uppercase font-semibold">
  Movie Street
</p>

        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-lg font-semibold">
          <NavLink
            to="/explore/movie"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/explore/tv"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }
          >
            TV
          </NavLink>
        </nav>

        {/* Search + User */}
        <div className="flex items-center gap-5">

          {/* ✅ Single Search Bar (Mobile + Desktop) */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-800 px-3 py-1 rounded-full
                       w-36 sm:w-56 md:w-72 lg:w-96"
          >
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-transparent outline-none text-sm text-white w-full py-2"
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

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="w-9 h-9 rounded-full overflow-hidden active:scale-95 transition"
            >
              <img
                src={userImg}
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>

            {token && authUser && openMenu && (
              <div
  className="
   absolute right-0 mt-3 w-56
    bg-[#2c2f33] rounded-lg shadow-lg p-4 text-white

    max-sm:fixed
    max-sm:top-14
    max-sm:right-1
    max-sm:w-[60%]
    max-sm:max-w-[320px]
    max-sm:rounded-xl
    max-sm:z-50
  "
>

                <p className="font-semibold">{authUser.name}</p>
                <p className="text-sm text-gray-400 truncate">
                  {authUser.email}
                </p>
                <hr className="my-3 border-gray-600" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
