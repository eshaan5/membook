import { configureStore } from '@reduxjs/toolkit'
import appReducer from './state/index'

export default configureStore({
  reducer: {
    app: appReducer,
  }
})