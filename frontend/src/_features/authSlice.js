import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { resetCart } from "./cartSlice"
import axios from "../_interceptor/customAxios"
const userToken = JSON.parse(localStorage.getItem("user_token"))
const userData = JSON.parse(localStorage.getItem("user_data"))
const initialState = {
  userToken: userToken || null,
  userData: userData || null,
  message: null,
  isNewUser: false,
  error: null,
  isLoading: false,
}

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("/auth/login", body)
      if (response?.data?.success) {
        thunkApi.dispatch(resetCart())
      }
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.response?.data?.message })
    }
  }
)
export const userRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const response = await axios.post("/auth/refresh")

      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.response?.data?.message })
    }
  }
)

export const userSignup = createAsyncThunk(
  "auth/authSignup",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("/auth/register", body)
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.response?.data?.message })
    }
  }
)

export const userUpdate = createAsyncThunk(
  "user/update-user",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(`/user/update-user/${body.id}`, {
        firstName: body?.firstName,
        lastName: body?.lastName,
        phone: body?.phone,
      })
      if (response?.data?.success) {
        thunkApi.dispatch(userRefresh())
        toast.success("User Updated Successfully")
      }
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.response?.data?.message })
    }
  }
)
export const adminUserUpdate = createAsyncThunk(
  "user/update-usersds",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(`/user/update-user/${body.id}`, {
        firstName: body?.firstName,
        lastName: body?.lastName,
        phone: body?.phone,
      })
      if (response?.data?.success) {
        toast.success("User Updated Successfully")
      }
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.response?.data?.message })
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userReset: (state) => {
      state.error = null
      state.message = null
      state.isLoading = false
      state.isNewUser = false
    },
    userLogOut: (state) => {
      localStorage.clear()
      state.userToken = null
      state.userData = null
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.userToken = action?.payload?.token
        state.userData = action?.payload?.user
        state.message = action?.payload?.message
        localStorage.setItem("user_token", JSON.stringify(action.payload.token))
        localStorage.setItem("user_data", JSON.stringify(action?.payload?.user))
        toast.success(state.message)
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.error(state.error)
      })
      .addCase(userRefresh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userRefresh.fulfilled, (state, action) => {
        state.isLoading = false
        state.userToken = action?.payload?.token
        state.userData = action?.payload?.user
        state.message = action?.payload?.message
        localStorage.setItem("user_token", JSON.stringify(action.payload.token))
        localStorage.setItem("user_data", JSON.stringify(action?.payload?.user))
      })
      .addCase(userRefresh.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
      })
      .addCase(userUpdate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = { ...state.userData, ...action.payload.user }
        state.message = action?.payload?.message
        localStorage.setItem("user_data", JSON.stringify(action?.payload?.user))
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
      })
      .addCase(adminUserUpdate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(adminUserUpdate.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action?.payload?.message
      })
      .addCase(adminUserUpdate.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
      })

      .addCase(userSignup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.isLoading = false
        state.message = action?.payload?.message
        state.isNewUser = true
        toast.success(state.message)
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.error(state.error)
      })
  },
})

// Action creators are generated for each case reducer function
export const { userReset, userLogOut } = authSlice.actions

export default authSlice.reducer
