import React from "react"
import { Button } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./registernow.module.scss"
import star from "../../../../images/home/herosection/star.svg"
import icon1 from "../../../../images/home/herosection/icon1.svg"

function RegisterNow() {
  return (
    <div className={styles.registerNowWrapper}>
      <div className={styles.ratingblock}>
        <div className={styles.icon1block}>
          <img src={icon1} alt="icon" className={styles.icon1} />
        </div>
        {/* <div className={styles.textblock}>
          <p className={styles.title}>More trusted, Verified Reviews</p>
          <div className={styles.starblock}>
            <img src={star} alt="star icon" />
            <img src={star} alt="star icon" />
            <img src={star} alt="star icon" />
            <img src={star} alt="star icon" />
            <img src={star} alt="star icon" />
            <p className={styles.subtitle}>37,810 ratings</p>
          </div>
        </div> */}
      </div>
      <div className={styles.registerNowContent}>
        <h2>Get Your Registered Agent Now</h2>
        <Button className={styles.btn}>
          Get Started
          <BsArrowRightShort className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}

export default RegisterNow
