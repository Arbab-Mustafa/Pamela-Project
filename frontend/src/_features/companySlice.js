import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axios from "../_interceptor/customAxios"
import { userRefresh } from "./authSlice"

const initialState = {
  companyData: null,
  error: null,
  isLoading: false,
  message: null,
}

export const companyCreate = createAsyncThunk(
  "/company/create",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("/company/create", body)
      if (response?.data?.success) {
        thunkApi.dispatch(userRefresh())
      }
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyReset: (state) => {
      state.companyData = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyCreate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(companyCreate.fulfilled, (state, action) => {
        state.isLoading = false
        state.companyData = action?.payload?.data
        state.message = action?.payload?.data?.message
      })
      .addCase(companyCreate.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
  },
})

// Action creators are generated for each case reducer function
export const { companyReset } = companySlice.actions

export default companySlice.reducer
