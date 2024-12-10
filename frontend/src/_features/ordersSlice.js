import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axios from "../_interceptor/customAxios"

const initialState = {
  orders: null,
  singleOrder: null,
  usersOrder: null,
  error: null,
  isLoading: false,
  message: null,
}

export const getOrders = createAsyncThunk(
  "/payment/get-all-orders",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("/payment/get-all-orders", null, {
        params: { page: body?.page || 1, search: body?.search },
      })
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)

export const getOrdersUser = createAsyncThunk(
  "/payment/get-all-orders-user-admin",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        "/payment/get-all-orders",
        { userId: body?.userId },
        {
          params: { page: body?.page || 1 },
        }
      )
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)

export const getOrdersUserNotAdmin = createAsyncThunk(
  "/payment/get-all-orders-user",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        "/payment/get-all-orders-users",
        { userId: body?.userId },
        {
          params: { page: body?.page || 1 },
        }
      )
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)
export const getSingleOrder = createAsyncThunk(
  "user/id",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(`/payment/order/${body}`)

      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message || err?.response?.data?.error })
    }
  }
)
export const updateSingle = createAsyncThunk(
  "/payment/order-update-details/",
  async (body, thunkApi) => {
    try {
      const response = await axios.post(
        `/payment/order-update-details/${body?.id}`,
        {
          serviceDetails: body.serviceDetails,
        }
      )
      thunkApi.dispatch(getSingleOrder(body?.id))
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message || err?.response?.data?.error })
    }
  }
)

const orderSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    singleOrderReset: (state) => {
      state.singleOrder = null
    },
    orderReset: (state) => {
      state.orders = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action?.payload?.data
        state.total = action?.payload?.length
        state.page = action?.payload?.page
        state.nextPage = action.payload.nextPage
        state.prevPage = action.payload.prevPage
        state.message = action?.payload?.data?.message
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })

      .addCase(getOrdersUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.usersOrder = action?.payload?.data
        state.total = action?.payload?.length
        state.page = action?.payload?.page
        state.nextPage = action.payload.nextPage
        state.prevPage = action.payload.prevPage
        state.message = action?.payload?.data?.message
      })
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleOrder = action?.payload?.data
        state.message = action?.payload?.data?.message
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
      .addCase(getOrdersUserNotAdmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrdersUserNotAdmin.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action?.payload?.data
        state.total = action?.payload?.length
        state.page = action?.payload?.page
        state.nextPage = action.payload.nextPage
        state.prevPage = action.payload.prevPage
        state.message = action?.payload?.data?.message
      })
      .addCase(getOrdersUserNotAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
      .addCase(updateSingle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSingle.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleOrder = action?.payload?.data
        state.message = action?.payload?.data?.message
      })
      .addCase(updateSingle.rejected, (state, action) => {
        state.isLoading = false
        state.error = action?.payload?.message
        toast.success(state.error)
      })
  },
})

// Action creators are generated for each case reducer function
export const { singleOrderReset, orderReset } = orderSlice.actions

export default orderSlice.reducer
