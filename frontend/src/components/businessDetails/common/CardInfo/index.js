import React from "react"
import styles from "./cardInfo.module.scss"
import icon from "../../../../images/services/articlesofamendment/icon.svg"

const CardInfo = ({ className, title, children }) => {
  return (
    <div className={`${className} ${styles.cardInfoWrapper}`}>
      <div className={styles.card}>
        <img src={icon} alt="icons" />
        <div className={styles.textblock}>
          {title && <h2>{title}</h2>}
          <p className={styles.subtitle}>{children}</p>
        </div>
      </div>
    </div>
  )
}

export default CardInfo
