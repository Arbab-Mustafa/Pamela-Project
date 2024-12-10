import React from "react"
import { Button } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import Select from "react-select"
import { entityOptions } from "../../../../utils/helpers"
import styles from "./getAddress.module.scss"

function GetAddress() {
  return (
    <div className={styles.getAddressWrapper}>
      <div className={styles.getAddressTitle}>Get Your Virtual Address Now</div>
      <p className={styles.getAddressP}>
        Set Yourself Up for Success with Filthy Rich Idea
      </p>
      <div className={styles.getAddressCard}>
        <div className={styles.addressFormLabel}>State*</div>
        <div className={styles.addressSelectWrapper}>
          <Select
            options={entityOptions}
            placeholder="Select Entity Type"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
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

export default GetAddress
