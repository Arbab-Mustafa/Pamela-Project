import React from "react"
import { FiCheck } from "react-icons/fi"
import styles from "./orderSummary.module.scss"
import CheckCircle from "../../../../images/services/articlesofamendment/check-circle.png"
import Taxes from "../../../../images/services/articlesofamendment/business-taxes.png"
import Lock from "../../../../images/services/articlesofamendment/lock.png"

const OrderSummary = () => {
  const items = [
    {
      parentName: "Entity Type",
      price: "LLC",
    },
    {
      parentName: "Platinum Package",
      price: "299$",
    },
    {
      parentName: "AL State Filing Fee",
      price: "299$",
    },
    {
      parentName: "Domain & Email Service",
      price: "Free",
    },
  ]
  const checkMark = <FiCheck />
  const filing = [
    {
      title: "Expedited Filing",
      icon: checkMark,
    },
    {
      title: "Banking Resolution",
      icon: checkMark,
    },
    {
      title: "Operation Agreement",
      icon: checkMark,
    },
    {
      title: "Registered Agent (1st Year)",
      icon: "0$",
    },
    {
      title: "EIN / Tax ID #",
      icon: checkMark,
    },
    {
      title: "Electronic Delivery",
      icon: checkMark,
    },
    {
      title: "Business Contract Templates",
      icon: checkMark,
    },
  ]
  return (
    <div className={styles.orderSummary}>
      <div className={styles.orderTitle}>Order Summary</div>
      <div className={styles.orderPrice}>$552</div>
      <hr />
      {items?.map((e) => (
        <React.Fragment key={e?.name}>
          <div className={styles.orderStat}>
            <div className={styles.orderStatTitle}>{e?.parentName}</div>
            <div className={styles.orderStatValue}>{e?.price}</div>
          </div>
        </React.Fragment>
      ))}
      {filing?.map((e) => (
        <React.Fragment key={e?.name}>
          <div className={styles.orderStat}>
            <div className={styles.orderStatTitle}>{e?.title}</div>
            <div className={styles.orderStatValue}>{e?.icon}</div>
          </div>
        </React.Fragment>
      ))}
      <hr />
      <div className={styles.orderStat}>
        <div className={styles.orderStatTotalTitle}>Charge Total</div>
        <div className={styles.orderStatTotalValue}>$433</div>
      </div>
      <hr />
      <div className={styles.orderFaqsWrapper}>
        <div className={styles.orderFaqsImg}>
          <img src={CheckCircle} alt="" />
        </div>
        <div className={styles.orderFaqs}>
          <h6>Start your business with confidence</h6>
          <p>Trusted by over 800,000 business owners since 2004.</p>
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
            Your information and data is safe and secure. Our servers are
            located in secure data centers and our website uses SSL modern
            encryption for all sensitive data. Our servers are also backed up
            hourly ensuring your data is never lost.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
