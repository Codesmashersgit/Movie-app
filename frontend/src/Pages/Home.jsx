import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'

import Cards from '../components/Cards'
import HorizantalScroll from '../components/HorizantalScroll'
import axios from 'axios'
import UseFetch from '../hooks/useFetch'



function Home() {
  const trendingData = useSelector(state => state.netflix.
    bannerData
  )

  const {data : nowPlayingData} = UseFetch('/movie/now_playing')
  const {data : topRatedData} = UseFetch('/movie/top_rated')
  const {data : PopularTvShowsData} = UseFetch('/tv/popular')
  const {data : onTheAirShowData} = UseFetch('/tv/on_the_air')
  const {data : TodayAirShowsData} = UseFetch('/tv/airing_today')
 
  return (
    <div className='ml-4'>
      <BannerHome />
      <HorizantalScroll data={trendingData} heading={"Trending"} trending={true}  />
      <HorizantalScroll data={nowPlayingData} heading={"Now Playing"} media_type={"movies"}  />
      <HorizantalScroll data={topRatedData} heading={"Top Rated Movies"} media_type={"movies"} />
      <HorizantalScroll data={PopularTvShowsData} heading={"Popular TV Shows"} media_type={"tv"} />
      <HorizantalScroll data={onTheAirShowData} heading={"On The Air Shows"} media_type={"tv"} />
      <HorizantalScroll data={TodayAirShowsData} heading={"Today Air Shows"} media_type={"tv"} />
      
    </div>
  )
}

export default Home
