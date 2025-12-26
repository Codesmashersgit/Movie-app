
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UseFetch from '../hooks/useFetch';
import useFetchDetails from '../hooks/useFetchDetails';
import Divider from '../components/Divider';
import HorizantalScroll from '../components/HorizantalScroll';
import VideoPlay from '../components/VideoPlay';

function DetailsPage() {
  const params = useParams()
  const navigate = useNavigate()
  const imageURL = useSelector(state => state.netflix.imageURL)

  // Fetch data
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = UseFetch(`/${params?.explore}/${params?.id}/similar`)
  const { data: recommendationData } = UseFetch(`/${params?.explore}/${params?.id}/recommendations`)

  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  // Check auth
  const token = localStorage.getItem("token")

  const handlePlayVideo = (videoData) => {
    if (!token) {
      navigate("/login")
    } else {
      setPlayVideoId(videoData)
      setPlayVideo(true)
    }
  }

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".")
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")

  return (
    <div>
      {/* Banner */}
      <div className='w-full h-[280px] relative hidden lg:block'>
        <img src={imageURL + data?.backdrop_path} className='h-full w-full object-cover' />
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      {/* Main content */}
      <div className='container mx-auto px-3 py-16 lg:py-0 flex gap-5 lg:gap-10 lg:flex-row flex-col'>
        {/* Poster + Watch Button */}
        <div className='lg:-mt-28 relative mx-auto w-fit lg:mx-0 min-w-60'>
          <img src={imageURL + data?.poster_path} className='h-80 w-60 object-cover rounded' />
          <button
            onClick={() => handlePlayVideo(data)}
            className='mt-3 w-full px-4 py-2 text-center bg-blue-600 font-extrabold text-lg rounded-full text-black hover:text-white'
          >
            Watch Now
          </button>
        </div>

        {/* Details */}
        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-green-500'>{data?.title || data?.name}</h2>
          <p className='text-xl font-bold text-neutral-600'>{data?.tagline}</p>

          <div>
            <p className='font-bold'><Divider /> Rating: {Number(data?.vote_average).toFixed(1)}</p>
            <Divider />
            <p className='font-bold'>View: {Number(data?.vote_count)}</p>
            <Divider />
            <p className='font-bold'>Duration: {duration[0]}hr {duration[1]}min</p>
            <Divider />
            <p className='font-bold'>Release Date: {data?.release_date}</p>
            <Divider />
            <p className='font-bold'>Overview: {data?.overview}</p>
            <Divider />
            <p className='font-bold'>Status: {data?.status}</p>
            <Divider />
            <p className='font-bold'>Director: {castData?.crew[0]?.name || "N/A"}</p>
            <Divider />
            <p className='font-bold'>Writer: {writer || "N/A"}</p>
          </div>

          {/* Star Cast */}
          <Divider />
          <h2 className='text-lg lg:text-2xl font-bold my-3'>Star Cast:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-4 ml-5'>
            {castData?.cast?.filter(el => el.profile_path)?.map((star, index) => (
              <div key={star.id}>
                <img src={imageURL + star?.profile_path} className='w-24 h-24 object-cover rounded-full' />
                <p className='font-bold text-center text-sm text-neutral-400'>{star?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar & Recommendations */}
      <div className='ml-3'>
        <HorizantalScroll data={similarData} heading={`Similar ${params?.explore}`} media_type={params?.explore} />
        <HorizantalScroll data={recommendationData} heading={`Recommendation ${params?.explore}`} media_type={params?.explore} />
      </div>

      {/* Video Player */}
      {playVideo && (
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={params?.explore} />
      )}
    </div>
  )
}

export default DetailsPage
