import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import store from "./_store/store"
import App from "./App"
import "./styles/global.scss"
import "react-toastify/dist/ReactToastify.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />

    <App />
  </Provider>
)
