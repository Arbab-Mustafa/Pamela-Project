import React from "react"
import { Button } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import Select from "react-select"
import { entityOptions } from "../../../../utils/helpers"
import styles from "./getAddress.module.scss"

function ChangeAgent() {
  return (
    <div className={styles.getAddressWrapper}>
      <div className={styles.getAddressTitle}>
        Change Your Registered Agent Now
      </div>
      <div className={styles.getAddressCard}>
        <div className={styles.addressFormLabel}>Entity Type*</div>
        <div className={styles.addressSelectWrapper}>
          <Select
            options={entityOptions}
            placeholder="Select Entity Type"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div className={styles.addressFormLabel}>Entity State*</div>
        <div className={styles.addressSelectWrapper}>
          <Select
            options={entityOptions}
            placeholder="Select Entity Type"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <h4 className={styles.tagline}>$80</h4>
        <p className={styles.tagline2}>Plus State Filing Fees</p>
        <div className={styles.addressBtnWrapper}>
          <Button className={styles.btn}>
            Get Started
            <BsArrowRightShort className={styles.icon} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangeAgent
