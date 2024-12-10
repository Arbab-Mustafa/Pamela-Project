import { toast } from "react-toastify"
import { userLogOut } from "../_features/authSlice"
import { getUsers } from "../_features/usersSlice"
import customAxios from "../_interceptor/customAxios"
import store from "../_store/store"

export const checkToken = async () => {
  try {
    const request = await customAxios.post("/user/token-check")
    const response = await request.data
    if (!response.success) {
      return store.dispatch(userLogOut())
    }
  } catch (e) {
    return store.dispatch(userLogOut())
  }
}
export const makeAdminFunction = async (id) => {
  try {
    const request = await customAxios.post("/user/add-admin", {
      id,
    })
    const response = await request.data
    if (response.success) {
      toast.success(response?.message)
      return store.dispatch(getUsers(1))
    }
  } catch (e) {
    return e
  }
}
export const removeAdminFunction = async (id) => {
  try {
    const request = await customAxios.post("/user/remove-admin", {
      id,
    })
    const response = await request.data
    if (response.success) {
      toast.success(response?.message)
      return store.dispatch(getUsers(1))
    }
  } catch (e) {
    return e
  }
}

export const AdminFeedBack = async (values, action, id, formData) => {
  try {
    const req = await customAxios.post(`payment/order-update/${id}`, formData)
    if (req.status === 200) {
      toast.success("Document submitted.")
      action.setValues({ ...values, edit: false, deleteFile: false })
    }
  } catch (e) {
    toast.success("Error")
  }
}

export const UserFeedBack = async (values, action, id, formData) => {
  try {
    const req = await customAxios.post(
      `payment/order-update-user-data/${id}`,
      formData
    )
    if (req.status === 200) {
      toast.success("Document submitted.")
      action.setValues({ ...values, edit: false, deleteFile: false })
    }
  } catch (e) {
    toast.success("Error")
  }
}
