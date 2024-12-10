import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import DetailCard from "../common/DetailCard"
import styles from "./stepEight.module.scss"
import InputField from "../common/InputField"
import CustomSelect from "../common/CustomSelect"
import CardInfo from "../common/CardInfo"
import { addItem, addPrice, removeFromCart } from "../../../_features/cartSlice"

const StepEight = ({ formik }) => {
  const [activeTab, setActiveTab] = useState()
  const states = useSelector((state) => state?.common?.state)
  const dispatch = useDispatch()
  const stateOptions = states?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })

  useEffect(() => {
    dispatch(
      addItem({
        value: "License Package",
        price: 75,
        label: "License Package",
        parentName: "License Package",
        id: "123123qwe12",
      })
    )
    dispatch(addPrice())
  }, [])
  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Business Licenses and Permits">
        <h6 className={`mb-4 ${styles.detailCardTitle}`}>
          We’ve identified licenses for your Technology business in{" "}
          {formik?.values?.stateFormation}...
        </h6>
        <p className={styles.detailCardDesciption}>
          Business owners must ensure they are compliant with all relevant
          federal, state and local regulations.
          <br />
          <br />
          For this purpose, our team of Licensing Specialists can provide
          assistance in researching the necessary licenses, permits and tax
          registration applications required for your business on all levels.
        </p>

        <div className={styles.tabBtnsWrapper}>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() => {
              formik.setValues({ ...formik.values, businessLicense: false })
              dispatch(
                removeFromCart({
                  value: "License Package",
                  price: 75,
                  label: "License Package",
                  parentName: "License Package",
                  id: "123123qwe12",
                })
              )
              dispatch(addPrice())
            }}
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="businessLicense"
                type="radio"
                checked={
                  formik.values?.businessLicense === false ? true : false
                }
              />
            </div>
            <div>
              <p>No thanks, I'll do the work myself.</p>
            </div>
          </div>
          <div
            className={styles.tabBtn}
            role="button"
            onClick={() => {
              formik.setValues({ ...formik.values, businessLicense: true })
              dispatch(
                addItem({
                  value: "License Package",
                  price: 75,
                  label: "License Package",
                  parentName: "License Package",
                  id: "123123qwe12",
                })
              )
              dispatch(addPrice())
            }}
            tabIndex={0}
          >
            <div>
              <Form.Check
                inline
                name="businessLicense"
                type="radio"
                checked={formik.values?.businessLicense === true ? true : false}
              />
            </div>
            <div>
              <p>
                <b>Yes</b>, identify and send me all the necessary applications
                for the licenses I need. ($75)
              </p>
            </div>
          </div>
        </div>
        {formik.values?.businessLicense === false ? (
          <CardInfo title="Are Business Licenses and Permits Important for My Business?">
            Yes. It is important to take into account the need for business
            licenses and permits when starting a new business. Not having the
            required paperwork can leave you vulnerable to penalties and fines
            from state and local authorities, so be sure to check what you need
            before you begin operating.
          </CardInfo>
        ) : formik.values?.businessLicense === true ? (
          <div className={styles.detailCardFieldsWrapper}>
            <div className={styles.inpField}>
              <InputField
                label="Street Address *"
                name="businessLicenseStreetAddress"
                type="text"
                value={formik.values.businessLicenseStreetAddress}
                onChange={formik.handleChange}
                error={formik.errors.businessLicenseStreetAddress}
              />
            </div>
            <div className={styles.inpField}>
              <InputField
                label="Address (Cont)"
                name="businessLicenseAddress"
                type="text"
                value={formik.values.businessLicenseAddress}
                onChange={formik.handleChange}
                error={formik.errors.businessLicenseAddress}
              />
            </div>
            <div className={styles.inpField}>
              <InputField
                label="City *"
                name="businessLicenseCity"
                type="text"
                value={formik.values.businessLicenseCity}
                onChange={formik.handleChange}
                error={formik.errors.businessLicenseCity}
              />
            </div>
            <div className={styles.inpField}>
              <CustomSelect
                label="State *"
                name="businessLicenseState"
                placeholder="Select State"
                options={stateOptions}
                value={formik.values.businessLicenseState}
                onChange={(e) =>
                  formik.setValues({
                    ...formik.values,
                    businessLicenseState: e,
                  })
                }
              />
              <span className="error-message">
                {formik.errors.businessLicenseState?.value}
              </span>
            </div>
            <div className={styles.inpField}>
              <InputField
                label="Zip Code *"
                name="businessLicensePostal_code"
                type="text"
                value={formik.values.businessLicensePostal_code}
                onChange={formik.handleChange}
                error={formik.errors.businessLicensePostal_code}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </DetailCard>
    </div>
  )
}

export default StepEight
