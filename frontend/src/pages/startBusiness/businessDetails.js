import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Navigate, useLocation } from "react-router"
import DetailStepperForm from "../../components/businessDetails/stepper"
import { routes } from "../../routes"
import { addPrice } from "../../_features/cartSlice"

const BusinessDetails = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addPrice())
  }, [])

  if (!location?.state?.data) {
    return <Navigate to={routes.formOrderNow} replace />
  }
  return <DetailStepperForm values={location?.state?.data} />
}

export default BusinessDetails
