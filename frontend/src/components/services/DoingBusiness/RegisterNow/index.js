import React from "react"
import { Button } from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import styles from "./registernow.module.scss"

function RegisterNow() {
  return (
    <div className={styles.registerNowWrapper}>
      <div className={styles.registerNowContent}>
        <h2>Need a DBA ASAP?</h2>
        <p>
          We’ll save you time by doing the paperwork for you. Just place an
          order and presto — you’ll have an assumed business name in no time.
        </p>
        <Button className={styles.btn}>
          File DBA Today
          <BsArrowRightShort className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}

export default RegisterNow
