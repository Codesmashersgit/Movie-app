import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'

function ExplorePage() {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  console.log("params", params.
    explore
  )

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.
        explore}`, {
        params: {
          page: pageNo
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...response.data.results
        ]
      })
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo(preve => preve + 1)
    }
  }
  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  useEffect(() => {
    window.addEventListener("scroll",handleScroll)
  }, [])
  return (

    <div className='py-16 ml-3'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-bold my-3 text-red-600'>Popular {params.
          explore} Shows</h3>

        <div className='flex flex-wrap grid-cols-[repeat(auto-fit ,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((item, index) => {
              return (
                <Cards data={item} key={item.id + "ExploreSection"} media_type={params.
                  explore} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
