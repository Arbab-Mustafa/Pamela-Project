import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import { addItem, addPrice, resetCart } from "../../_features/cartSlice"
import HeroSection from "../../components/startBusiness/Hero"
import FaqSection from "../../components/startBusiness/FaqSection"
import OfferSection from "../../components/startBusiness/OfferSection"
import PopUp from "../../components/businessDetails/common/PopUp"
import resumeBusiness from "../../images/startBusiness/resumeBusiness.png"
import { routes } from "../../routes"

const StartBusiness = () => {
  const [statePrice, setStatePrice] = useState({})
  const [showPopUp, setShowPopUp] = useState(false)
  const navigate = useNavigate()
  const localData = JSON.parse(localStorage?.getItem("orders"))
  const localData2 = JSON.parse(localStorage?.getItem("formData"))
  const userToken = useSelector((state) => state?.auth?.userToken)

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      entityType:
        {
          label: "Select Entity",
          value: "",
        } || "",
      state:
        {
          label: "Select State",
          value: "",
        } || "",
      package: "",
    },
    validationSchema: Yup.object({
      entityType: Yup.object().shape({
        value: Yup.string().required("field is required"),
      }),
      state: Yup.object().shape({
        value: Yup.string().required("field is required"),
      }),
      package: Yup.string().required("field is required"),
    }),
  })
  React.useEffect(() => {
    if (localData && localData2) setShowPopUp(true)
  }, [])

  React.useEffect(() => {
    if (!userToken) {
      navigate(`${routes.login}`, {
        state: {
          businessDetails: true,
        },
      })
      toast.error("Please login first")
    }
  }, [userToken])

  useEffect(() => {
    localStorage.removeItem("orders")
    localStorage.removeItem("price")
  }, [])
  React.useEffect(() => {
    if (formik.values.entityType?.value && formik.values.state?.value) {
      delete formik.errors["notValid"]

      const feesAdd = formik.values.entityType?.priceData?.find(
        (e) => e.serviceName.toLowerCase() === "BusinessForm".toLowerCase()
      )
      if (feesAdd) {
        const data = feesAdd?.fee?.find(
          (e) =>
            e.stateName.toLowerCase() ===
            formik.values.state?.value?.toLowerCase()
        )

        if (data?.price === 0) {
          formik.setErrors({
            ...formik.errors,
            notValid: "Not a Valid Region please try another",
          })
          toast.warn("Not a Valid State please try another")
        }
        if (data) {
          setStatePrice(data)
          dispatch(
            addItem({
              name: `${data?.stateName} fee`,
              label: `${data?.stateName} fee`,
              value: `${data?.stateName} fee`,
              price: data?.price,
              id: `${data?.price}${data?.stateName}`,
              parentName: `State`,
            })
          )
          dispatch(addPrice())
        }
      }
    }
  }, [dispatch, formik, formik.values.entityType, formik.values.state])

  return (
    <div>
      <HeroSection formik={formik} />
      {formik.values.entityType.value !== "" &&
        formik.values.state?.value !== "" && (
          <>
            <OfferSection formik={formik} statePrice={statePrice} />
            <FaqSection />
          </>
        )}
      <PopUp
        show={localData && showPopUp}
        centered="centered"
        handleClose={() => {
          dispatch(resetCart())
          setShowPopUp(!showPopUp)
        }}
      >
        <div className="popupWrapper">
          <div className="popupHeader">
            <img src={resumeBusiness} alt="resume" />
          </div>
          <div className="popupBody">
            <h6>It appears you may already have an order in progress.</h6>
          </div>
          <div className="popupFooter">
            <Button
              className="popupBtnPrimary"
              onClick={() => {
                navigate(routes.businessDetails, {
                  state: {
                    data: {
                      ...localData2,
                      entityType: {
                        value: localData2?.entityState,
                        label: localData2?.entityState,
                      },
                      package: localData2?.package,
                      statePrice: localData2?.statePrice,
                      packagePrice: localData2?.packagePrice,
                      packageName: localData2?.packageName,
                    },
                  },
                })
              }}
            >
              Resume Order
            </Button>
            <Button
              className="popupBtnSecondary"
              onClick={() => {
                dispatch(resetCart())
                setShowPopUp(!showPopUp)
              }}
            >
              Start Over
            </Button>
          </div>
        </div>
      </PopUp>
    </div>
  )
}

export default StartBusiness
