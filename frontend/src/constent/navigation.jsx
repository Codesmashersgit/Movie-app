
import { BiMoviePlay } from "react-icons/bi";
import { MdTv } from "react-icons/md";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";

// Helper to create navigation items with consistent keys and labels
const createNavItem = (label, href, icon) => ({
  label,
  href,
  icon
});

// Standard desktop navigation
export const navigation = [
  createNavItem('Movies', '/explore/movie', <BiMoviePlay />),
  createNavItem('TV Shows', '/explore/tv', <MdTv />),
];

// Mobile navigation adds a home and search link
export const mobileNavigation = [
  createNavItem("Home", "/", <IoHomeOutline />),
  ...navigation,  // Adds Movies and TV Shows dynamically
  createNavItem("Search", "/search", <IoSearchOutline />),
];
