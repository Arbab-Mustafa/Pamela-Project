import React from "react"
import { useSelector } from "react-redux"
import DetailCard from "../../common/DetailCard"
import styles from "./stepThree.module.scss"
import InputField from "../../common/InputField"
import CustomSelect from "../../common/CustomSelect"
import CardInfo from "../../common/CardInfo"

const StepThree = () => {
  const states = useSelector((state) => state?.common?.state)
  const selectOptions = [
    {
      value: "member",
      label: "member",
    },
    {
      value: "other",
      label: "other",
    },
  ]
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
      <div className={styles.infoTitle}>Directors Information</div>
      <DetailCard title="Director">
        <div className={styles.detailCardFieldsWrapper}>
          <div className={styles.inpField}>
            <InputField label="First Name *" name="firstName" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="Last Name *" name="lastName" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField
              label="Street Address *"
              name="streetAddress"
              type="text"
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="Address (Cont)" name="contAddress" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="City *" name="city" type="text" />
          </div>
          <div className={styles.inpField}>
            <CustomSelect
              label="State *"
              name="state"
              placeholder="Select State"
              options={stateOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="Zip Code *" name="zipCode" type="text" />
          </div>
        </div>
        <CardInfo>
          The articles of organization will include the names and or addresses
          of the initial members of the LLC.
        </CardInfo>
      </DetailCard>
      <div className={styles.infoTitle}>Officer Information</div>
      <DetailCard title="President/CEO">
        <div className={styles.detailCardDesciption}>
          The President (a.k.a. Chief Executive Officer or CEO) has general
          supervision, direction, and control of the day-to-day business and
          affairs of the corporation, subject to the direction and control of
          the board of directors.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="President *"
              name="president"
              placeholder="Select President"
              options={selectOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="First Name *" name="firstName" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="Last Name *" name="lastName" type="text" />
          </div>
        </div>
      </DetailCard>
      <DetailCard title="Secretary">
        <div className={styles.detailCardDesciption}>
          The Corporate Secretary (or other corporate officer designated by the
          board of directors to maintain and keep corporate records) will keep,
          or cause to be kept, at the principal office of the corporation, a
          book of minutes of all meetings of directors and shareholders.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="Secretary *"
              name="secretary"
              placeholder="Select Secretary"
              options={selectOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="First Name *" name="firstName" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="Last Name *" name="lastName" type="text" />
          </div>
        </div>
      </DetailCard>
      <DetailCard title="Treasurer">
        <div className={styles.detailCardDesciption}>
          The Treasurer (a.k.a. Chief Financial Officer or CFO) will keep and
          maintain, or cause to be kept and maintained, adequate and correct
          books and records of accounts of the properties and business
          transactions of the corporation.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="Treasurer *"
              name="treasurer"
              placeholder="Select Treasurer"
              options={selectOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="First Name *" name="firstName" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="Last Name *" name="lastName" type="text" />
          </div>
        </div>
      </DetailCard>
      <DetailCard title="Vice President ">
        <div className={styles.detailCardDesciption}>
          the role of the Vice President is to be able to fill in for the
          president anytime the President is unavailable, whether it be in
          corporate meetings or day to day business decisions.
        </div>
        <div className={styles.detailCardFieldsWrapper}>
          <div className="w-100">
            <CustomSelect
              label="Vice President"
              name="vicePresident"
              placeholder="Select Vice President"
              options={selectOptions}
            />
          </div>
          <div className={styles.inpField}>
            <InputField label="First Name *" name="firstName" type="text" />
          </div>
          <div className={styles.inpField}>
            <InputField label="Last Name *" name="lastName" type="text" />
          </div>
        </div>
      </DetailCard>
    </div>
  )
}

export default StepThree
