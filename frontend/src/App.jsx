import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData ,setImageURL } from "./store/Netflix";




function App() {
  const dispach = useDispatch()

  const fetchTrendingData = async () =>{
    try {
      const response = await axios.get('trending/all/week')

      dispach(setBannerData(response.data.results)) 

      
    } catch (error) {
      console.log("Error fetching trending movies", error);
    }
  }

  const fetchConfiguration = async () =>{
    try {
      const responses = await axios.get('/configuration')
      dispach(setImageURL(responses.data.images.secure_base_url+"original"))
     
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  )
}

export default App
