
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'

function ExplorePage() {
  const { explore } = useParams() 
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const token = import.meta.env.VITE_APP_ACCESS_TOKEN

  const fetchData = async () => {
    if (!explore) return
    if (!token) {
      setError("API token missing. Check your .env file.")
      return
    }
    if (loading) return
    if (totalPageNo && pageNo > totalPageNo) return

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/${explore}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page: pageNo
        }
      })

      setData(prev => [...prev, ...response.data.results])
      setTotalPageNo(response.data.total_pages)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to fetch data. Check explore type or API token.")
    } finally {
      setLoading(false)
    }
  }

  // Infinite scroll
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      if (pageNo < totalPageNo) {
        setPageNo(prev => prev + 1)
      }
    }
  }

 
  useEffect(() => {
    fetchData()
  }, [pageNo, explore])


  useEffect(() => {
    setPageNo(1)
    setData([])
    setTotalPageNo(0)
  }, [explore])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageNo, totalPageNo])


  if (!explore) {
    return (
      <div className='py-16 ml-3'>
        <p className='text-red-500 text-center'>Invalid route! Please use /explore/movie or /explore/tv</p>
      </div>
    )
  }

  return (
    <div className='py-16 ml-3'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-bold my-3 text-red-600'>
          Popular {explore} Shows
        </h3>

        {error && <p className="text-red-500">{error}</p>}

        <div className='flex flex-wrap grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map(item => (
            <Cards data={item} key={item.id + "ExploreSection"} media_type={explore} />
          ))}
        </div>

        {loading && <p className="text-center mt-4">Loading...</p>}
        {!loading && pageNo >= totalPageNo && data.length > 0 && <p className="text-center mt-4">No more shows</p>}
      </div>
    </div>
  )
}

export default ExplorePage
