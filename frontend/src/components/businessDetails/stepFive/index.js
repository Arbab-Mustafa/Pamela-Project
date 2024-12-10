import React from "react"
import { useSelector } from "react-redux"
import InputMask from "react-input-mask"
import { Button, Form } from "react-bootstrap"
import DetailCard from "../common/DetailCard"
import styles from "./stepFive.module.scss"
import InputField from "../common/InputField"
import CustomSelect from "../common/CustomSelect"
import CardInfo from "../common/CardInfo"
import PopUp from "../common/PopUp"

const StepFive = ({ formik }) => {
  React.useEffect(() => {}, [formik.values])
  const [showPopUp, setShowPopUp] = React.useState(false)
  const states = useSelector((state) => state?.common?.state)
  const stateOptions = states?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="EIN / Tax Identification Number Information">
        <p className={styles.detailCardDesciption}>
          An Employer Identification Number (EIN) is a unique nine-digit number
          issued by the IRS to businesses for the purpose of filing taxes. It is
          also known as a Federal Employer Identification Number (FEIN),
          Employer Identification Number (EIN), or Federal Tax Identification
          Number. This number is used to identify a business entity and serves a
          similar purpose to an individual's Social Security Number.
          <br />
          <br />
        </p>
        {formik.values.entityState !== "NonProfit" && (
          <>
            <br />I am a foreign individual and do not have a social security
            number.
            <div className="ms-3 mb-3 mt-3">
              <Form.Check
                inline
                label="Yes"
                checked={
                  formik.values?.foreignIndividual === true ? true : false
                }
                onChange={() =>
                  formik.setValues({
                    ...formik.values,
                    foreignIndividual: true,
                    einNumber: "",
                  })
                }
                name="foreignIndividual"
                type="radio"
                className="me-5"
              />
              <Form.Check
                inline
                label="No"
                name="foreignIndividual"
                type="radio"
                checked={
                  formik.values?.foreignIndividual === false ? true : false
                }
                onChange={() =>
                  formik.setValues({
                    ...formik.values,
                    foreignIndividual: false,
                    einNumber: "",
                  })
                }
              />
            </div>
          </>
        )}

        <div className={styles.detailCardFieldsWrapper}>
          <div className={styles.inpField}>
            <InputField
              label="First Name *"
              name="einFirstName"
              type="text"
              value={formik.values?.einFirstName}
              onChange={formik.handleChange}
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Last Name *"
              name="einLastName"
              type="text"
              value={formik.values?.einLastName}
              onChange={formik.handleChange}
            />
          </div>
          {!formik.values?.foreignIndividual && (
            <div className="w-100">
              <div className="ms-3 mb-3">
                <Form.Check
                  inline
                  label="ITIN"
                  name="einNumberType"
                  onChange={() => {
                    setShowPopUp(!showPopUp)
                  }}
                  checked={
                    formik.values?.einNumberType === "ITIN" ? true : false
                  }
                  type="radio"
                  className="me-5"
                />
                <Form.Check
                  inline
                  label="SSN"
                  name="einNumberType"
                  type="radio"
                  onChange={() =>
                    formik.setValues({
                      ...formik.values,
                      einNumberType: "SSN",
                      einNumber: "",
                    })
                  }
                  checked={
                    formik.values?.einNumberType === "SSN" ? true : false
                  }
                />
              </div>
              <div className={styles.ssnInpField}>
                {/* <InputField
                  name="ssnNumber"
                  type="text"
                  placeholder="000-00-0000"
                /> */}

                <InputMask
                  mask="99-9999999"
                  name="einNumber"
                  maskChar=""
                  className="custom-input"
                  onChange={(e) => {
                    if (formik.values?.einNumberType === "ITIN") {
                      if (
                        !e.target.value.startsWith("9") &&
                        formik.values.einNumber.length === 0
                      ) {
                        return formik.setErrors({
                          einNumber: "Number should start with 9 ",
                        })
                      }
                    }
                    formik.setValues({
                      ...formik.values,
                      einNumber: e.target.value,
                    })
                  }}
                  value={formik.values?.einNumber}
                />
                <span className="error-message">{formik.errors.einNumber}</span>
              </div>
            </div>
          )}
        </div>
        <CardInfo>
          To ensure that delivery of your order is not delayed, please make sure
          the details you give are correct. Please make sure the name you
          provide is spelled precisely as it appears on your social security
          card.
        </CardInfo>
      </DetailCard>
      <DetailCard title="Physical Street Address">
        <p className={styles.detailCardDesciption}>
          The IRS will only provide an Employer Identification Number (EIN / Tax
          ID Number) for your company if you can provide them with a physical
          address. They do not accept PO Boxes for this purpose. However, this
          address is kept private and confidential. It will not be made public
          information.
        </p>
        <div className={styles.detailCardFieldsWrapper}>
          <div className={styles.inpField}>
            <InputField
              label="Street Address *"
              name="einStreetAddress"
              type="text"
              value={formik.values.einStreetAddress}
              onChange={formik.handleChange}
              error={formik.errors?.einStreetAddress}
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="City *"
              name="einCity"
              type="text"
              value={formik.values.einCity}
              onChange={formik.handleChange}
              error={formik.errors?.einCity}
            />
          </div>
          <div className={styles.inpField}>
            <CustomSelect
              label="State *"
              name="einState"
              placeholder="Select State"
              options={stateOptions}
              value={formik.values.einState}
              onChange={(e) =>
                formik.setValues({ ...formik.values, einState: e })
              }
            />
            <span className="error-message">
              {formik.errors.agentState?.value}
            </span>
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Zip Code *"
              name="einPostal_code"
              type="number"
              value={formik.values.einPostal_code}
              onChange={formik.handleChange}
              error={formik.errors?.einPostal_code}
            />
          </div>
        </div>
      </DetailCard>
      <PopUp
        show={showPopUp}
        centered="centered"
        handleClose={() => setShowPopUp(!showPopUp)}
      >
        <div className="popupWrapper">
          <div className="popupHeader">Confirm</div>
          <div className="popupBody">
            <h6>
              The obtainment for an EIN using an ITIN number cannot be procured
              through the IRS automated system and will take up to 12 weeks to
              obtain.
            </h6>
          </div>
          <div className="popupFooter">
            <Button
              className="popupBtnPrimary"
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  einNumberType: "ITIN",
                  einNumber: "",
                })
                setShowPopUp(!showPopUp)
              }}
            >
              I Agree
            </Button>
            <Button
              className="popupBtnSecondary"
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  einNumberType: "SSN",
                  einNumber: "",
                })
                setShowPopUp(!showPopUp)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </PopUp>
    </div>
  )
}

export default StepFive
