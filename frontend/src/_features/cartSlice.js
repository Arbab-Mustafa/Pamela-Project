import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  price: JSON.parse(localStorage?.getItem("price")) || 0,
  items: JSON.parse(localStorage?.getItem("orders")) || [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPrice: (state) => {
      const priceCalculation = state.items.reduce((acc, initial) => {
        return Number(acc) + Number(initial.price)
      }, 0)
      localStorage.setItem("price", JSON.stringify(priceCalculation))

      return {
        ...state,
        price: priceCalculation,
      }
    },
    addItem: (state, action) => {
      const itemExists = state.items.find(
        (e) => e.parentName === action.payload.parentName
      )
      const newItems = itemExists
        ? state.items.map((item) =>
            item.parentName === action.payload.parentName
              ? action.payload
              : item
          )
        : [...state.items, action.payload]
      localStorage.setItem("orders", JSON.stringify(newItems))
      state.items = newItems
    },

    removeFromCart: (state, action) => {
      const filterItem = state?.items?.filter(
        (item) => item.id !== action?.payload?.id
      )
      localStorage.setItem("orders", JSON.stringify(filterItem))
      return { ...state, items: filterItem }
    },
    resetCart: () => {
      localStorage.removeItem("orders")
      localStorage.removeItem("price")
      localStorage.removeItem("member")
      localStorage.removeItem("formData")
      localStorage.removeItem("shareholder")
      return { price: 0, items: [] }
    },
  },
})

export const { addPrice, clearPrice, removeFromCart, resetCart, addItem } =
  cartSlice.actions
export default cartSlice.reducer
