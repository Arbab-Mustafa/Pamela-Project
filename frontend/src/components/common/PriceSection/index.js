import React from "react"
import { useSelector } from "react-redux"
import styles from "./ServiceForm.module.scss"
import CheckCircle from "../../../images/services/articlesofamendment/check-circle.png"
import Taxes from "../../../images/services/articlesofamendment/business-taxes.png"
import Lock from "../../../images/services/articlesofamendment/lock.png"

const PriceSection = ({ business }) => {
  const items = useSelector((state) => state?.cart?.items)
  const totalPrice = useSelector((state) => state?.cart?.price)

  return (
    <div className={styles.orderSummary}>
      <div className={styles.orderTitle}>Order Summary</div>
      <div className={styles.orderPrice}>${totalPrice}</div>
      <hr />
      {business
        ? items?.map((e, i) => (
            <React.Fragment key={`${e.name}${i}`}>
              <div className={styles.orderStat}>
                <div className={styles.orderStatTitle}>
                  {e?.parentName} {e?.price ? <>Fee</> : ""}{" "}
                </div>
                <div className={styles.orderStatValue}>
                  {e?.showName ? (
                    e?.name
                  ) : e?.price ? (
                    `$${e?.price}`
                  ) : (
                    <>&#x2713;</>
                  )}
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))
        : items?.map(
            (e, i) =>
              e.price !== 0 && (
                <React.Fragment key={`${e.name}${i}`}>
                  <div className={styles.orderStat}>
                    <div className={styles.orderStatTitle}>
                      {e?.parentName} Fee
                    </div>
                    <div className={styles.orderStatValue}>${e?.price}</div>
                  </div>
                  <hr />
                </React.Fragment>
              )
          )}

      <div className={styles.orderStat}>
        <div className={styles.orderStatTitle}>Total</div>
        <div className={styles.orderStatTotal}>${totalPrice}</div>
      </div>
      <hr />
      <div className={styles.orderFaqsWrapper}>
        <div className={styles.orderFaqsImg}>
          <img src={CheckCircle} alt="" />
        </div>
        <div className={styles.orderFaqs}>
          <h6>Remain Compliant</h6>
          <p>
            Remain competitive, protect your business reputation, and avoid
            expensive penalties for non-compliance.
          </p>
        </div>
      </div>
      <div className={styles.orderFaqsWrapper}>
        <div className={styles.orderFaqsImg}>
          <img src={Taxes} alt="" />
        </div>
        <div className={styles.orderFaqs}>
          <h6>Tax Savings Benefit</h6>
          <p>This business expense is tax deductible.</p>
        </div>
      </div>
      <div className={styles.orderFaqsWrapper}>
        <div className={styles.orderFaqsImg}>
          <img src={Lock} alt="" />
        </div>
        <div className={styles.orderFaqs}>
          <h6>Safe & Secure</h6>
          <p>
            Your information is securely stored. Our servers are kept in secure
            data centers and SSL encryption is used for all confidential
            material on our website. Backups are created to guarantee that your
            information is always available.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PriceSection
