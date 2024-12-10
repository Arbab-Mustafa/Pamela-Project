import React from "react"
import { Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import DetailCard from "../common/DetailCard"
import InputField from "../common/InputField"
import CustomSelect from "../common/CustomSelect"
import CardInfo from "../common/CardInfo"
import styles from "./stepTen.module.scss"
import quote from "../../../images/startBusiness/quote.svg"

const StepTen = () => {
  const states = useSelector((state) => state?.common?.state)
  const stateOptions = states?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Billing Information">
        <div className={styles.testimonialsWrapper}>
          <div className={styles.testimonial}>
            <img className={styles.quoteIcon} alt="" src={quote} />
            <div className={styles.testimonialQuote}>
              I must admit that I was nervous to begin this process, however, I
              was able to easy maneuver my way throughout the website.
              Filthy Rich Idea.com made my first time entrepreneurial experience as
              peaceful one. I am beyond grateful and excited to start my
              journey. Thank you!
            </div>
            <div className={styles.testimonialAuthor}>Angelique C.</div>
          </div>
          <div className={styles.testimonial}>
            <img className={styles.quoteIcon} alt="" src={quote} />
            <div className={styles.testimonialQuote}>
              Awesome service. Very quick, easy and straight to the point. They
              take all the hassle and worry out of renewal so you can
              concentrate on running your business.
            </div>
            <div className={styles.testimonialAuthor}>Angelique C.</div>
          </div>
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <h6 className={styles.detailCardTitle}>Credit Card Information</h6>
          </div>
          <div className="w-100">
            <InputField
              label="Cardholder Full Name *"
              name="cardHolderName"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Card Number *"
              name="cardNumber"
              type="text"
              placeholder="123456789"
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Expiry Date *"
              name="expiryDate"
              type="text"
              placeholder="MM/YY"
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="CVV/CVC *"
              name="cvv"
              type="text"
              placeholder="3 digits"
            />
          </div>
          <div className="mt-5 w-100">
            <h6 className={styles.detailCardTitle}>Billing Address</h6>
          </div>
          <div className={styles.inpField}>
            <CustomSelect
              label="Country *"
              name="country"
              placeholder="Select Country"
              options={stateOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Street Address *"
              name="streetAddress"
              type="text"
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="Address (Cont)" name="addressCont" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="City *" name="city" type="text" />
          </div>
          <div className={styles.inpField}>
            <CustomSelect
              label="State *"
              name="state"
              placeholder="Select State"
              options={stateOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="Zip Code *" name="zipCode" type="text" />
          </div>
        </div>
        <CardInfo>
          In order to avoid delays and/or the cancellation of your order ensure
          that the billing address provided reconciles with the payment card
          used.
        </CardInfo>
        <div className="mt-3">
          <Form.Check
            inline
            label="I Agree To The Legal Statement And Cancellation Policy."
            name="Legal"
            type="checkbox"
          />
        </div>
      </DetailCard>
    </div>
  )
}

export default StepTen
