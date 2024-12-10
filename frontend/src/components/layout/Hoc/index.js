import React, { useEffect } from "react"
import { useLocation } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import Header from "../Header"
import Footer from "../Footer"
import BottomFooter from "../BottomFooter"
import { selectService } from "../../../_features/commonSlice"
import { resetCart } from "../../../_features/cartSlice"

function Hoc(props) {
  const location = useLocation()
  const service = useSelector((state) => state?.common?.services)
  const dispatch = useDispatch()

  useEffect(() => {
    if (service?.length !== 0) {
      const filterSlug = service?.filter((e) => e.slug === location.pathname)
      if (!filterSlug) {
        return
      }
      if (filterSlug?.length !== 0) {
        dispatch(resetCart())
        dispatch(selectService(filterSlug[0]))
      }
    }
  }, [location.pathname, service?.length])
  return (
    <>
      <Header />
      {props?.children}
      <Footer />
      <BottomFooter />
    </>
  )
}

export default Hoc
