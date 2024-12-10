import React, { useEffect } from "react"
import { Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import styles from "./offerCard.module.scss"
import tick from "../../../../images/services/amendment/need/tick.svg"
import professional from "../../../../images/startBusiness/professional-location.png"
import own from "../../../../images/startBusiness/own-location.png"
import {
  addItem,
  addPrice,
  removeFromCart,
} from "../../../../_features/cartSlice"

const OfferCard = ({ type, formik, offer, address }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (formik.values.paidAddress === false) {
      dispatch(
        removeFromCart({
          label: "Business Address",
          value: "Business Address",
          price: 34,
          id: 123456789,
          parentName: "Business Address",
        })
      )
    }
    if (formik.values.paidAddress === true) {
      dispatch(
        addItem({
          label: "Business Address",
          value: "Business Address",
          price: 34,
          id: 123456789,
          parentName: "Business Address",
        })
      )
    }
    dispatch(addPrice())
  }, [formik.values.paidAddress])
  const card = [
    {
      icon: tick,
      title: "Keep your data secure with a professional mailing address",
    },
    {
      icon: tick,
      title: "Unlimited incoming mail scanning",
    },
    {
      icon: tick,
      title: "A  physical location (not a PO box)",
    },
    {
      icon: tick,
      title: "24/7 notifications sent to you at any time",
    },
  ]

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <>
      <div className={`offer-card-wrapper ${styles.offerCardWrapper}`}>
        <div>
          <div className={styles.cardTopContent}>
            <div className={styles.cardTopTitle}>
              <h3>
                {type === "professional"
                  ? "Professional Business Address & Mail Service  "
                  : type === "own"
                  ? "Use My Own Address"
                  : ""}
              </h3>
            </div>
            <img src={type === "professional" ? professional : own} alt="" />
            <p>
              {type === "professional" ? (
                ""
              ) : type === "own" ? (
                <>
                  I will provide my own {address?.state} business address and
                  will personally keep up with the incoming mail.
                  <br />
                  <br />
                  {address?.state} requires a physical street address
                  <br />
                  (P.O Boxes are not accepted).
                  <br />
                  <br />
                  Any residential address provided to the state will be listed
                  publicly.
                </>
              ) : (
                ""
              )}
            </p>
            {type === "professional" && (
              <>
                <p className={styles.priceDesc}>
                  Your principal company address including suite # will be
                  assigned after the order completion.
                </p>
                {/* <h6 className={styles.cardPrice}>{address?.address}</h6>
                <p className={styles.priceDesc}>
                  (Suite # will be assigned after the order completion)
                </p> */}
              </>
            )}
          </div>
          <div className={styles.benefitWrapper}>
            <div className={styles.benefitList}>
              {type === "professional" &&
                card.map((value) => (
                  <ul className={styles.ul} key={value.title}>
                    <img src={value?.icon} alt="tick" />
                    <li className={styles.li}>{value?.title}</li>
                  </ul>
                ))}
            </div>
            {type === "professional" && (
              <div className={styles.cardPriceWrapper}>
                <h6 className={styles.cardPrice}>
                  $34/ <span className={styles.priceDesc}>month</span>
                </h6>
              </div>
            )}
          </div>
        </div>
        <div className={styles.formCheckWrapper}>
          <Form.Check
            inline
            type="radio"
            name="paidAddress"
            checked={formik.values.paidAddress === offer}
            onChange={() => {
              formik.setValues({ ...formik.values, paidAddress: offer })
            }}
          />
        </div>
      </div>
    </>
  )
}

export default OfferCard
