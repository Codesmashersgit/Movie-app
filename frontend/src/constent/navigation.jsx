import { BiMoviePlay } from "react-icons/bi";
import { MdTv } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
export const navigation = [

  {
    lable: 'Movies',
    href: '/movie',
    icon: <BiMoviePlay />
  },
  {
    lable: 'TV Shows',
    href: '/tv',
    icon: <MdTv />
  },

]

export const mobileNavigation = [
  {
    lable: "Home",
    href: "/",
    icon: <IoHomeOutline />
  },
  ...navigation,
  {
    lable: "Search",
    href : "/search",
    icon : <IoSearchOutline/>
  }
]


