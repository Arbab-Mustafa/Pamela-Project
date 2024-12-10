import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import commonReducer from "./commonSlice"
import companyReducer from "./companySlice"
import ordersReducer from "./ordersSlice"
import usersReducer from "./usersSlice"

const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  common: commonReducer,
  company: companyReducer,
  users: usersReducer,
  orders: ordersReducer,
})

export default rootReducers
