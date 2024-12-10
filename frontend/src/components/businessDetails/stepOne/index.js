import React from "react"
import { useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import DetailCard from "../common/DetailCard"
import styles from "./stepOne.module.scss"
import InputField from "../common/InputField"
import PhoneSelect from "../common/PhoneInput"
import CustomSelect from "../common/CustomSelect"
import CardInfo from "../common/CardInfo"

const StepOne = ({ formik }) => {
  const [designator, setDesignator] = React.useState([])
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
      <DetailCard title="Contact Person">
        <p className={styles.detailCardDesciption}>
          Please provide the name of the individual who we can contact in case
          more information is required.
        </p>
        <Form>
          <div className={styles.detailCardFieldsWrapper}>
            <div className={styles.inpField}>
              <InputField
                label="First Name *"
                name="firstName"
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.errors.firstName}
              />
            </div>
            <div className={styles.inpField}>
              <InputField
                label="Last Name *"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.errors.lastName}
              />
            </div>
            <div className={styles.inpField}>
              <InputField
                label="Email *"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
              />
            </div>
            <div className={styles.inpField}>
              <PhoneSelect
                label="Mobile Phone *"
                name="phone"
                value={formik.values.phone}
                onChange={(e) =>
                  formik.setValues({ ...formik.values, phone: e })
                }
                error={formik.errors.phone}
              />
            </div>
          </div>
        </Form>
      </DetailCard>
      <DetailCard title="Mailing Address">
        <div className={styles.detailCardFieldsWrapper}>
          <div className={styles.inpField}>
            <InputField
              label="Street Address *"
              name="streetAddress"
              type="text"
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              error={formik.errors.streetAddress}
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Address (Cont)"
              name="address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
            />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="City *"
              name="city"
              type="text"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.errors.city}
            />
          </div>
          <div className={styles.inpField}>
            <CustomSelect
              label="State *"
              name="state"
              placeholder="Select State"
              options={stateOptions}
              value={formik.values?.state}
              onChange={(e) => {
                formik.setValues({
                  ...formik.values,
                  state: e,
                })
              }}
            />
            <span className="error-message">{formik.errors.state?.value}</span>
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Zip Code *"
              name="postal_code"
              type="Number"
              value={formik.values.postal_code}
              onChange={formik.handleChange}
              error={formik.errors.postal_code}
            />
          </div>
        </div>
        {/* <CardInfo title="How will this address be used?">
          The contact address is the primary address used for the delivery of
          any documents or products related to your order. This address is used
          for internal purposes only and will not be shared with any third
          parties or other outside agencies unless provided in any subsequent
          pages of the order process which require the intake of an address.
        </CardInfo> */}
      </DetailCard>
    </div>
  )
}

export default StepOne
