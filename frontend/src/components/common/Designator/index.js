import React from "react"
import Select from "react-select"
import { useDispatch } from "react-redux"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { Button, ButtonToolbar, OverlayTrigger, Tooltip } from "react-bootstrap"
import {
  copDesignator,
  llcDesignator,
  nonProfitDesignator,
} from "../../../utils/helpers"
import { addItem } from "../../../_features/cartSlice"
import styles from "./style.module.scss"

const Designator = ({ formik, designator, setDesignator, business }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (business) {
      if (formik.values.entityState === "LLC") {
        setDesignator(llcDesignator)
      } else if (formik.values.entityState === "Nonprofit") {
        setDesignator(nonProfitDesignator)
      } else if (formik.values.entityState === "C-Corporation") {
        setDesignator(copDesignator)
      } else if (formik.values.entityState === "S-Corporation") {
        setDesignator(copDesignator)
      } else {
        setDesignator([])
      }
    } else {
      if (formik.values.entityType.value === "LLC") {
        setDesignator(llcDesignator)
      } else if (formik.values.entityType.value === "Nonprofit") {
        setDesignator(nonProfitDesignator)
      } else if (formik.values.entityType.value === "Corporation") {
        setDesignator(copDesignator)
      } else {
        setDesignator(copDesignator)
      }
    }
  }, [formik?.values?.entityType?.value, formik?.values?.entityType])
  const designatorOptions = designator.map((value) => {
    return {
      value: value?.value,
      label: value?.name || value?.label,
      id: value?.name || value?.label,
      price: 0,
      parentName: "designatorOptions",
    }
  })
  return (
    <div className={styles.form1}>
      <div className="d-flex align-items-center justify-content-between">
        <p className={styles.subtitle}>Designator *</p>
        <ButtonToolbar>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                A state designator is an abbreviation used to represent the
                entity type, such as LLC or Inc. and is included in the company
                name.
              </Tooltip>
            }
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
      </div>
      <Select
        options={designatorOptions}
        placeholder="Select Designator"
        className="react-select-container"
        classNamePrefix="react-select"
        value={formik.values.designator}
        onChange={(e) => {
          formik.setValues({
            ...formik.values,
            designator: e,
          })
          if (!business) {
            dispatch(addItem(e))
          }
        }}
        onBlur={formik.handleBlur}
        name="designator"
        id="designator"
      />
      <span className="error-message">{formik.errors.designator?.value}</span>
    </div>
  )
}

export default Designator
