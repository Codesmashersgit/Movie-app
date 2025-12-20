import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

function Cards({ data, trending, index ,media_type}) {
  const imageURL = useSelector(state => state.netflix.imageURL)
  const mediaType = data.media_type ?? media_type
  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative border-[4px] border-green-700 my-3 hover:scale-105 transition-all'>

      {
         data?.poster_path?(
           <img src={imageURL + data?.poster_path} />
         ):(
          <div className='bg-black h-full w-full flex justify-center items-center font-bold text-2xl text-red-600'>
            No Image Found
          </div>
         )
      }
      <img src={imageURL + data?.poster_path} />

      <div className='absolute top-3'>
        {
          trending && (
            <div className=''>
              {/* #{index} Trending */}
            </div>
          )
        }
      </div>

      <div className='absolute bottom-0 backdrop-blur-3xl w-full bg-black/60 p-2'>
        <h2 className='text-ellipsis line-clamp-1 text-lg font-extrabold text-green-600'>{data?.title || data?.name}</h2>

        <div className='flex justify-between'>
          <p className='text-gray-400 text-sm'>{moment(data?.release_date || data?.first_air_date).format('MMM Do, YYYY')}</p>
          <p className='text-gray-400 text-sm text-[15px] text-yellow-300'>Rating:-{data?.vote_average? Number(data?.vote_average).toFixed(1) + '+' : '0.0'}</p>
        </div>
      </div>
    </Link>
  )
}

export default Cards
