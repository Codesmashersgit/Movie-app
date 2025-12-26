
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function BannerHome() {
  const bannerData = useSelector(state => state.netflix.bannerData);
  const imageURL = useSelector(state => state.netflix.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(prev => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000); // Changed interval to 5 seconds for better user experience

    return () => clearInterval(interval);
  }, [currentImage]);

  if (!bannerData || bannerData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className='relative w-full h-[100vh] overflow-hidden'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {bannerData.map((data, index) => (
          <div key={data.id + "bannerHome" + index} 
               className='flex min-w-full h-[100vh] items-center justify-center relative transition-transform ease-in-out duration-500'
               style={{ transform: `translateX(-${currentImage * 100}%)` }}>
            <div className='w-full h-full'>
              <img src={imageURL + data.backdrop_path} 
                   alt={`Banner for ${data.name || data.title}`} 
                   className='w-full h-full object-cover' />
            </div>

            {/* Overlay Gradient */}
            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

            {/* Navigation Buttons */}
            <div className='absolute top-1/2 left-0 right-0 flex justify-between items-center w-full px-4'>
              <button onClick={handlePrev} 
                      aria-label="Previous Banner" 
                      className='bg-white rounded-full text-black hover:text-blue-400 p-2'>
                <FaCircleChevronLeft size={30} />
              </button>
              <button onClick={handleNext} 
                      aria-label="Next Banner" 
                      className='bg-white rounded-full text-black hover:text-blue-400 p-2'>
                <FaCircleChevronRight size={30} />
              </button>
            </div>

            {/* Banner Content */}
            <div className='absolute bottom-0 w-full p-6 text-white'>
              <div className='max-w-md mx-auto'>
                <h2 className='font-bold text-2xl sm:text-3xl lg:text-4xl mb-4'>{data.name || data.title}</h2>
                <p className='text-ellipsis line-clamp-4 mb-4'>{data.overview}</p>
                <div className='flex items-center gap-4 mb-6'>
                  <p className='text-xl font-bold'>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <span>||</span>
                  <p className='text-xl font-bold'>Views: {Number(data.popularity).toFixed(0)}</p>
                </div>
                <Link to={`/${data.media_type}/${data.id}`}>
                  <button className='w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition-all'>
                    Watch Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BannerHome;
