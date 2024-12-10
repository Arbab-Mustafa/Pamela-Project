import React from "react"
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"

import "./stripeStyles.scss"
import InputField from "../../businessDetails/common/InputField"

function CardSection({ formik, errors, setErrors }) {
  return (
    <div className="stripe-wrapper">
      <div className="strip-number-inp-wrapper">
        <InputField
          label="Card Holder Name*"
          name="cardName"
          type="text"
          value={formik.cardName}
          onChange={formik.handleChange}
          error={formik.errors.cardName}
        />
      </div>
      <div className="strip-number-inp-wrapper">
        <p className="subtitle">Card Number*</p>
        <CardNumberElement
          className="strip-cardNumber-element"
          onChange={(e) => setErrors({ ...errors, cardNumber: e })}
          onFocus={(e) => setErrors({ ...errors, cardNumber: e })}
        />
        {errors?.cardNumber?.empty ? (
          <p className="error-message">Required</p>
        ) : errors?.cardNumber?.error ? (
          <p className="error-message">
            {errors?.cardNumber?.error?.message ||
              errors?.cardNumber?.error?.code}
          </p>
        ) : null}
      </div>
      <div className="strip-inp-wrapper">
        <p className="subtitle">Card Expiry Date*</p>
        <CardExpiryElement
          className="strip-element"
          onChange={(e) => setErrors({ ...errors, cardExp: e })}
          onFocus={(e) => setErrors({ ...errors, cardExp: e })}
        />
        {errors?.cardExp?.empty ? (
          <p className="error-message">Required</p>
        ) : errors?.cardExp?.error ? (
          <p className="error-message">
            {errors?.cardExp?.error?.message || errors?.cardExp?.error?.code}
          </p>
        ) : null}
      </div>
      <div className="strip-inp-wrapper">
        <p className="subtitle">Card CVC*</p>
        <CardCvcElement
          className="strip-element"
          onChange={(e) => setErrors({ ...errors, cardCvc: e })}
          onFocus={(e) => setErrors({ ...errors, cardCvc: e })}
        />
        {errors?.cardCvc?.empty ? (
          <p className="error-message">Required</p>
        ) : errors?.cardCvc?.error ? (
          <p className="error-message">
            {errors?.cardCvc?.error?.message || errors?.cardCvc?.error?.code}
          </p>
        ) : null}
      </div>
    </div>
  )
}
export default CardSection
