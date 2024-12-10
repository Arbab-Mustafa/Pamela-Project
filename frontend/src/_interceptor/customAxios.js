import axios from "axios"

const url =
  process.env.REACT_APP_SERVER === "production"
    ? process.env.REACT_APP_LIVE_SERVER_PATH
    : process.env.REACT_APP_LOCAL_SERVER_PATH

const customAxios = axios.create({
  baseURL: `${url}`,
  timeout: 10000,
})

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  const token = JSON.parse(localStorage.getItem("user_token"))
  if (
    !request.url.includes("/auth/login ") ||
    !request.url.includes("/user/create") ||
    !request.url.includes("/services/state-all") ||
    !request.url.includes("/services/all") ||
    !request.url.includes("/user/forget-password") ||
    !request.url.includes("/user/reset-password") ||
    !request.url.includes("/user/verify-password-token")
  ) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
}

const responseHandler = (response) => response

const errorHandler = (error) => {
  if (
    error?.response?.data?.message ===
    "Something went wrong when verifying token"
  ) {
    window.localStorage.clear()
    window.location = "/login"
  }
  if (error.status === 401) {
    // window.location = "/login"
  }
  return Promise.reject(error)
}

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
)

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
)

// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios
