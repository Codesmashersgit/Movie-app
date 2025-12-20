import React from 'react'
import { mobileNavigation } from '../constent/navigation'
import { NavLink } from 'react-router-dom'
function MobileNavigation() {
  return (
    <section className='lg:hidden h-20 bg-black bg-opacity-70 backdrop-blur-3xl fixed bottom-0 w-full z-40'>
      <div className='flex justify-between items-center h-full text-neutral-400'>
        {
          mobileNavigation.map((nav ,index)=>{
            return (
              <NavLink key={nav.lable +"mobilenavigation"} to={nav.href} className={({isActive })=>`px-3 flex h-full items-center justify-center flex-col ${isActive && "text-white"}`}>
                <div className='text-2xl'>
                  {nav.icon}
                </div>
                <p className='text-sm font-bold'>{nav.lable}</p>
              </NavLink>
            )
          })
        }
      </div>
    </section>
  )
}

export default MobileNavigation
