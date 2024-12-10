import React, { useEffect, useState } from "react"
import {
  Col,
  Container,
  Row,
  Button,
  Spinner,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import moment from "moment"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import PhoneInput from "react-phone-input-2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"
// import { companyCreate, companyReset } from "../../../../_features/companySlice"
import styles from "./ServiceForm.module.scss"
import icon from "../../../../images/services/articlesofamendment/icon.svg"
import {
  copDesignator,
  entityOptions,
  industries,
  llcDesignator,
  nonProfitDesignator,
} from "../../../../utils/helpers"
import {
  addItem,
  addPrice,
  removeFromCart,
} from "../../../../_features/cartSlice"
import { routes } from "../../../../routes"
import PriceSection from "../../../common/PriceSection"
import CompanyPreview from "../../../common/CompanyPreview"
import Designator from "../../../common/Designator"
import DetailCard from "../../../businessDetails/common/DetailCard"
import { updateSingle } from "../../../../_features/ordersSlice"

function BusinessLicenseForm({ edit }) {
  const company = useSelector((state) => state?.company)
  const userData = useSelector((state) => state?.auth?.userData)
  const userToken = useSelector((state) => state?.auth?.userToken)
  const statesRed = useSelector((state) => state?.common?.state)
  const singleService = useSelector((state) => state?.common?.selectedService)

  const serviceData = JSON.parse(localStorage.getItem("serviceDetails")) || {}
  const singleOrder = useSelector(
    (state) => state?.orders?.singleOrder?.serviceDetails?.details
  )
  const formData = singleOrder || {}
  const singleOrderName = useSelector(
    (state) => state?.orders?.singleOrder?.serviceDetails?.name
  )
  const idOrder = useSelector((state) => state?.orders?.singleOrder?._id)
  const isLoading = useSelector((state) => state?.orders?.isLoading)

  const date = new Date()
  const date2 = new Date()
  const date3 = new Date()

  const dispatch = useDispatch()

  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const companyAddressOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const industryOption = industries?.map((value) => {
    return {
      value: value,
      label: value,
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate(`${routes.login}`, {
        state: {
          agentServiceProp: true,
        },
      })
      toast.error("Please login first")
    }
  }, [userToken])

  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || formData?.firstName || "",
      lastName: userData?.lastName || formData?.lastName || "",
      email: userData?.email || formData?.email || "",
      phone: userData?.phone || formData?.phone || "",
      companyName: formData?.companyName || "",
      streetAddress: formData?.streetAddress || "",
      address: formData?.address || "",
      city: formData?.city || "",
      state: {
        label: formData?.state?.label || "Select state",
        value: formData?.state?.value || "",
      },
      entityType: {
        label: formData?.entityType?.label || "Select ",
        value: formData?.entityType?.value || "",
      },
      stateFormation: {
        label: formData?.stateFormation?.label || "Select state",
        value: formData?.stateFormation?.value || "",
      },
      stateService: {
        label: formData?.stateService?.label || "Select state",
        value: formData?.stateService?.value || "",
      },
      designator: {
        label: formData?.designator?.label || "Select any",
        value: formData?.designator?.value || "",
      },
      postal_code: formData?.postal_code || "",

      businessType: {
        label: formData?.businessType?.label || "Select type",
        value: formData?.businessType?.value || "",
      },

      businessPurpose: formData?.businessPurpose || "",
      activeTab2: formData?.activeTab2 || 0,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      streetAddress: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      // address: Yup.string(),
      postal_code: Yup.string()
        .required("Required")
        .max(5, "Max five characters"),
      stateFormation: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      entityType: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      designator: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      state: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      businessType: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),

      businessPurpose: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(
        updateSingle({
          id: idOrder,
          serviceDetails: {
            name: singleOrderName,
            details: {
              ...values,
            },
          },
        })
      )
    },
  })

  const [designator, setDesignator] = useState([])

  return (
    <div className={styles.wrap}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>Business License Research</h1>
              {/* <p className={styles.tagline}>
                A business license is a document or permit issued by a
                government agency that allows an individual or business to
                legally conduct business in a particular jurisdiction. A
                business license typically grants the holder the right to
                operate a business within the government’s geographical
                jurisdiction and to offer certain goods or services for sale.
                <br />
                Depending on the type of license, a business may have to pay a
                fee, obtain a tax number, and/or provide certain types of
                insurance, before the license is issued. With Filthy Rich Idea,
                this process is fast and easy.
              </p> */}
            </div>
            <div className={styles.contactinformation}>
              <h2 className={styles.title}>Contact Information</h2>
              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>First Name *</p>
                    <input
                      placeholder="First Name *"
                      name="firstName"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <span className="error-message">
                      {formik.errors.firstName}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Last Name *</p>
                    <input
                      placeholder="Last Name *"
                      name="lastName"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <span className="error-message">
                      {formik.errors.lastName}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Email *</p>
                    <input
                      placeholder="Email *"
                      name="email"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    <span className="error-message">{formik.errors.email}</span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Mobile Phone *</p>
                    <PhoneInput
                      international
                      autoComplete="off"
                      // country="us"
                      className={styles.phone}
                      value={formik.values.phone}
                    />
                    <span className="error-message">{formik.errors.phone}</span>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.companyinformation}>
              <h2 className={styles.title}>Company Information</h2>
              <div className={styles.cardblock}>
                <div className={styles.card}>
                  <img src={icon} alt="icons" />
                  <div className={styles.textblock}>
                    <p className={styles.subtitle}>
                      The state of formation is the jurisdiction where a
                      business was legally established, while the state of
                      service is the location in which the company seeks to be
                      operate with customers.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.form1}>
                    <p className={styles.subtitle}>Entity Type *</p>
                    <Select
                      options={entityOptions}
                      placeholder="Select Entity Type"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.entityType}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          entityType: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      name="entityType"
                      id="entityType"
                      isDisabled
                    />
                    <span className="error-message">
                      {formik.errors.entityType?.value}
                    </span>
                  </div>
                  <div className={styles.form2}>
                    <div className="d-flex align-items-center justify-content-between">
                      <p className={styles.subtitle}>State Of Formation *</p>
                      <ButtonToolbar>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              The state of formation is the jurisdiction where a
                              business was legally established.
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
                      options={stateOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.stateFormation}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          stateFormation: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      name="stateFormation"
                      id="stateFormation"
                      isDisabled
                    />
                    <span className="error-message">
                      {formik.errors.stateFormation?.value}
                    </span>
                  </div>
                  <div className={styles.formCompanyName}>
                    <p className={styles.subtitle}>Company Name *</p>
                    <div className={styles.formInpWrapper}>
                      <input
                        placeholder="Company Name *"
                        className={styles.input}
                        name="companyName"
                        autoComplete="off"
                        type="text"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="error-message">
                        {formik.errors.companyName}
                      </span>
                    </div>
                  </div>
                  {/* <div className={styles.form3}>
                    <p className={styles.subtitle}>Designator *</p>
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
                        dispatch(addItem(e))
                      }}
                      onBlur={formik.handleBlur}
                      name="designator"
                      id="designator"
                    />
                    <span className="error-message">
                      {formik.errors.designator?.value}
                    </span>
                  </div> */}
                  <Designator
                    formik={formik}
                    designator={designator}
                    setDesignator={setDesignator}
                  />

                  {formik.values.companyName &&
                    formik.values.designator.value && (
                      <div className="w-100">
                        <CompanyPreview
                          name={formik.values.companyName}
                          designator={formik.values.designator.label}
                        />
                      </div>
                    )}
                  <div className={styles.businessTypeSelect}>
                    <p className={styles.subtitle}>
                      Business Type / Industry *
                    </p>
                    <Select
                      options={industryOption}
                      placeholder="Select Business Type / Industry"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.businessType}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          businessType: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      name="businessType"
                      id="businessType"
                    />
                    <span className="error-message">
                      {formik.errors.businessType?.value}
                    </span>
                  </div>
                  <div className={styles.businessPurpose}>
                    <p className={styles.subtitle}>Business Purpose *</p>
                    <textarea
                      placeholder="Please describe the purpose of your business."
                      name="businessPurpose"
                      value={formik.values.businessPurpose}
                      onChange={(e) => {
                        formik.handleChange(e)
                      }}
                    />
                    <span className="error-message">
                      {formik.errors.businessPurpose}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.companyaddress}>
              <h2 className={styles.title}>Company Address</h2>
              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Street Address *</p>
                    <input
                      placeholder="Street Address *"
                      name="streetAddress"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.streetAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.streetAddress}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Address (Cont)</p>
                    <input
                      placeholder="Address (Cont)"
                      name="address"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.address}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>City *</p>
                    <input
                      placeholder="City *"
                      name="city"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">{formik.errors.city}</span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Select State *</p>
                    <Select
                      options={companyAddressOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.state}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          state: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      name="state"
                      id="state"
                    />
                    <span className="error-message">
                      {formik.errors.state?.value}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Zip Code *</p>
                    <input
                      placeholder="Zip Code *"
                      name="postal_code"
                      autoComplete="off"
                      type="text"
                      className={styles.inputzip}
                      value={formik.values.postal_code}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.postal_code}
                    </span>
                  </div>
                </form>
              </div>
            </div>
            {(singleService?.standardFees === 0 ||
              singleService?.standardFees) && (
              <div className={styles.detailCardWrapper}>
                <DetailCard title="State Filing Time">
                  <div className={styles.detailCardDesciption}>
                    If you don't need your documents filed quickly, you can use
                    the standard filing option, which will typically take 6 - 7
                    days business days. If you need it in a hurry, we offer
                    expedited filing options.
                  </div>
                  <div className={styles.tabBtnsWrapper}>
                    {(singleService?.standardFees === 0 ||
                      singleService?.standardFees) && (
                      <div
                        className={styles.tabBtn}
                        role="button"
                        onClick={() => {
                          formik.setValues({
                            ...formik.values,
                            activeTab2: 0,
                          })
                          dispatch(
                            removeFromCart({
                              name: `Filing`,
                              label: `Filing fee`,
                              value: `Filing fee`,
                              // price: Number(fillingFee?.filingFeesNormal),
                              id: `Filing`,
                              parentName: `Filing`,
                            })
                          )
                          dispatch(addPrice())
                        }}
                        tabIndex={0}
                      >
                        <div>
                          <Form.Check
                            inline
                            name="checkbox123"
                            type="radio"
                            checked={
                              formik.values?.activeTab2 === 0 ? true : ""
                            }
                          />
                        </div>
                        <div>
                          <h6>6 - 7 Business Days</h6>
                          <p>Estimated Completion Date:</p>
                          <p>
                            {moment(
                              date.setDate(date.getDate() + Number(7))
                            ).format("MMM Do ")}
                          </p>
                          <h6>
                            Price: <b>${singleService?.standardFees}</b>
                          </h6>
                        </div>
                      </div>
                    )}
                    {singleService?.towDayFees && (
                      <div
                        className={styles.tabBtn}
                        role="button"
                        onClick={() => {
                          formik.setValues({
                            ...formik.values,
                            activeTab2: 1,
                          })
                          dispatch(
                            addItem({
                              name: `Filing`,
                              label: `Filing fee`,
                              value: `Filing fee`,
                              price: Number(singleService?.towDayFees),
                              id: `Filing`,
                              parentName: `Filing`,
                            })
                          )
                          dispatch(addPrice())
                        }}
                        tabIndex={0}
                      >
                        <div>
                          <Form.Check
                            inline
                            name="checkbox123"
                            type="radio"
                            checked={
                              formik.values?.activeTab2 === 1 ? true : ""
                            }
                          />
                        </div>
                        <div>
                          <h6>2 Business Days</h6>
                          <p>Estimated Completion Date: </p>
                          <p>
                            <b>
                              <span>
                                {moment(
                                  date2.setDate(date2.getDate() + Number(2))
                                ).format("MMM Do")}
                              </span>
                            </b>
                          </p>
                          <h6>
                            Price: <b>${singleService?.towDayFees}</b>
                          </h6>
                        </div>
                        <div className={styles.fastTag}>FAST</div>
                      </div>
                    )}
                    {singleService?.oneDayFees && (
                      <div
                        className={styles.tabBtn}
                        role="button"
                        onClick={() => {
                          formik.setValues({
                            ...formik.values,
                            activeTab2: 2,
                          })
                          dispatch(
                            addItem({
                              name: `Filing`,
                              label: `Filing fee`,
                              value: `Filing fee`,
                              price: Number(singleService?.oneDayFees),
                              id: `Filing`,
                              parentName: `Filing`,
                            })
                          )
                          dispatch(addPrice())
                        }}
                        tabIndex={0}
                      >
                        <div>
                          <Form.Check
                            inline
                            name="checkbox123"
                            type="radio"
                            checked={
                              formik.values?.activeTab2 === 2 ? true : ""
                            }
                          />
                        </div>
                        <div>
                          <h6>1 Business Day</h6>
                          <p>Estimated Completion Date: </p>
                          <p>
                            <b>
                              <span>
                                {moment(
                                  date3.setDate(date3.getDate() + Number(1))
                                ).format("MMM Do")}
                              </span>
                            </b>
                          </p>
                          <h6>
                            Price: <b>${singleService?.oneDayFees}</b>
                          </h6>
                        </div>
                        <div className={styles.fastTag}>FAST</div>
                      </div>
                    )}
                  </div>
                  <div className={styles.detailCardDesciption}>
                    These dates are estimations based on current state turn
                    around times and are subject to change based on state
                    processing.
                  </div>
                </DetailCard>
              </div>
            )}

            {edit && (
              <div className={styles.nextBtnWrapper}>
                <Button
                  className={styles.btn}
                  disabled={
                    Object.keys(formik.errors).length !== 0 || isLoading
                  }
                  onClick={() => formik.handleSubmit()}
                >
                  {isLoading ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <>Update</>
                  )}
                </Button>
              </div>
            )}
          </Col>{" "}
          {/* <Col lg={12}>
            <PriceSection />
          </Col> */}{" "}
        </Row>
      </Container>
    </div>
  )
}

export default BusinessLicenseForm
