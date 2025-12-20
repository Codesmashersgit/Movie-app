import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function BannerHome() {
  const bannerData = useSelector(state => state.netflix.
    bannerData
  )
  const imageURL = useSelector(state => state.netflix.imageURL)
  const [currentImage, setCurrentImage] = useState(0)

  const handleNext = () => {
    // your logic for next banner
    if (currentImage < bannerData.length - 1) {
      setCurrentImage(preve => preve + 1)
    }

  }

  const handlPrev = () => {
    // your logic for Prev banner
    if (currentImage > 0) {
      setCurrentImage(preve => preve - 1)
    }
  }

  useEffect(() => {
    const intravle = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      }
      else {
        setCurrentImage(0);
      }
    }, 2000)
    return () => clearInterval(intravle)
  }, [bannerData, imageURL, currentImage])
  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {
          bannerData.map((data, index) => {
            // console.log("data", data);

            return (
              <div key={data.id + "bannerHome" + index} className='min-w-full min-h-[450px] lf:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                <div className='w-full h-full'>
                  <img src={imageURL + data.backdrop_path} alt="" className='h-full object-cover w-full' />
                </div>

                {/* arrow button */}

                <div className='absolute top-0 w-full h-full hidden items-center justify-between font-extrabold text-5xl p-4  group-hover:lg:flex'>
                  <button onClick={handlPrev} className='bg-white rounded-full text-black hover:text-blue-400 z-10 p-1'>
                    <FaCircleChevronLeft />
                  </button>
                  <button onClick={handleNext} className='bg-white rounded-full text-black hover:text-blue-400 z-10 p-1'>
                    <FaCircleChevronRight />
                  </button>
                </div>

                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                <div className='container mx-auto'>
                  <div className='w-full mx-auto absolute bottom-0 max-w-md px-4'>
                    <h2 className='font-bold text-2xl lg:text-4xl'>{data.name}</h2>

                    <h2 className='font-bold text-2xl lg:text-4xl'>{data.title}</h2>

                    <p className='text-ellipsis line-clamp-6 my-2'>{data.overview}</p>
                    <div className='flex items-center gap-4'>
                      <p className='text-xl font-bold'>Rating: {Number(data.
                        vote_average).toFixed(1)}+</p>
                      <span>||</span>
                      <p className='text-xl font-bold '>View: {Number(data.popularity).toFixed(0)}</p>
                    </div>
                    <div>
                      <Link to={"/"+data?.media_type+"/"+data.id}>
                        <button  className='w-full h-10 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-all my-6'>
                          Watch Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default BannerHome
