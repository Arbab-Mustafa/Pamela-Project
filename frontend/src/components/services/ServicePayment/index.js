import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import "react-phone-input-2/lib/style.css"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Select from "react-select"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useLocation } from "react-router"
import { useSelector } from "react-redux"
import CountrySelect from "react-bootstrap-country-select"
import styles from "./servicePayment.module.scss"
import CheckCircle from "../../../images/services/articlesofamendment/check-circle.png"
import Taxes from "../../../images/services/articlesofamendment/business-taxes.png"
import Lock from "../../../images/services/articlesofamendment/lock.png"
import cart from "../../../images/payment/cart.png"
import coma from "../../../images/payment/coma.svg"
import Checkout from "./Checkout"
import PriceSection from "../../common/PriceSection"

function ServicePayment() {
  const location = useLocation()
  const statesRed = useSelector((state) => state?.common?.state)
  const totalPrice = useSelector((state) => state?.cart?.price)
  const items = useSelector((state) => state?.cart?.items)
  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
    }
  })
  const formik = useFormik({
    initialValues: {
      city: "",
      line1: "",
      postal_code: "",
      state: "",
      cardName: "",
      agree: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("Required"),
      line1: Yup.string().required("Required"),
      cardName: Yup.string().required("Required"),
      postal_code: Yup.string()
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
        .required("Required")
        .max(5, "Max five characters"),
      state: Yup.string().required("Required"),
      agree: Yup.boolean()
        .required("The terms and conditions must be accepted.")
        .oneOf([true], "The terms and conditions must be accepted."),
    }),
  })
  console.log(formik.errors)
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  return (
    <div className={styles.ServicePaymentWrapper}>
      <Container>
        <Row>
          <Col lg={8}>
            <div className={styles.formsWrapper}>
              <h2 className={styles.title}>Billing Information</h2>
              <div className={styles.formblock}>
                <form
                  className={styles.form}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className={styles.inpWrapper}>
                    <p className={styles.subtitle}>Address*</p>
                    <input
                      placeholder="Address*"
                      name="line1"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.line1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.line1 && formik.touched.line1 && (
                      <p className="error-message">{formik.errors.line1}</p>
                    )}
                  </div>
                  <div className={styles.inpWrapper}>
                    <p className={styles.subtitle}>City*</p>
                    <input
                      placeholder="City *"
                      name="city"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.city && formik.touched.city && (
                      <p className="error-message">{formik.errors.city}</p>
                    )}
                  </div>
                  <div className={styles.selectStyles}>
                    <p className={styles.subtitle}>State*</p>
                    <Select
                      options={stateOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.state.label}
                      onChange={(e) => {
                        formik.setValues({ ...formik.values, state: e.value })
                      }}
                      onBlur={formik.handleBlur}
                      name="state"
                      id="state"
                    />
                    {formik.errors.state && (
                      <p className="error-message">{formik.errors.state}</p>
                    )}
                  </div>

                  <div className={styles.inpWrapper}>
                    <p className={styles.subtitle}>Zip Code*</p>
                    <input
                      placeholder="Zip Code*"
                      name="postal_code"
                      autoComplete="off"
                      type="number"
                      className={styles.input}
                      value={formik.values.postal_code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.postal_code &&
                      formik.touched.postal_code && (
                        <p className="error-message">
                          {formik.errors.postal_code}
                        </p>
                      )}
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.formsWrapper}>
              <h2 className={styles.title}>Payment Information</h2>
              <div className={styles.contactinformation}>
                <Elements stripe={stripePromise}>
                  <Checkout
                    address={formik.values}
                    formik={formik}
                    business={location?.state?.business}
                  />
                </Elements>
              </div>
              <div className="d-flex flex-wrap justify-content-between mb-5 p-3">
                <div className={styles.box1}>
                  <div>
                    <img src={coma} alt="coma" />
                    <div className={styles.boxBody}>
                      Excellent service. Product delivered was nothing short of
                      perfect and I felt like I was in control of the entire
                      process. The end result was an LLC that was properly set
                      up and ready to go. I'm extremely happy with my experience
                      and would highly recommend Filthy Rich Idea to anyone
                      looking to form a business.
                    </div>
                  </div>
                  <div className={styles.box2}>
                    <div>
                      <h5>Thomas M.</h5>
                      <p>Shopperapproved.com</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src={cart} alt="cart" />
                      <h4>Verified Purchase</h4>
                    </div>
                  </div>
                </div>
                <div className={styles.box1}>
                  <div>
                    <img src={coma} alt="coma" />
                    <div className={styles.boxBody}>
                      Highly recommended. Efficient and high-quality
                      deliverables. Will definitely hire again. Great
                      communication.
                    </div>
                  </div>
                  <div className={styles.box2}>
                    <div>
                      <h5>Kathy T.</h5>
                      <p>Shopperapproved.com</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src={cart} alt="cart" />
                      <h4>Verified Purchase</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            {/* <div className={styles.orderSummary}>
              <div className={styles.orderTitle}>Order Summary</div>
              <div className={styles.orderPrice}>{totalPrice}$</div>
              <hr />
              {items?.map(
                (e, i) =>
                  e.price !== 0 && (
                    <React.Fragment key={i}>
                      <div className={styles.orderStat}>
                        <div className={styles.orderStatTitle}>
                          {e?.parentName} Fee
                        </div>
                        <div className={styles.orderStatValue}>{e?.price}$</div>
                      </div>
                      <hr />
                    </React.Fragment>
                  )
              )}
              <div className={styles.orderStat}>
                <div className={styles.orderStatTitle}>Total</div>
                <div className={styles.orderStatTotal}>{totalPrice}$</div>
              </div>
              <hr />
              <div className={styles.orderFaqsWrapper}>
                <div className={styles.orderFaqsImg}>
                  <img src={CheckCircle} alt="" />
                </div>
                <div className={styles.orderFaqs}>
                  <h6>Maintain business compliance</h6>
                  <p>
                    Trusted by over 800,000 business owners to maintain their
                    state's business compliance obligations.
                  </p>
                </div>
              </div>
              <div className={styles.orderFaqsWrapper}>
                <div className={styles.orderFaqsImg}>
                  <img src={Taxes} alt="" />
                </div>
                <div className={styles.orderFaqs}>
                  <h6>Tax savings benefit</h6>
                  <p>This is a fully deductible business expense</p>
                </div>
              </div>
              <div className={styles.orderFaqsWrapper}>
                <div className={styles.orderFaqsImg}>
                  <img src={Lock} alt="" />
                </div>
                <div className={styles.orderFaqs}>
                  <h6>Safe & Secure</h6>
                  <p>
                    Your information and data is safe and secure. Our servers
                    are located in secure data centers and our website uses SSL
                    modern encryption for all sensitive data. Our servers are
                    also backed up hourly ensuring your data is never lost.
                  </p>
                </div>
              </div>
            </div> */}
            <PriceSection business={location?.state?.business} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ServicePayment
