import { configureStore } from "@reduxjs/toolkit"
import rootReducers from "../_features"

const store = configureStore({
  reducer: rootReducers,
})

export default store
