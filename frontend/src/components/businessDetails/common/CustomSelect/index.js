import React from "react"
import { Button, ButtonToolbar, OverlayTrigger, Tooltip } from "react-bootstrap"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import Select from "react-select"
import styles from "./customSelect.module.scss"

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  disabled,
  tootltipText,
  ...props
}) => {
  return (
    <div
      className={`${styles.customSelectWrapper} ${
        disabled && styles.disabledCustomSelect
      } `}
    >
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

      <Select
        options={options}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={`react-select-container ${
          disabled && "react-select-disabled"
        }`}
        classNamePrefix="react-select"
        isDisabled={disabled}
        {...props}
      />
    </div>
  )
}

export default CustomSelect
