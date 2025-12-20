import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import useFetchDetails from '../hooks/useFetchDetails';

function VideoPlay({ data, close ,media_type}) {
  const { data: videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`)
  console.log("videoPlay ",videoData);
  
  return (
    <section className='fixed bg-neutral-700 lg:top-0 -top-36 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>
        <button onClick={close} className='absolute right-3 top-3 text-2xl text-red-600 font-bold'>
          <IoCloseSharp />
        </button>

        <iframe src={`https://www.youtube.com/embed?v=${videoData?.results[0]?.key}`} className='w-full h-full'>
          
        </iframe>
      </div>
    </section>
  )
}

export default VideoPlay

