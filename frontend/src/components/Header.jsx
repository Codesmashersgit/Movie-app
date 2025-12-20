import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import user from '../assets/user.png'
import { GoSearch } from "react-icons/go";
import { navigation } from "../constent/navigation"; 

function Header() {
  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  
  
  const [searchInput, setSearchInput] = useState(removeSpace)
  const navigate = useNavigate()
 
    
  useEffect(() => {
    if(searchInput){
      navigate(`/search?q=${searchInput}`)
    }
  }, [searchInput])

  const handleSubmit = (e) => {
    e.preventDefault()

  }
  return (
    <header className='fixed top-0 w-full h-16 bg-[#23272a] z-40 opacity-70'>
      <div className='containerr mx-auto px-2 flex  items-center h-full'>
        <Link to={"/"}>
          <img src={logo} alt="logo" width={100} className='mix-blend-lighten' />
        </Link>

        <nav className='hidden lg:flex items-center space-x-4 ml-4 text-xl font-bold'>
          {
            navigation.map((nav, index) => {
              return (
                <div>
                  <NavLink key={nav.lable} to={nav.href} className={({ isActive }) => 'px-2 hover:text-neutral-500 ${isActive && "text-neutral-100"}'}>
                    {nav.lable}
                  </NavLink>
                </div>
              )
            })
          }
        </nav>

        <div className='ml-auto flex items-center gap-10 '>
          <form className='flex items-center gap-2 ' onSubmit={handleSubmit}>
            <input type="text" placeholder='search here....' className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block' onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className='text-2xl text-white'>
              <GoSearch />
            </button>
          </form>

          <div className='w-8 h-8 rounded-full overflow-hidden mr-5 items-center cursor-pointer active:scale-50 transition-all'>
            <img src={user} alt="user"
              width='w-full h-full'
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


