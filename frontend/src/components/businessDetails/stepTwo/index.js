import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import DetailCard from "../common/DetailCard"
import styles from "./stepTwo.module.scss"
import InputField from "../common/InputField"
import TextAreaField from "../common/TextAreaField"
import CustomSelect from "../common/CustomSelect"
import tickIcon from "../../../images/services/amendment/need/tick.svg"
import OfferCard from "../common/OfferCard/OfferCard"
import {
  designatorOptions,
  membersOptions,
  shareholderOptions,
} from "../../../utils/helpers"
import Designator from "../../common/Designator"
import { useData } from "../../../utils/helper2"
import { addItem } from "../../../_features/cartSlice"
import CompanyPreview from "../../common/CompanyPreview"
import CardInfo from "../common/CardInfo"

const StepTwo = ({ formik, type }) => {
  const [designator, setDesignator] = useState([])
  const [address, setAddress] = useState()
  const dispatch = useDispatch()
  const states = useSelector((state) => state?.common?.state)
  const CCoperationOptions = [
    {
      value: "CORPORATION",
      label: "CORPORATION",
      id: 1,
    },
    {
      value: "CORP",
      label: "CORP",
      id: 2,
    },
    {
      value: "INCORPORATED",
      label: "INCORPORATED",
      id: 3,
    },
    {
      value: "CORP",
      label: "CORP",
      id: 4,
    },
    {
      value: "INC",
      label: "INC",
      id: 5,
    },
    {
      value: "INC.",
      label: "INC.",
      id: 6,
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

  const industryOption = useData.industry.map((value) => {
    return {
      value: `${value?.code}-${value?.title}`,
      label: `${value?.code}-${value?.title}`,
      id: `${value?.code}-${value?.title}`,
      price: 0,
      parentName: " INDUSTRY",
    }
  })
  React.useEffect(() => {
    if (formik.values.stateFormation) {
      const getAddress = useData.virtualAddress.find(
        (e) =>
          e.state.toLowerCase() === formik.values.stateFormation.toLowerCase()
      )
      if (getAddress) {
        setAddress(getAddress)
        dispatch(
          addItem({
            label: "Business Address",
            value: "Business Address",
            price: 29,
            id: 123456789,
            parentName: "Business Address",
          })
        )
      } else {
        setAddress(false)
      }
    }
  }, [formik.values.stateFormation])

  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Company Information">
        <Form onSubmit={formik.handleSubmit}>
          <div className={styles.detailCardFieldsWrapper}>
            <div className={styles.inpField}>
              <InputField
                label={`${formik.values.entityState} Name`}
                name="companyName"
                type="text"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.errors.companyName}
              />
            </div>

            <Designator
              formik={formik}
              designator={designator}
              setDesignator={setDesignator}
              business
            />
            <div className="w-100">
              {formik.values.companyName && formik.values.designator.value && (
                <div className="w-100">
                  <CompanyPreview
                    name={formik.values.companyName}
                    designator={formik.values.designator.label}
                  />
                </div>
              )}
            </div>

            <div className="w-100">
              <CustomSelect
                label={
                  formik.values.entityState === "C-Corporation"
                    ? "Select Directors"
                    : formik.values.entityState.toLowerCase() ===
                      "NonProfit".toLowerCase()
                    ? "Select Directors"
                    : "Select Members"
                }
                name="membersNo"
                placeholder="Select"
                options={membersOptions}
                value={formik.values.members}
                onChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    members: e,
                  })
                }}
              />
            </div>
            <span className="error-message">
              {formik.errors.members?.value}
            </span>
            <div className="w-100">
              <TextAreaField
                name="businessPurpose"
                value={formik.values.businessPurpose}
                onChange={formik.handleChange}
                error={formik.errors.businessPurpose}
                placeholder="Please provide brief description of Business Purpose"
                label="Business Purpose*"
              />
            </div>
            <div className="w-100">
              <CustomSelect
                label="Tell us what industry your business is in? *"
                name="businessIdea"
                type="text"
                value={formik.values.businessIdea}
                options={industryOption}
                onChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    businessIdea: e,
                  })
                }}
                error={formik.errors.businessIdea}
              />
              {formik.values.businessIdea.value && (
                <div className="w-100">
                  <CompanyPreview
                    name={formik.values.businessIdea.value}
                    businessType
                  />
                </div>
              )}
            </div>
          </div>
        </Form>
      </DetailCard>
      {type === "corporation" && (
        <DetailCard title="Corporate Stock Information">
          <div className={styles.detailCardFieldsWrapper}>
            <div className={styles.inpField}>
              <InputField
                label="No. of Shares Authorized"
                tootltipText={`How many shares of stock are permitted to be issued by the company?

                `}
                name="shareholderNumberAuth"
                type="number"
                value={formik.values.shareholderNumberAuth}
                onChange={formik.handleChange}
                error={formik.errors.shareholderNumberAuth}
              />
            </div>
            <div className={styles.inpField}>
              <InputField
                label="Share Par Value"
                name="sharePerValue"
                tootltipText={`What is the dollar value of each share of stock?
                `}
                type="number"
                value={formik.values.sharePerValue}
                onChange={formik.handleChange}
                error={formik.errors.sharePerValue}
              />
            </div>
            <div className="w-100">
              <CustomSelect
                label="No. of Shareholders"
                name="shareholdersNo"
                tootltipText={`A shareholder is an individual or entity that owns shares in a company. Shareholders are also referred to as stockholders. Being a shareholder gives that individual or entity the right to vote at shareholders meetings and to receive dividends.

                `}
                placeholder="Select No. Of Shareholders"
                options={shareholderOptions}
                value={formik.values.shareholderNumber}
                onChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    shareholderNumber: e,
                  })
                }}
              />
            </div>
            <span className="error-message">
              {formik.errors.shareholderNumber?.value}
            </span>
          </div>
          <CardInfo>
            A corporation can't be a corporation without at least one share of
            stock. You must have at least one shareholder, and one share of
            stock. You can have (authorize) as many shares of stock as you want,
            however, this may increase your filing fees in some cases.
          </CardInfo>
        </DetailCard>
      )}
      <DetailCard title="Company Address Information">
        <p className={styles.detailCardDesciption}>
          We recommend using our Business Address service if you wish to retain
          your privacy and need a physical location to represent your business.
          The registration paperwork can make the address of the business and
          the personal address of the owners publicly accessible.
          <br />
          <br />
          Advantages of using our Business Mailbox service. <br />
          <br />
          <ul className={styles.detailCardList}>
            <li>
              <img src={tickIcon} alt="tick" />
              <span>Protect your personal details from being disclosed.</span>
            </li>
            <li>
              {" "}
              <img src={tickIcon} alt="tick" />
              <span>Get real-time notifications when mail arrives.</span>
            </li>
            <li>
              <img src={tickIcon} alt="tick" />
              <span>
                Maintain a physical presence even though you are not physically
                at that address.
              </span>
            </li>
            <li>
              {" "}
              <img src={tickIcon} alt="tick" />
              <span>
                Have access to your correspondence from any place in the world.
              </span>
            </li>
            <li>
              {" "}
              <img src={tickIcon} alt="star" />
              <span>
                Receive messages from governmental agencies such as the
                Secretary of State.
              </span>
            </li>
          </ul>
        </p>
        <div className={styles.addressSelectWrapper}>
          <OfferCard
            type="professional"
            formik={formik}
            offer
            address={address}
          />
          <OfferCard
            type="own"
            formik={formik}
            offer={false}
            address={address}
          />
        </div>
        {!formik.values?.paidAddress && (
          <DetailCard>
            <p className={styles.detailCardDesciption}>
              Please provide the address you would like listed as your company
              address.
            </p>
            <div className={styles.detailCardFieldsWrapper}>
              <div className={styles.inpField}>
                <InputField
                  label="Street Address"
                  name="streetAddress"
                  type="text"
                />
              </div>
              <div className={styles.inpField}>
                <InputField
                  label="Address (Cont)"
                  name="addressCont"
                  type="text"
                />
              </div>
              <div className={styles.inpField}>
                <InputField label="City" name="city" type="text" />
              </div>
              <div className={styles.inpField}>
                <CustomSelect
                  label="State"
                  name="state"
                  options={stateOptions}
                  placeholder=""
                />
              </div>
              <div className={styles.inpField}>
                <InputField label="Zip Code" name="zipCode" type="text" />
              </div>
            </div>
          </DetailCard>
        )}
      </DetailCard>
    </div>
  )
}

export default StepTwo
