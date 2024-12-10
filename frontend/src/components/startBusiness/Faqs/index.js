import React, { useState } from "react"
import styles from "./faqs.module.scss"
import { ReactComponent as AccordionIcon } from "../../../images/services/registeragent/accordionIcon.svg"

function Faqs(props) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.faqAccordionWrapper}>
      <button
        type="button"
        className={styles.faqAccordionHeader}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.accordionTitle}>{props?.heading}</div>
        <AccordionIcon
          className={
            open ? styles.accordionHeaderIconOpen : styles.accordionHeaderIcon
          }
        />
      </button>
      {open && <div className={styles.faqAccordionBody}>{props?.children}</div>}
    </div>
  )
}

export default Faqs
