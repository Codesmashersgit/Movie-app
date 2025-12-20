import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
function Footer() {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-1 my-10'>
      <div className=' flex justify-center items-center top-8'>
        <img src={logo} alt="logo" width={100} className='mix-blend-lighten ' />
      </div>
      <div className='flex items-center justify-center gap-4 text-xl'>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
      <p className='text-xl'>Created By Raju Bhai</p>
    </footer>
  )
}

export default Footer
