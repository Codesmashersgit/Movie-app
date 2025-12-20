import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useFetchDetails(endpoint) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const fetchData = async () =>{
    try {
      const response = await axios.get(endpoint)
      setData(response.data)
      setLoading(false)
      
    } catch (error) {
      console.log("Error fetching data",error);
      
    }
  }
  useEffect(() => {
    fetchData()
    
  }, [endpoint])
  return {
    data,
    loading,
   
  }
}

export default useFetchDetails
