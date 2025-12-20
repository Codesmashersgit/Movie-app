import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-1 my-10'>
      <div className=' flex justify-center items-center top-8'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBssfGLNtRm8MsqZwnUBBxKbJ03p75nsLlkQ&s" alt="logo" width={200} className='mix-blend-lighten ' />
      </div>
      <div className='flex items-center justify-center gap-4 text-xl'>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </div>
    </footer>
  )
}

export default Footer
