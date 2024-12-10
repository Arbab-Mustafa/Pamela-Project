import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../_interceptor/customAxios"

const initialState = {
  state: [],
  services: [],
  isLoading: false,
  message: null,
  selectedService: JSON.parse(localStorage.getItem("selectedItem")) || {},
}

// Fetch all services
export const getServices = createAsyncThunk(
  "common/getServices",
  async (_, thunkApi) => {
    try {
      const response = await axios.post("/services/all")
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err?.message })
    }
  }
)

// Fetch all states
export const stateGet = createAsyncThunk(
  "common/stateGet",
  async (_, thunkApi) => {
    try {
      const response = await axios.post("/services/state-all")
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err?.message })
    }
  }
)

const authSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    selectService: (state, action) => {
      const newService = action.payload
      if (JSON.stringify(newService) !== localStorage.getItem("selectedItem")) {
        localStorage.setItem("selectedItem", JSON.stringify(newService))
      }
      state.selectedService = newService
    },
    removeService: (state) => {
      state.selectedService = {}
      localStorage.removeItem("selectedItem")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateGet.pending, (state) => {
        state.isLoading = true
      })
      .addCase(stateGet.fulfilled, (state, action) => {
        state.isLoading = false
        state.state = action?.payload?.data || []
      })
      .addCase(stateGet.rejected, (state) => {
        state.isLoading = false
        state.state = []
      })
      .addCase(getServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.services = action?.payload?.data || []
      })
      .addCase(getServices.rejected, (state) => {
        state.isLoading = false
        state.services = []
      })
  },
})

export const { selectService, removeService } = authSlice.actions

export default authSlice.reducer
