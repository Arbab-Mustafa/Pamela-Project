import React from "react"
import PhoneInput from "react-phone-input-2"
import styles from "./phoneInput.module.scss"

const PhoneSelect = ({ value, error, label, disabled, ...props }) => {
  return (
    <div className={styles.phoneSelectWrapper}>
      {label ? <div className={styles.inputFieldLabel}>{label}</div> : ""}
      <PhoneInput
        country="us"
        international
        autoComplete="off"
        className={styles.phoneSelect}
        value={value}
        disabled={disabled}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default PhoneSelect
