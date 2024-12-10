import React from "react"
import styles from "./style.module.scss"

const CompanyPreview = ({ name, designator, businessType }) => {
  return (
    <>
      <div className={styles.companyPreviewLabel}>
        {!businessType &&
          ` Please confirm that this is exactly how your company name is filed
          with the state.`}
      </div>

      <div className={styles.companyPreviewWrapper}>
        {name} {designator}
      </div>
    </>
  )
}

export default CompanyPreview
