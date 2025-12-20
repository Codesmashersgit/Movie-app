import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/index.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'

// Import the CSS
import './App.css';


axios.defaults.baseURL = "https://api.themoviedb.org/3"
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
console.log("Loaded Token:", token); // Use import.meta.env for Vite
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.warn("Authorization token is missing!"); 
}

createRoot(document.getElementById('root')).render(
//<React.StrictMode>
   <Provider store={store} >
     <RouterProvider router={router}/>
   </Provider>
  //</React.StrictMode>,
)
