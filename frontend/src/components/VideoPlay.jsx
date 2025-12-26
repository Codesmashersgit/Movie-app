

import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

function VideoPlay({ data, close, media_type }) {
  const { data: videoData, isLoading, error } = useFetchDetails(`/${media_type}/${data?.id}/videos`);
  
  // Handle loading state
  if (isLoading) {
    return <div className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center text-white">Loading video...</div>;
  }
  
  // Handle error state
  if (error) {
    return <div className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center text-white">Failed to load video.</div>;
  }

  // Handle case where no video data is available
  if (!videoData?.results || videoData.results.length === 0) {
    return <div className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center text-white">No video available</div>;
  }

  return (
    <section className='fixed bg-neutral-700 lg:top-0 -top-36 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
        {/* Close button */}
        <button
          onClick={close}
          className='absolute right-3 top-3 text-2xl text-red-600 font-bold hover:text-red-400 transition-all'
        >
          <IoCloseSharp />
        </button>

        {/* Video iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          title="Video Player"
          className='w-full h-full'
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default VideoPlay;
