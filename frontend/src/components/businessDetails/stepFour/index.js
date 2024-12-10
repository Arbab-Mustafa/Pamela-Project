import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import DetailCard from "../common/DetailCard"
import styles from "./stepFour.module.scss"
import InputField from "../common/InputField"
import CustomSelect from "../common/CustomSelect"
import tickIcon from "../../../images/services/amendment/need/tick.svg"
import free from "../../../images/startBusiness/free-first-year.svg"
import guaranteed from "../../../images/startBusiness/guaranteed-rates.svg"
import reduce from "../../../images/startBusiness/reduce-junk.svg"
import inclusive from "../../../images/startBusiness/all-inclusive.svg"
import { addItem, removeFromCart } from "../../../_features/cartSlice"

const StepFour = ({ formik }) => {
  React.useEffect(() => {}, [formik.values])
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
  const registerBenifits = [
    {
      icon: free,
      title: "Free First Year",
      para: `All initial orders of incorporation services come with one year of FREE Registered Agent service. The service will automatically renew every 12 months for $129, but you can cancel anytime by substituting your agent and notifying us.`,
    },
    {
      icon: guaranteed,
      title: "Convenience",
      para: `Filthy Rich Idea provides a comprehensive service that allows businesses to easily and quickly complete the necessary registration paperwork. This eliminates the need for businesses to spend time researching and filing the paperwork.`,
    },
    {
      icon: inclusive,
      title: "Cost Savings",
      para: `Filthy Rich Idea offers a flat rate for an annual registered agent service, whereas a traditional registered agent may charge a monthly fee and additional fees for additional services. This can result in significant cost savings for businesses.`,
    },
    {
      icon: reduce,
      title: "Accessibility",
      para: `Filthy Rich Idea’s registered agent service is available 24/7. This gives businesses the ability to receive and respond to legal documents quickly.`,
    },
    {
      icon: guaranteed,
      title: "Security",
      para: `Filthy Rich Idea’s registered agent service provides businesses with a secure, reliable way to receive important documents. This ensures that all documents are received in a timely manner and are securely stored.
`,
    },
  ]

  return (
    <div className={styles.stepWrapper}>
      <DetailCard title="Registered Agent Information">
        <div className={styles.detailCardDesciption}>
          <h5>
            {formik?.values?.stateFormation} requires a{" "}
            {formik?.values?.entityState} to appoint a Registered Agent:
          </h5>
          {/* <div className={styles.subTitleList}>
            <div className={styles.listIcon}>
              <img src={tickIcon} alt="tick" />
            </div>
            <div className={styles.listText}>
              Only Filthy Rich Idea offers 1 full year of Registered Agent service FREE
              with every new business formation order - a $119.00 value!
            </div>
          </div>
          <h5 className="mt-3">
            Typical documents received by your Registered Agent can include:
          </h5>
          <div className={styles.subTitleList}>
            <div className={styles.listIcon}>
              <img src={tickIcon} alt="tick" />
            </div>
            <div className={styles.listText}>
              Service of Process, i.e. notification of a pending lawsuit or
              court order
            </div>
          </div>
          <div className={styles.subTitleList}>
            <div className={styles.listIcon}>
              <img src={tickIcon} alt="tick" />
            </div>
            <div className={styles.listText}>
              State correspondence, i.e. annual reports or statements
            </div>
          </div> */}
          <div className={styles.subTitleList}>
            A registered agent is an individual or entity designated to receive
            legal documents on behalf of a business. Our registered agents will
            be available during regular business hours to receive service of
            process notices, official government correspondence, and other legal
            notices served on the business. We make it our responsibility to
            forward these documents in a timely manner to your business.
          </div>
        </div>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabBtnsWrapper}>
            <div
              className={styles.tabBtn}
              role="button"
              onClick={() => {
                formik.setValues({ ...formik.values, agentFree: 0 })
                dispatch(
                  addItem({
                    label: "$59 Registered Agent Service for a year!",
                    values: "$59 Registered Agent Service for a year!",
                    price: null,
                    priceData: null,
                    id: "$59 Registered Agent Service for a year!",
                    parentName: "$59 Registered Agent Service for a year!",
                  })
                )
              }}
              tabIndex={0}
            >
              <div>
                <Form.Check
                  inline
                  name="agentFree"
                  checked={formik.values?.agentFree === 0 ? "checked" : ""}
                />
              </div>
              <div>
                <p>
                  Assign Filthy Rich Idea as my Registered Agent for FREE my
                  first year.
                </p>
              </div>
            </div>
            <div
              className={styles.tabBtn}
              role="button"
              onClick={() => {
                formik.setValues({ ...formik.values, agentFree: 1 })
                dispatch(
                  removeFromCart({
                    label: "$59 Registered Agent Service for a year!",
                    values: "$59 Registered Agent Service for a year!",
                    price: null,
                    priceData: null,
                    id: "$59 Registered Agent Service for a year!",
                    parentName: "$59 Registered Agent Service for a year!",
                  })
                )
              }}
              tabIndex={0}
            >
              <div>
                <Form.Check
                  inline
                  name="agentFree"
                  checked={formik.values?.agentFree === 1 ? "checked" : ""}
                />
              </div>
              <div>
                <p>I would like to act as my own registered agent.</p>
              </div>
            </div>
          </div>
          <div className={styles.tabsContentWrapper}>
            {formik.values?.agentFree === 0 ? (
              <div className={styles.registerBenifits}>
                <h2>Why Use Us As Your Registered Agent?</h2>
                {registerBenifits.map((item) => (
                  <div className={styles.benifitList} key={item.title}>
                    <div className={styles.listIcon}>
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <div className={styles.listContent}>
                      <h5>{item.title}</h5>
                      <p>{item.para}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : formik.values?.agentFree === 1 ? (
              <>
                <div className={styles.tabsWrapper}>
                  <div className={styles.agentInfo}>
                    <h2>Agent Information</h2>
                    <p>
                      You can act as your own Registered Agent if you have a
                      physical address (not a PO Box) in the state where the
                      company is being formed.
                    </p>
                  </div>
                  <div className={styles.tabBtnsWrapper}>
                    <div
                      className={styles.tabBtn}
                      role="button"
                      onClick={() =>
                        formik.setValues({
                          ...formik.values,
                          activeTab: 0,
                          agentCompanyName: "",
                        })
                      }
                      tabIndex={0}
                    >
                      <div>
                        <Form.Check
                          inline
                          name="activeTab"
                          type="radio"
                          checked={formik.values?.activeTab === 0 ? true : ""}
                        />
                      </div>
                      <div>
                        <h6>Individual</h6>
                        <p>Select if Member is a person.</p>
                      </div>
                    </div>
                    <div
                      className={styles.tabBtn}
                      role="button"
                      onClick={() =>
                        formik.setValues({
                          ...formik.values,
                          activeTab: 1,
                          agentFirstName: "",
                          agentLastName: "",
                        })
                      }
                      tabIndex={0}
                    >
                      <div>
                        <Form.Check
                          inline
                          name="activeTab"
                          type="radio"
                          checked={formik.values?.activeTab === 1 ? true : ""}
                        />
                      </div>
                      <div>
                        <h6>Company</h6>
                        <p>Select if Member is a company.</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tabsContentWrapper}>
                    {formik.values?.activeTab === 0 ? (
                      <>
                        <div className={styles.detailCardFieldsWrapper}>
                          <div className={styles.inpField}>
                            <InputField
                              label="Agent First Name *"
                              name="agentFirstName"
                              type="text"
                              value={formik.values.agentFirstName}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentFirstName}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Agent Last Name *"
                              name="agentLastName"
                              type="text"
                              value={formik.values.agentLastName}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentLastName}
                            </span>
                          </div>

                          <div className={styles.inpField}>
                            <InputField
                              label="Agent Street Address *"
                              name="agentStreetAddress"
                              type="text"
                              value={formik.values.agentStreetAddress}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentStreetAddress}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Address (Cont)"
                              name="agentAddress"
                              type="text"
                              value={formik.values.agentAddress}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentAddress}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="City *"
                              name="agentCity"
                              type="text"
                              value={formik.values.agentCity}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentCity}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <CustomSelect
                              label="State *"
                              name="agentState"
                              placeholder="Select State"
                              options={stateOptions}
                              value={formik.values.agentState}
                              onChange={(e) => {
                                formik.setValues({
                                  ...formik.values,
                                  agentState: e,
                                })
                              }}
                            />
                            <span className="error-message">
                              {formik.errors.agentState?.value}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Zip Code *"
                              name="agentZipcode"
                              type="number"
                              value={formik.values.agentZipcode}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentZipcode}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : formik.values?.activeTab === 1 ? (
                      <>
                        <div className={styles.detailCardFieldsWrapper}>
                          <div className="w-100">
                            <InputField
                              label="Company Name *"
                              name="agentCompanyName"
                              type="text"
                              value={formik.values.agentCompanyName}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentCompanyName}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Agent Street Address *"
                              name="agentStreetAddress"
                              type="text"
                              value={formik.values.agentStreetAddress}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentStreetAddress}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Address (Cont)"
                              name="agentAddress"
                              type="text"
                              value={formik.values.agentAddress}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentAddress}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="City *"
                              name="agentCity"
                              type="text"
                              value={formik.values.agentCity}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentCity}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <CustomSelect
                              label="State *"
                              name="agentState"
                              placeholder="Select State"
                              options={stateOptions}
                              value={formik.values.agentState}
                              onChange={(e) => {
                                formik.setValues({
                                  ...formik.values,
                                  agentState: e,
                                })
                              }}
                            />
                            <span className="error-message">
                              {formik.errors.agentState?.value}
                            </span>
                          </div>
                          <div className={styles.inpField}>
                            <InputField
                              label="Zip Code *"
                              name="agentZipcode"
                              type="text"
                              value={formik.values.agentZipcode}
                              onChange={formik.handleChange}
                            />
                            <span className="error-message">
                              {formik.errors.agentZipcode}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </DetailCard>
      {/* <DetailCard title="Member">
        <div className={styles.tabsWrapper}>
          <div className={styles.tabBtnsWrapper}>
            <div
              className={styles.tabBtn}
              role="button"
              onClick={() => setActiveTab(0)}
              tabIndex={0}
            >
              <div>
                <Form.Check
                  inline
                
                  type="radio"
                  checked={activeTab === 0 ? "checked" : ""}
                />
              </div>
              <div>
                <h6>Individual</h6>
                <p>Select if Member is a person.</p>
              </div>
            </div>
            <div
              className={styles.tabBtn}
              role="button"
              onClick={() => setActiveTab(1)}
              tabIndex={0}
            >
              <div>
                <Form.Check
                  inline
                  
                  type="radio"
                  checked={activeTab === 1 ? "checked" : ""}
                />
              </div>
              <div>
                <h6>Company</h6>
                <p>Select if Member is a company.</p>
              </div>
            </div>
          </div>
          <div className={styles.tabsContentWrapper}>
            {activeTab === 0 ? (
              <>
                <div className={styles.detailCardFieldsWrapper}>
                  <div className={styles.inpField}>
                    <InputField
                      label="First Name *"
                      name="firstName"
                      type="text"
                    />
                  </div>
                  <div className={styles.inpField}>
                    <InputField
                      label="Last Name *"
                      name="lastName"
                      type="text"
                    />
                  </div>
                  <div className={styles.inpField}>
                    <InputField
                      label="Street Address *"
                      name="streetAddress"
                      type="text"
                    />
                  </div>
                  <div className={styles.inpField}>
                    <InputField
                      label="Address (Cont)"
                      name="contAddress"
                      type="text"
                    />
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
                  <div className={styles.inpField}>
                    <CustomSelect
                      label="% of Ownership *"
                      name="state"
                      placeholder="Select State"
                      options={ownershipOptions}
                    />
                  </div>
                </div>
                <CardInfo>
                  The articles of organization will include the names and or
                  addresses of the initial members of the LLC.
                </CardInfo>
              </>
            ) : activeTab === 1 ? (
              <>
                <div className={styles.detailCardFieldsWrapper}>
                  <div className="w-100">
                    <InputField
                      label="Company Name *"
                      name="companyName"
                      type="text"
                    />
                  </div>
                  <div className={styles.inpField}>
                    <InputField
                      label="Street Address *"
                      name="streetAddress"
                      type="text"
                    />
                  </div>
                  <div className={styles.inpField}>
                    <InputField
                      label="Address (Cont)"
                      name="contAddress"
                      type="text"
                    />
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
                  <div className={styles.inpField}>
                    <CustomSelect
                      label="% of Ownership *"
                      name="state"
                      placeholder="Select State"
                      options={ownershipOptions}
                    />
                  </div>
                </div>
                <CardInfo>
                  The articles of organization will include the names and or
                  addresses of the initial members of the LLC.
                </CardInfo>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </DetailCard> */}
    </div>
  )
}

export default StepFour
