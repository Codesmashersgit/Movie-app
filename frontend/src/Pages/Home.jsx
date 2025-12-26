// import React, { useEffect, useState } from 'react'
// import BannerHome from '../components/BannerHome'
// import { useSelector } from 'react-redux'

// import Cards from '../components/Cards'
// import HorizantalScroll from '../components/HorizantalScroll'
// import axios from 'axios'
// import UseFetch from '../hooks/useFetch'



// function Home() {
//   const trendingData = useSelector(state => state.netflix.
//     bannerData
//   )

//   const {data : nowPlayingData} = UseFetch('/movie/now_playing')
//   const {data : topRatedData} = UseFetch('/movie/top_rated')
//   const {data : PopularTvShowsData} = UseFetch('/tv/popular')
//   const {data : onTheAirShowData} = UseFetch('/tv/on_the_air')
//   const {data : TodayAirShowsData} = UseFetch('/tv/airing_today')
 
//   return (
//     <div className='ml-4'>
//       <BannerHome />
//       <HorizantalScroll data={trendingData} heading={"Trending"} trending={true}  />
//       <HorizantalScroll data={nowPlayingData} heading={"Now Playing"} media_type={"movies"}  />
//       <HorizantalScroll data={topRatedData} heading={"Top Rated Movies"} media_type={"movies"} />
//       <HorizantalScroll data={PopularTvShowsData} heading={"Popular TV Shows"} media_type={"tv"} />
//       <HorizantalScroll data={onTheAirShowData} heading={"On The Air Shows"} media_type={"tv"} />
//       <HorizantalScroll data={TodayAirShowsData} heading={"Today Air Shows"} media_type={"tv"} />
      
//     </div>
//   )
// }

// export default Home


import React from 'react';
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizantalScroll from '../components/HorizantalScroll';
import UseFetch from '../hooks/useFetch';

function Home() {
  // ✅ Redux: Trending / Banner Data
  const trendingData = useSelector(state => state.netflix.bannerData) || [];

  // ✅ Movies & TV Shows API
  const { data: nowPlayingData, loading: nowPlayingLoading, error: nowPlayingError } = UseFetch('/movie/now_playing');
  const { data: topRatedData, loading: topRatedLoading, error: topRatedError } = UseFetch('/movie/top_rated');
  const { data: popularTvShowsData, loading: popularTvLoading, error: popularTvError } = UseFetch('/tv/popular');
  const { data: onTheAirShowData, loading: onTheAirLoading, error: onTheAirError } = UseFetch('/tv/on_the_air');
  const { data: todayAirShowsData, loading: todayAirLoading, error: todayAirError } = UseFetch('/tv/airing_today');

  // ✅ Utility function for safe rendering
  const renderScroll = (data, heading, media_type, loading, error) => {
    if (loading) return <p className="text-white text-center my-4">Loading {heading}...</p>;
    if (error) return <p className="text-red-500 text-center my-4">Error loading {heading}</p>;
    return <HorizantalScroll data={data || []} heading={heading} media_type={media_type} />;
  };

  return (
    <div className="pt-4">
      {/* Banner */}
      <BannerHome />

      {/* Trending */}
      <HorizantalScroll data={trendingData} heading="Trending" trending={true} />

      {/* Now Playing */}
      {renderScroll(nowPlayingData, "Now Playing", "movies", nowPlayingLoading, nowPlayingError)}

      {/* Top Rated Movies */}
      {renderScroll(topRatedData, "Top Rated Movies", "movies", topRatedLoading, topRatedError)}

      {/* Popular TV Shows */}
      {renderScroll(popularTvShowsData, "Popular TV Shows", "tv", popularTvLoading, popularTvError)}

      {/* On The Air Shows */}
      {renderScroll(onTheAirShowData, "On The Air Shows", "tv", onTheAirLoading, onTheAirError)}

      {/* Today Air Shows */}
      {renderScroll(todayAirShowsData, "Today Air Shows", "tv", todayAirLoading, todayAirError)}
    </div>
  );
}

export default Home;
