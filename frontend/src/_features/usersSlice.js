import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axios from "../_interceptor/customAxios"

const initialState = {
  users: null,
  singleUser: null,
  error: null,
  isLoading: false,
  message: null,
}

export const getUsers = createAsyncThunk("user/all", async (body, thunkApi) => {
  try {
    const response = await axios.post("/user/all", null, {
      params: { page: body?.page || 1, search: body?.search },
    })
    return response?.data
  } catch (err) {
    return thunkApi({ message: err?.message })
  }
})
export const getSingleUser = createAsyncThunk(
  "user/id",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(`/user/single-user/${body}`)
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)

export const deleteUser = createAsyncThunk(
  "delete/User",
  async (body, thunkApi) => {
    try {
      const response = await axios.delete(`/user/delete-user/${body}`)
      if (response?.data.success) {
        toast.success(response?.data?.message)
        thunkApi.dispatch(getUsers(1))
      }
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    singleUserReset: (state) => {
      state.singleUser = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action?.payload?.data
        state.total = action?.payload?.length
        state.page = action?.payload?.page
        state.nextPage = action.payload?.nextPage
        state.prevPage = action.payload?.prevPage
        state.message = action?.payload?.data?.message
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleUser = action?.payload?.data
        state.message = action?.payload?.data?.message
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
  },
})

// Action creators are generated for each case reducer function
export const { singleUserReset } = userSlice.actions

export default userSlice.reducer
