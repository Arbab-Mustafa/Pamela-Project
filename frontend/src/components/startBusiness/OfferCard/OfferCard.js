import React from "react"
import { Button } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import styles from "./offerCard.module.scss"
import platinum from "../../../images/startBusiness/platinum.png"
import tick from "../../../images/services/amendment/need/tick.svg"
import star from "../../../images/startBusiness/star.svg"
import quote from "../../../images/startBusiness/quote.svg"
import { routes } from "../../../routes"
import { addItem, resetCart } from "../../../_features/cartSlice"

const OfferCard = ({ type, formik, card = [], statePrice, price }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const subscriptionOrders = async (value) => {
    dispatch(
      addItem({
        label: formik.values?.entityType?.label,
        values: formik.values?.entityType?.label,
        price: null,
        priceData: null,
        id: formik.values?.entityType?.id,
        parentName: "Entity Type",
        showName: true,
      })
    )
    dispatch(
      addItem({
        label: formik.values?.state?.label,
        values: formik.values?.state?.label,
        price: null,
        priceData: null,
        id: formik.values?.state?.id,
        parentName: "State Name",
        showName: true,
      })
    )

    dispatch(
      addItem({
        label: "Package Price",
        values: "Package Price",
        price: price,
        priceData: null,
        id: "232sdw2",
        parentName: "Package Price",
      })
    )
    dispatch(
      addItem({
        label: type,
        values: type,
        price: null,
        priceData: null,
        id: "#",
        parentName: "Package",
        showName: true,
      })
    )

    setTimeout(() => {
      value.map((e) =>
        dispatch(
          addItem({
            label: e.title,
            values: e.title,
            price: null,
            priceData: null,
            id: e.title,
            parentName: e.title,
          })
        )
      )
    }, 100)
  }
  return (
    <div
      className={styles.offerCardWrapper}
      style={{ background: type === "essential" ? "#fff" : "" }}
    >
      <div>
        <div className={styles.cardTopContent}>
          <h3>
            {type === "professional"
              ? "Professional"
              : type === "premium"
              ? "Premium"
              : type === "essential"
              ? "Essential"
              : ""}
          </h3>
          {/* <img src={platinum} alt="" /> */}
          <h6 className={styles.cardPrice}>
            ${Number(price) + Number(statePrice?.price)}
          </h6>
          <p className={styles.priceDesc}>One-time Payment</p>
          <Button
            className={styles.getOfferBtn}
            onClick={() => {
              dispatch(resetCart())
              formik.setValues({ ...formik.values, package: type })
              subscriptionOrders(card)
              navigate(routes.businessDetails, {
                state: {
                  data: {
                    ...formik.values,
                    package: type,
                    statePrice,
                    packagePrice: price,
                    packageName: type,
                  },
                },
              })
            }}
          >
            {type === "professional"
              ? "Professional"
              : type === "premium"
              ? "Premium"
              : type === "essential"
              ? "Essential"
              : ""}{" "}
            package
            <BsArrowRightShort className={styles.icon} />
          </Button>
          <div className={styles.packageFeeWrapper}>
            <div className={styles.packageFeeDetail}>
              <div className={styles.packageFeeText}>Package Fee</div>
              <div className={styles.packageFeeText}>${price}</div>
            </div>
            <div className={styles.packageFeeDetail}>
              <div className={styles.packageFeeText}>State Fee</div>
              <div className={styles.packageFeeText}>${statePrice?.price}</div>
            </div>
          </div>
        </div>
        <div className={styles.benefitWrapper}>
          <div className={styles.headingBox}>Includes:</div>
          {/* {type === "platinum" && (
            <div className={styles.benefitHighList}>
              {benefitHighList.map((value) => (
                <ul className={styles.ul} key={value.title}>
                  <img src={value?.icon} alt="star" />
                  <li className={styles.li}>{value?.text}</li>
                </ul>
              ))}
            </div>
          )} */}
          <div className={styles.benefitList}>
            {card.map((value) => (
              <ul className={styles.ul} key={value.title}>
                <img src={value?.icon} alt="tick" />
                <li className={styles.li}>{value?.title}</li>
              </ul>
            ))}
          </div>
          {/* <div className={styles.testimonial}>
            <img className={styles.quoteIcon} alt="" src={quote} />
            <div className={styles.testimonialQuote}>
              Easy-to-understand process. Quick, efficient and affordable for
              small businesses!
            </div>
            <div className={styles.testimonialAuthor}>Angelique C.</div>
          </div> */}
        </div>
      </div>
      <div>
        <Button
          className={styles.getOfferBtn}
          onClick={() => {
            dispatch(resetCart())
            formik.setValues({ ...formik.values, package: type })
            subscriptionOrders(card)
            navigate(routes.businessDetails, {
              state: {
                data: {
                  ...formik.values,
                  package: type,
                  statePrice,
                  packagePrice: price,
                  packageName: type,
                },
              },
            })
          }}
        >
          {" "}
          {type === "professional"
            ? "professional"
            : type === "premium"
            ? "Premium"
            : type === "essential"
            ? "Essential"
            : ""}{" "}
          <BsArrowRightShort className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}

export default OfferCard
