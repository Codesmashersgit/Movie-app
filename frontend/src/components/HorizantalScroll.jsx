import React, { useRef } from 'react'
import Cards from './Cards'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";


const HorizantalScroll = ({ data = [], heading ,trending ,media_type }) => {
  const containerRef = useRef()

  const handlNext=()=>{
    containerRef.current.scrollLeft+=300
  } 
  const handlPrev=()=>{
    containerRef.current.scrollLeft-=300
  }
  return (
    <div className='container  my-25 mx-auto '>
      <h2 className='text-xl lg:text-2xl font-bold mb-2 text-amber-700 capitalize'>{heading}</h2>

      <div className=' relative'>
        <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] gap-8 grid-flow-col overflow-x-scroll overflow-hidden relative  z-10 scroll-smooth transition-all scrolbar-none'>
          {
            data.map((data, index) => {
              return (
                <Cards key={data.id + "heading" + index} data={data} index={index + 1} trending={trending} media_type={media_type} />
              )
            })
          }
        </div>

        <div className=' absolute top-0 justify-between  hidden lg:flex w-full h-full items-center text-3xl'>
          <button onClick={handlPrev} className='bg-slate-700 text-yellow-100 rounded-full -ml-10 z-10'>
          <FaCircleChevronLeft/>
          </button>
          <button onClick={handlNext} className='bg-slate-700 text-yellow-100 rounded-full -mr-10 z-10'>
          <FaCircleChevronRight/>
          </button>
        </div>
      </div>
    </div>

  )
}

export default HorizantalScroll
