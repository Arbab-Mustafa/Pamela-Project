/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react"
import { Button, ButtonToolbar, Tooltip, OverlayTrigger } from "react-bootstrap"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import styles from "./inputField.module.scss"

const InputField = ({
  name,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  type,
  disabled,
  error,
  tootltipText,
  sound = false,
  ...props
}) => {
  return (
    <div className={styles.inputFieldWrapper}>
      <div className="d-flex align-items-center justify-content-between">
        {label ? <div className={styles.inputFieldLabel}>{label}</div> : ""}
        {tootltipText ? (
          <ButtonToolbar>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{tootltipText}</Tooltip>}
            >
              <Button
                style={{
                  background: "none",
                  padding: "0",
                  color: "#43a6e1",
                  border: "none",
                  outline: "none",
                }}
              >
                <AiOutlineQuestionCircle />
              </Button>
            </OverlayTrigger>
          </ButtonToolbar>
        ) : (
          ""
        )}
      </div>
      {type !== "file" ? (
        <input
          placeholder={placeholder || ""}
          name={name || ""}
          autoComplete="off"
          type={type || "text"}
          className={`${styles.input} ${disabled && "inpDisabled"}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled || false}
          {...props}
        />
      ) : (
        <label
          className={`inp-type-file ${disabled && "input-type-file-disable"}`}
        >
          Upload {sound ? "Browse/Choose File" : "Image/pdf"}
          <input
            className="cursor-pointer d-none"
            placeholder={placeholder || ""}
            name={name || ""}
            autoComplete="off"
            type={type || "text"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled || false}
            {...props}
          />
        </label>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default InputField
