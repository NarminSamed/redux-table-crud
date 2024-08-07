import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/categories/categoriesSlice'


export const store = configureStore({
  reducer: {
    categories: categoriesReducer
  },
})

