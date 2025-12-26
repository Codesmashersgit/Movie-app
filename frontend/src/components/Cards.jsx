
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FaFilm } from 'react-icons/fa' // Importing an icon for the fallback image

function Cards({ data, trending, index, media_type }) {
  const imageURL = useSelector(state => state.netflix.imageURL)
  const mediaType = data?.media_type || media_type

  return (
    <Link
      to={`/${mediaType}/${data.id}`}
      aria-label={`View details for ${data.title || data.name}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative border-[4px] border-green-700 my-3 hover:scale-105 transition-all"
    >
      {/* POSTER */}
      {data?.poster_path ? (
        <img
          src={imageURL + data.poster_path}
          alt={data.title || data.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-black h-full w-full flex justify-center items-center font-bold text-xl text-red-600">
          <FaFilm size={50} /> No Image Found
        </div>
      )}

      {/* TRENDING BADGE (optional) */}
      {trending && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
          #{index} Trending
        </div>
      )}

      {/* INFO */}
      <div className="absolute bottom-0 backdrop-blur-md w-full bg-black/60 p-2">
        <h2 className="line-clamp-1 text-lg font-extrabold text-green-500">
          {data?.title || data?.name}
        </h2>

        <div className="flex justify-between text-sm">
          <p className="text-gray-400">
            {moment(data?.release_date || data?.first_air_date).format(
              'MMM Do, YYYY'
            )}
          </p>

          <p className="text-yellow-300">
            ⭐ {data?.vote_average ? data.vote_average.toFixed(1) : '0.0'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Cards
