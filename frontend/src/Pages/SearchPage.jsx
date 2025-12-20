import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cards from '../components/Cards'

function SearchPage() {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const query = location?.search?.slice(3)

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/collection`, {
        params: {
          query: location?.search?.slice(3),
          page: page

        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ]
      })
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }

  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
      fetchData()
    }
  }, [location?.search])

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage(preve => preve + 1)
    }
  }

  useEffect(() => {
    if (query) {
      fetchData()
    }
  }, [page])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

  console.log("location",);

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-2 mt-4 sticky top-[70px] z-30'>
        <input type='text' placeholder='Search here.... '
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20")?.join(" ")}
          className='px-4 py-1 w-full bg-white h-10 text-black rounded-full'
        />

      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-bold my-3 text-red-600 ml-3'>Search Result</h3>

        <div className='flex flex-wrap grid-cols-[repeat(auto-fit ,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((searchData, index) => {
              return (
                <Cards data={searchData} key={searchData.id + "Search"} media_type={searchData.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
