import React from "react"
import styles from "./textAreaField.module.scss"

const TextAreaField = ({
  name,
  placeholder,
  label,
  value,
  onChange,
  error,
  disabled,
  ...props
}) => {
  return (
    <div className={styles.fieldWrapper}>
      {label ? <div className={styles.fieldLabel}>{label}</div> : ""}
      <textarea
        placeholder={placeholder || ""}
        name={name || ""}
        className={`${styles.textarea} ${disabled && styles.textareaDisabled}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span className="error-message">{error}</span>
    </div>
  )
}

export default TextAreaField
