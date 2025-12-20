import { configureStore } from '@reduxjs/toolkit'
import NetflixReducer from './Netflix'
export const store = configureStore({
  reducer: {
    netflix: NetflixReducer
  }
})