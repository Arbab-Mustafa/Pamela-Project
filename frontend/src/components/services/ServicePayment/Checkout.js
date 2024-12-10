import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { toast } from "react-toastify"
import React from "react"
import { Link } from "react-router-dom"
import { Button, Spinner, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import axios from "../../../_interceptor/customAxios"
import CardSection from "./CardElement"
import "./stripeStyles.scss"
import { resetCart } from "../../../_features/cartSlice"
import { routes } from "../../../routes"

const Checkout = ({ address, formik, business }) => {
  const location = useLocation()
  const stripe = useStripe()
  const elements = useElements()
  const price = useSelector((state) => state?.cart?.price)
  const orderDetails = useSelector((state) => state?.cart?.items)
  const userData = useSelector((state) => state?.auth?.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  })

  async function stripeTokenHandler(token) {
    const orderDetailsArray = orderDetails?.map((e) => {
      return {
        name: e?.name,
        price: e?.price,
        showName: e?.showName,
        parentName: e?.parentName,
      }
    })
    const serviceDetails = {
      name: location.state.service.name,
      details: location.state.service.serviceDetails,
    }

    const { city, line1, state, country } = address
    const paymentData = {
      stipeToken: token?.id,
      cardName: address?.cardName,
      city,
      line1,
      postal_code: address.postal_code,
      state: state,
      email: userData?.email,
      phone: userData?.phone,
      name: userData.firstName + " " + userData.lastName,
      price,
      userId: userData?._id,
      serviceId: location.state.service.serviceId,
      orderDetails: orderDetailsArray,
      serviceDetails,
    }

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    try {
      const response = await axios.post("/payment/checkout-cart", {
        ...paymentData,
      })
      const responseGet = response?.data
      if (responseGet?.success) {
        dispatch(resetCart())
        navigate(`${routes.home}`)
        setLoading(false)
        toast.success("Payment Successfully paid")
        localStorage.removeItem("serviceDetails")
        localStorage.removeItem("formDetails")
      }
      setLoading(false)
      return response?.data
    } catch (err) {
      setLoading(false)
      return err
    }

    // Return and display the result of the charge.
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (!stripe || !elements) {
        return
      }
      const card = elements.getElement(CardNumberElement)

      try {
        // const result2 = await stripe.createToken("address", address)
        const result = await stripe.createToken(card, {
          address_line1: address?.line,
          address_city: address?.city,
          address_state: address?.state,

          address_zip: address?.postal_code?.toString(),
        })

        if (result?.error) {
          toast.error(result?.error)
          setLoading(false)
        } else {
          stripeTokenHandler(result?.token)
        }
      } catch (err) {
        setLoading(false)
        toast.error(err?.message)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection formik={formik} errors={errors} setErrors={setErrors} />
      <div className="checkbox-wrapper">
        <Form.Check
          inline
          checked={formik.values.agree}
          onChange={() =>
            formik.setValues({
              ...formik.values,
              agree: !formik.values.agree,
            })
          }
          type="checkbox"
        />
        <div className="checkbox-lablel">
          I agree to the{" "}
          <Link
            to="https://filthyrichidea.com/terms-conditions/"
            target="_blank"
          >
            Terms & Condition
          </Link>{" "}
          and{" "}
          <Link
            to="https://filthyrichidea.com/fri-policy-agreements/business-filing-cancellation-policy/"
            target="_blank"
          >
            Cancellation Policy.
          </Link>{" "}
        </div>
      </div>
      {formik.errors.agree && (
        <p className="error-message">{formik.errors.agree}</p>
      )}

      <div className="confirm-btn-wrapper">
        {business ? (
          <Button
            className="confirm-btn"
            onClick={() => navigate(routes.businessDetails, {})}
          >
            Back
          </Button>
        ) : (
          <Button
            className="confirm-btn"
            onClick={() =>
              navigate(
                `${routes.ServiceForm}${location.state.service.serviceId}`
              )
            }
          >
            Back
          </Button>
        )}

        <Button
          disabled={
            address.line === "" ||
            address.city === "" ||
            address.state === "" ||
            address.country === "" ||
            address.postal_code === "" ||
            orderDetails.length === 0 ||
            price === 0 ||
            !userData ||
            !stripe ||
            !errors.cardCvc.complete ||
            !errors.cardNumber.complete ||
            !errors.cardExp.complete ||
            !formik.values.agree ||
            loading
          }
          className="confirm-btn"
          onClick={handleSubmit}
        >
          {loading ? (
            <Spinner animation="border" style={{ color: "white" }} />
          ) : (
            "Confirm order"
          )}
        </Button>
      </div>
    </form>
  )
}

export default Checkout
