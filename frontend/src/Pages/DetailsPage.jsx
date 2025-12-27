
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UseFetch from '../hooks/useFetch';
import useFetchDetails from '../hooks/useFetchDetails';
import Divider from '../components/Divider';
import HorizantalScroll from '../components/HorizantalScroll';
import VideoPlay from '../components/VideoPlay';
import Cards from '../components/Cards';

function DetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const imageURL = useSelector(state => state.netflix.imageURL);

  const isCollection = params.explore === "collection";

  // Fetch main data
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);

  // For collection, pick first movie for UI
  const firstMovieId = isCollection ? data?.parts?.[0]?.id : null;
  const { data: proxyMovie } = useFetchDetails(
    isCollection && firstMovieId ? `/movie/${firstMovieId}` : null
  );

  const finalData = isCollection ? proxyMovie : data;

  // Cast & recommendations only for movie/tv
  const { data: castData } = useFetchDetails(
    !isCollection ? `/${params?.explore}/${params?.id}/credits` : null
  );
  const { data: similarData } = UseFetch(
    !isCollection ? `/${params?.explore}/${params?.id}/similar` : null
  );
  const { data: recommendationData } = UseFetch(
    !isCollection ? `/${params?.explore}/${params?.id}/recommendations` : null
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");
  const token = localStorage.getItem("token");

  const handlePlayVideo = (videoData) => {
    if (!token) navigate("/login");
    else {
      setPlayVideoId(videoData);
      setPlayVideo(true);
    }
  };

  const duration =
    finalData?.runtime &&
    (Number(finalData.runtime) / 60).toFixed(1).split(".");

  const writer = castData?.crew?.length > 0
    ? castData.crew.filter(el => el?.job === "Writer").map(el => el?.name).join(", ")
    : "N/A";

  const director = castData?.crew?.length > 0
    ? castData.crew[0]?.name
    : "N/A";

  return (
    <div>
      {/* Banner */}
      {finalData?.backdrop_path && (
        <div className='w-full h-[280px] relative hidden lg:block'>
          <img
            src={imageURL + finalData.backdrop_path}
            className='h-full w-full object-cover'
            alt="banner"
          />
          <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
        </div>
      )}

      {/* Main content */}
      <div className='container mx-auto px-3 py-16 lg:py-0 flex gap-5 lg:gap-10 lg:flex-row flex-col'>
        {/* Poster + Watch Button */}
        <div className='lg:-mt-28 relative mx-auto w-fit lg:mx-0 min-w-60'>
          {finalData?.poster_path && (
            <img
              src={imageURL + finalData.poster_path}
              className='h-80 w-60 object-cover rounded'
              alt="poster"
            />
          )}
          <button
            onClick={() => handlePlayVideo(finalData)}
            className='mt-3 w-full px-4 py-2 text-center bg-blue-600 font-extrabold text-lg rounded-full text-black hover:text-white'
          >
            Watch Now
          </button>
        </div>

        {/* Details */}
        <div>
          <h2 className='text-2xl lg:text-4xl font-bold text-green-500'>
            {isCollection ? data?.name : finalData?.title || finalData?.name}
          </h2>
          <p className='text-xl font-bold text-neutral-600'>{finalData?.tagline}</p>

          <div>
            <Divider />
            <p className='font-bold'>Rating: {Number(finalData?.vote_average || 0).toFixed(1)}</p>
            <Divider />
            <p className='font-bold'>View: {Number(finalData?.vote_count || 0)}</p>
            {duration && (
              <>
                <Divider />
                <p className='font-bold'>Duration: {duration[0]}hr {duration[1]}min</p>
              </>
            )}
            <Divider />
            <p className='font-bold'>Release Date: {finalData?.release_date || "N/A"}</p>
            <Divider />
            <p className='font-bold'>Overview: {finalData?.overview || "N/A"}</p>
            {!isCollection && (
              <>
                <Divider />
                <p className='font-bold'>Status: {finalData?.status || "N/A"}</p>
                <Divider />
                <p className='font-bold'>Director: {director}</p>
                <Divider />
                <p className='font-bold'>Writer: {writer}</p>
              </>
            )}
          </div>

          {/* Star Cast */}
          {!isCollection && castData?.cast?.length > 0 && (
            <>
              <Divider />
              <h2 className='text-lg lg:text-2xl font-bold my-3'>Star Cast:</h2>
              <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-4 ml-5'>
                {castData.cast
                  .filter(el => el.profile_path)
                  .map(star => (
                    <div key={star.id}>
                      <img
                        src={imageURL + star.profile_path}
                        className='w-24 h-24 object-cover rounded-full'
                        alt={star.name}
                      />
                      <p className='font-bold text-center text-sm text-neutral-400'>{star.name}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Collection Movies */}
      {isCollection && data?.parts?.length > 0 && (
        <div className='container mx-auto px-4'>
          <Divider />
          <h2 className='text-xl font-bold my-4'>Movies in this Collection</h2>
          <div className='flex flex-wrap gap-6'>
            {data.parts.map(movie => (
              <Cards key={movie.id} data={movie} media_type="movie" />
            ))}
          </div>
        </div>
      )}

      {/* Similar & Recommendations (movie/tv only) */}
      {!isCollection && (
        <div className='ml-3'>
          <HorizantalScroll data={similarData} heading={`Similar ${params?.explore}`} media_type={params?.explore} />
          <HorizantalScroll data={recommendationData} heading={`Recommendation ${params?.explore}`} media_type={params?.explore} />
        </div>
      )}

      {/* Video Player */}
      {playVideo && (
        <VideoPlay data={playVideoId} close={() => setPlayVideo(false)} media_type={isCollection ? "movie" : params?.explore} />
      )}
    </div>
  );
}

export default DetailsPage;
