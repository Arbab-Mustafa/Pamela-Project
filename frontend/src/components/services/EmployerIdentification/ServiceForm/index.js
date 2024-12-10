import React, { useEffect, useState } from "react"
import {
  Col,
  Container,
  Row,
  Button,
  Spinner,
  Form,
  ButtonToolbar,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import PhoneInput from "react-phone-input-2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ReactInputMask from "react-input-mask"
import moment from "moment"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"
import styles from "./ServiceForm.module.scss"
import { designatorOptions, entityOptions } from "../../../../utils/helpers"
import {
  addItem,
  addPrice,
  removeFromCart,
} from "../../../../_features/cartSlice"
import { routes } from "../../../../routes"
import PriceSection from "../../../common/PriceSection"
import InputField from "../../../businessDetails/common/InputField"
import DetailCard from "../../../businessDetails/common/DetailCard"
import CardInfo from "../../../businessDetails/common/CardInfo"
import CustomSelect from "../../../businessDetails/common/CustomSelect"
import CompanyPreview from "../../../common/CompanyPreview"
import PopUp from "../../../businessDetails/common/PopUp"
import Designator from "../../../common/Designator"
import { einData } from "../../../../utils/helper2"

function ArticlesOfAmendment() {
  const [showPopUp, setShowPopUp] = useState(false)
  const [showPopUp2, setShowPopUp2] = useState(false)

  const [designator, setDesignator] = useState([])
  const company = useSelector((state) => state?.company)
  const userData = useSelector((state) => state?.auth?.userData)
  const userToken = useSelector((state) => state?.auth?.userToken)
  const statesRed = useSelector((state) => state?.common?.state)
  const singleService = useSelector((state) => state?.common?.selectedService)

  const serviceData = JSON.parse(localStorage.getItem("serviceDetails")) || {}
  const formData =
    serviceData?.serviceId === singleService?._id
      ? JSON.parse(localStorage.getItem("formDetails"))
      : {}

  const date = new Date()
  const date2 = new Date()
  const date3 = new Date()
  const dispatch = useDispatch()

  const date5 = new Date()
  const NO_FUTURE_DATE = `${date5.getFullYear()}-${
    date5.getMonth() + 1 > 9 ? date5.getMonth() + 1 : `0${date5.getMonth() + 1}`
  }-${date5.getDate() > 9 ? date5.getDate() : `0${date5.getDate()}`}`

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

      designator: {
        label: formData?.designator?.label || "Select any",
        value: formData?.designator?.value || "",
      },
      postal_code: formData?.postal_code || "",

      dateOfFormation: formData?.dateOfFormation || "",
      newContactCheckbox:
        formData?.newContactCheckbox === false
          ? false
          : formData?.newContactCheckbox === true
          ? true
          : false,
      newContactCheckbox2:
        formData?.newContactCheckbox2 === false
          ? false
          : formData?.newContactCheckbox2 === true
          ? true
          : false,
      newContactFirstName: formData?.newContactFirstName || "",
      newContactLastName: formData?.newContactLastName || "",
      newCompanyCheckbox:
        formData?.newCompanyCheckbox === false
          ? false
          : formData?.newCompanyCheckbox === true
          ? true
          : false,
      newCompanyAddress: formData?.newCompanyAddress || "",
      newCompanyCity: formData?.newCompanyCity || "",
      newCompanyState: {
        label: formData?.newCompanyState?.label || "Select any",
        value: formData?.newCompanyState?.value || "",
      },
      newCompanyZipcode: formData?.newCompanyZipcode || "",
      einNumberType: formData?.einNumberType || "SSN",
      question4: formData?.question4 || "No",
      einNumber: formData?.einNumber || "",
      question4einNumber: formData?.question4einNumber || "",
      foreignIndividual:
        formData?.foreignIndividual === false
          ? false
          : formData?.foreignIndividual === true
          ? true
          : false,
      organizationDo: formData?.organizationDo || "",
      organizationDo2: formData?.organizationDo2 || "",
      noOfEmp: formData?.noOfEmp || "",
      question1:
        formData?.question1 === false
          ? false
          : formData?.question1 === true
          ? true
          : false,
      question2: formData?.question2 || " ",
      newBusinessPurpose: formData?.newBusinessPurpose || "",
      activeTab2: formData?.activeTab2 || 0,
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      noOfEmp: Yup.string().required("Required"),
      organizationDo: Yup.string().required("Required"),
      organizationDo2: Yup.string().required("Required"),
      newBusinessPurpose: Yup.string().required("Required"),
      question2: Yup.string().required("Required"),

      streetAddress: Yup.string().required("Required"),
      city: Yup.string().required("Required"),

      einNumber: Yup.string().when("foreignIndividual", {
        is: false,
        then: Yup.string().required("Required"),
      }),

      question4einNumber: Yup.string().when("question4", {
        is: "Yes",
        then: Yup.string().required("Required"),
      }),
      postal_code: Yup.string()
        .required("Required")
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
        .max(5, "Max five characters"),
      newContactFirstName: Yup.string().required("Required"),
      newContactLastName: Yup.string().required("Required"),
      newCompanyAddress: Yup.string().required("Required"),

      newCompanyCity: Yup.string().required("Required"),
      newCompanyZipcode: Yup.string()
        .required("Required")
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
        .max(5, "Max five characters"),
      designator: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      stateFormation: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      entityType: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      state: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      newCompanyState: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      dateOfFormation: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      localStorage.setItem(
        "serviceDetails",
        JSON.stringify({
          name: singleService?.title,
          serviceId: singleService._id,
        })
      )
      localStorage.setItem("formDetails", JSON.stringify(values))

      navigate(`${routes.amendmentServicePayment}`, {
        state: {
          service: {
            name: singleService?.title,
            serviceId: singleService._id,
            serviceDetails: {
              ...values,
            },
          },
        },
      })
    },
  })

  const anotheroptions = [
    {
      label: "Sole Proprietorship",
      id: 11,
      value: "Sole Proprietorship",
      price: 20,
      priceData: [],
    },
    {
      label: "Partnership",
      id: 12,
      value: "Partnership",
      price: 20,
      priceData: [],
    },
    {
      label: "Church",
      id: 15,
      value: "Church",
      price: 20,
      priceData: [],
    },
    {
      label: "Estate",
      id: 16,
      value: "Estate",
      price: 20,
      priceData: [],
    },
  ]
  return (
    <div className={styles.wrap}>
      <Container>
        <Row>
          <Col lg={8}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>
                Federal Employer Identification Number EIN / Tax ID Number
              </h1>
              <p className={styles.tagline}>
                An Employer Identification Number (EIN) is a unique number
                issued by the IRS to businesses for the purpose of filing taxes.
                It is also known as a Federal Employer Identification Number
                (FEIN), Employer Identification Number (EIN), or Federal Tax
                Identification Number. This number is used to identify a
                business entity and serves a similar purpose to an individual's
                Social Security Number. Unlike SSNs, EINs are less sensitive and
                thus can be used more widely on government forms and documents,
                which reduces the risk of identity theft. With Filthy Rich Idea,
                this process is fast and easy.
              </p>
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
              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.form1}>
                    <p className={styles.subtitle}>Entity Type *</p>
                    <Select
                      options={[...entityOptions, ...anotheroptions]}
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
                    />
                    <span className="error-message">
                      {formik.errors.stateFormation?.value}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <InputField
                      type="date"
                      name="dateOfFormation"
                      value={formik.values.dateOfFormation}
                      onChange={(e) =>
                        formik.setValues({
                          ...formik.values,
                          dateOfFormation: e.target.value,
                        })
                      }
                      label="Date Of Formation *"
                      max={NO_FUTURE_DATE}
                    />
                    <span className="error-message">
                      {formik.errors.dateOfFormation}
                    </span>
                  </div>

                  <div
                    className="w-100 d-flex  flex-wrap"
                    style={{ gap: "38px" }}
                  >
                    <div className={styles.formCompanyName} style={{ flex: 1 }}>
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
                  </div>

                  <div>
                    <p className={`mt-5 ${styles.subtitle}`}>
                      Choose one reason that best describes why you are applying
                      for an EIN. <br />
                    </p>
                    <p className="error-message">
                      {formik.errors.organizationDo2}
                    </p>
                  </div>
                  <div
                    className={`ms-3 my-3 ${styles.ssnCheckWrapper} d-flex align-items-center flex-wrap justify-content-flex-start`}
                  >
                    {einData?.organizationDo2?.map((item, index) => (
                      <div key={index} style={{ width: "100%" }}>
                        <Form.Check
                          inline
                          key={index}
                          value={item?.title}
                          label={
                            <>
                              <ButtonToolbar>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip>{item?.tooltip}</Tooltip>}
                                >
                                  <a
                                    href={item?.link ? item?.link : "/"}
                                    className="d-block"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {item?.title}
                                  </a>
                                </OverlayTrigger>
                              </ButtonToolbar>
                            </>
                          }
                          type="radio"
                          checked={
                            formik.values?.organizationDo2 === item.title
                              ? true
                              : false
                          }
                          onChange={(el) =>
                            formik.setValues({
                              ...formik.values,
                              organizationDo2: el?.target.value,
                            })
                          }
                          name="organizationDo2"
                          className="mb-3 me-5 d-block"
                          // style={{ flex: "0 0 40%" }}
                          style={{ display: "block" }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <InputField
                      name="noOfEmp"
                      type="number"
                      label={
                        "Highest number of employees expected in the next 12 months (enter -0- if none)."
                      }
                      onChange={formik.handleChange}
                      value={formik.values.noOfEmp}
                      error={formik?.errors?.noOfEmp}
                    />
                  </div>
                  <div className={`mb-4 ${styles.inpCheckWrapper}`}>
                    <Form.Check
                      inline
                      checked={formik.values.question1}
                      value={formik.values.question1}
                      onChange={(e) =>
                        e.target.checked
                          ? formik.setValues({
                              ...formik.values,
                              question1: true,
                            })
                          : formik.setValues({
                              ...formik.values,
                              question1: false,
                            })
                      }
                      label="If you expect your employment tax liability to be $1,000 or less in a full calendar year and want to file Form 944 annually instead of Forms 941 quarterly, check here. (Your employment tax liability will generally be $1,000 or less if you expect to pay $5,000 or less, $6,536 or less if you’re in a U.S. territory, in total wages.) If you don’t check this box, you must file Form 941 for every quarter"
                      name="question1"
                      type="checkbox"
                      className="me-5"
                    />
                  </div>
                  <div>
                    <InputField
                      name="question2"
                      type="text"
                      label={
                        "Indicate principal line of merchandise sold, specific construction work done, products produced, or services provided."
                      }
                      onChange={formik.handleChange}
                      value={formik.values.question2}
                      error={formik?.errors?.question2}
                    />
                  </div>
                  <div>
                    {
                      <>
                        <p className={`mt-5 ${styles.subtitle}`}>
                          Has the applicant entity shown on line 1 ever applied
                          for and received an EIN?
                        </p>
                        <div className={`ms-3 my-3 ${styles.ssnCheckWrapper}`}>
                          <Form.Check
                            inline
                            label="Yes"
                            name="checkbox2232322321234"
                            type="radio"
                            className="me-5"
                            onChange={() =>
                              formik.setValues({
                                ...formik.values,
                                question4: "Yes",
                                question4einNumber: "",
                              })
                            }
                            checked={
                              formik.values?.question4 === "Yes" ? true : false
                            }
                          />
                          <Form.Check
                            inline
                            label="NO"
                            name="checkbox2232322321234"
                            type="radio"
                            onChange={() =>
                              formik.setValues({
                                ...formik.values,
                                question4: "No",
                                question4einNumber: "",
                              })
                            }
                            checked={
                              formik.values?.question4 === "No" ? true : false
                            }
                          />
                        </div>
                        {formik.values?.question4 === "Yes" && (
                          <div className={styles.inpFieldSSn}>
                            <p>Add previous EIN</p>
                            <ReactInputMask
                              mask="99-9999999"
                              name="question4einNumber"
                              maskChar=""
                              className="custom-input"
                              onChange={(e) => {
                                if (formik.values?.question4 === "Yes") {
                                  if (
                                    !e.target.value.startsWith("9") &&
                                    formik.values.question4einNumber.length ===
                                      0
                                  ) {
                                    return formik.setErrors({
                                      question4einNumber:
                                        "Number should start with 9 ",
                                    })
                                  }
                                }
                                formik.setValues({
                                  ...formik.values,
                                  question4einNumber: e.target.value,
                                })
                              }}
                              value={formik.values?.question4einNumber}
                            />
                            <span className="error-message">
                              {formik.errors.question4einNumber}
                            </span>
                          </div>
                        )}
                      </>
                    }
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
                    <p className={styles.subtitle}>City *</p>
                    <span className="error-message">
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
                      {formik.errors.city}
                    </span>
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
            <DetailCard title="SS4 Questions">
              <p className={styles.subtitle}>
                Please answer these questions so that we may prepare the SS4
                Form to obtain an EIN (Employer Identification Number,
                frequently called a Tax ID number).
                <br />
                <br />
                Name of principal officer or owner
                <br />
                <br />
              </p>
              <div className={`mb-4 ${styles.inpCheckWrapper}`}>
                <Form.Check
                  inline
                  checked={formik.values.newContactCheckbox}
                  value={formik.values.newContactCheckbox}
                  onChange={(e) =>
                    e.target.checked
                      ? formik.setValues({
                          ...formik.values,
                          newContactCheckbox: true,
                          newContactFirstName: formik.values.firstName,
                          newContactLastName: formik.values.lastName,
                        })
                      : formik.setValues({
                          ...formik.values,
                          newContactCheckbox: false,
                          newContactFirstName: "",
                          newContactLastName: "",
                        })
                  }
                  label="Use Contact Name"
                  name="newContactCheckbox"
                  type="checkbox"
                  className="me-5"
                />
              </div>
              <div className={styles.detailCardFieldsWrapper}>
                <div className={styles.inpField}>
                  <InputField
                    label="First Name *"
                    type="text"
                    name="newContactFirstName"
                    value={
                      formik.values.newContactCheckbox
                        ? formik.values.firstName
                        : formik.values.newContactFirstName
                    }
                    onChange={formik.handleChange}
                    disabled={formik.values.newContactCheckbox}
                  />
                  <span className="error-message">
                    {formik.errors.newContactFirstName}
                  </span>
                </div>
                <div className={styles.inpField}>
                  <InputField
                    label="Last Name *"
                    type="text"
                    name="newContactLastName"
                    value={
                      formik.values.newContactCheckbox
                        ? formik.values.lastName
                        : formik.values.newContactLastName
                    }
                    onChange={formik.handleChange}
                    disabled={formik.values.newContactCheckbox}
                  />
                  <span className="error-message">
                    {formik.errors.newContactLastName}
                  </span>
                </div>
              </div>
              <CardInfo>
                To ensure that delivery of your order is not delayed, please
                make sure the details you give are correct. Please make sure the
                name you provide is spelled precisely as it appears on your
                social security card.
              </CardInfo>
              <p className={`mt-5 ${styles.subtitle}`}>
                I am a foreign person and do not have a U.S. social security
                number.
              </p>
              <div className={`ms-3 my-3 ${styles.ssnCheckWrapper}`}>
                <Form.Check
                  inline
                  label="Yes"
                  type="radio"
                  checked={
                    formik.values?.foreignIndividual === true ? true : false
                  }
                  onChange={() => setShowPopUp2(!showPopUp2)}
                  name="checkbox"
                  className="me-5"
                />
                <Form.Check
                  inline
                  label="No"
                  name="checkbox"
                  type="radio"
                  checked={
                    formik.values?.foreignIndividual === false ? true : false
                  }
                  onChange={() =>
                    formik.setValues({
                      ...formik.values,
                      foreignIndividual: false,
                      einNumberType: "SSN",
                      einNumber: "",
                    })
                  }
                />
              </div>
              {formik.values?.foreignIndividual === false && (
                <>
                  <p className={`mt-5 ${styles.subtitle}`}>
                    Identification number by which I will obtain the EIN.
                  </p>
                  <div className={`ms-3 my-3 ${styles.ssnCheckWrapper}`}>
                    <Form.Check
                      inline
                      label="ITIN"
                      name="checkbox2"
                      type="radio"
                      className="me-5"
                      onChange={() => {
                        setShowPopUp(!showPopUp)
                      }}
                      checked={
                        formik.values?.einNumberType === "ITIN" ? true : false
                      }
                    />
                    <Form.Check
                      inline
                      label="SSN"
                      name="checkbox2"
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
                  <div className={styles.inpFieldSSn}>
                    <ReactInputMask
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
                    <span className="error-message">
                      {formik.errors.einNumber}
                    </span>
                  </div>
                </>
              )}

              <p className={`mt-5 ${styles.subtitle}`}>
                Select this option if you are beginning a new business. *
              </p>
              <p className="error-message">
                {formik.errors.newBusinessPurpose}
              </p>

              <div
                className={`ms-3 my-3 ${styles.ssnCheckWrapper} d-flex align-items-center flex-wrap justify-content-flex-start`}
              >
                {einData?.newBusinessPurpose?.map((e, index) => (
                  <Form.Check
                    inline
                    key={index}
                    value={e?.title}
                    label={
                      <>
                        <ButtonToolbar>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{e?.tooltip}</Tooltip>}
                          >
                            <div>{e?.title}</div>
                          </OverlayTrigger>
                        </ButtonToolbar>
                      </>
                    }
                    type="radio"
                    checked={
                      formik.values?.newBusinessPurpose === e?.title
                        ? true
                        : false
                    }
                    onChange={(el) =>
                      formik.setValues({
                        ...formik.values,
                        newBusinessPurpose: el?.target.value,
                      })
                    }
                    name="newBusinessPurpose"
                    className="mb-3 me-5 d-block"
                    style={{ flex: "0 0 40%" }}
                  />
                ))}
              </div>

              <p className={`mt-5 ${styles.subtitle}`}>
                What does your business or organization do?
                <br />
                Choose one category *
                <br />
              </p>
              <p className="error-message">{formik.errors.organizationDo}</p>
              <div
                className={`ms-3 my-3 ${styles.ssnCheckWrapper} d-flex align-items-center flex-wrap justify-content-flex-start`}
              >
                {einData?.organizationDo?.map((item, index) => (
                  <Form.Check
                    inline
                    key={index}
                    value={item?.title}
                    label={
                      <>
                        <ButtonToolbar>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>{item?.tooltip}</Tooltip>}
                          >
                            <a
                              href={item?.link ? item?.link : "/"}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item?.title}
                            </a>
                          </OverlayTrigger>
                        </ButtonToolbar>
                      </>
                    }
                    type="radio"
                    checked={
                      formik.values?.organizationDo === item.title
                        ? true
                        : false
                    }
                    onChange={(el) =>
                      formik.setValues({
                        ...formik.values,
                        organizationDo: el?.target.value,
                      })
                    }
                    name="organizationDo"
                    className="mb-3 me-5 d-block"
                    style={{ flex: "0 0 40%" }}
                  />
                ))}
              </div>
            </DetailCard>
            <DetailCard title="Physical Street Address">
              <p className={styles.subtitle}>
                The IRS will only provide an Employer Identification Number (EIN
                / Tax ID Number) for your company if you can provide them with a
                physical address. They do not accept PO Boxes for this purpose.
                However, this address is kept private and confidential. It will
                not be made public information.
                <br />
                <br />
              </p>
              <div className={`mb-4 ${styles.inpCheckWrapper}`}>
                <Form.Check
                  inline
                  checked={formik.values.newContactCheckbox2}
                  value={formik.values.newContactCheckbox2}
                  onChange={(e) =>
                    e.target.checked
                      ? formik.setValues({
                          ...formik.values,
                          newContactCheckbox2: true,
                          newCompanyAddress: formik.values.streetAddress,
                          newCompanyState: formik.values.state,
                          newCompanyZipcode: formik.values.postal_code,
                          newCompanyCity: formik.values.city,
                        })
                      : formik.setValues({
                          ...formik.values,
                          newContactCheckbox2: false,
                          newCompanyAddress: "",
                          newCompanyState: "",
                          newCompanyZipcode: "",
                          newCompanyCity: "",
                        })
                  }
                  label="Use Company Address"
                  name="newCompanyCheckbox"
                  type="checkbox"
                  className="me-5"
                />
              </div>
              <div className={styles.detailCardFieldsWrapper}>
                <div className={styles.inpField}>
                  <InputField
                    label="Street Address"
                    type="text"
                    name="newCompanyAddress"
                    value={formik.values.newCompanyAddress}
                    onChange={formik.handleChange}
                    disabled={formik.values.newContactCheckbox2}
                  />
                  <span className="error-message">
                    {formik.errors.newCompanyAddress}
                  </span>
                </div>
                <div className={styles.inpField}>
                  <InputField
                    label="City"
                    type="text"
                    name="newCompanyCity"
                    value={formik.values.newCompanyCity}
                    onChange={formik.handleChange}
                    disabled={formik.values.newContactCheckbox2}
                  />
                  <span className="error-message">
                    {formik.errors.newCompanyCity}
                  </span>
                </div>
                <div className={styles.inpField}>
                  <CustomSelect
                    label="State"
                    name="state"
                    placeholder="Select State"
                    options={stateOptions}
                    value={formik.values.newCompanyState}
                    onChange={(e) => {
                      return { ...formik.values, newCompanyState: e }
                    }}
                    isDisabled={formik.values.newContactCheckbox2}
                  />
                  <span className="error-message">
                    {formik.errors.newCompanyState?.value}
                  </span>
                </div>
                <div className={styles.inpField}>
                  <InputField
                    label="Zip Code"
                    type="text"
                    name="newCompanyZipcode"
                    value={formik.values.newCompanyZipcode}
                    onChange={formik.handleChange}
                    disabled={formik.values.newContactCheckbox2}
                  />
                  <span className="error-message">
                    {formik.errors.newCompanyZipcode}
                  </span>
                </div>
              </div>
            </DetailCard>
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
                  {/* <div className={styles.detailCardDesciption}>
                    These dates are estimations based on current state turn
                    around times and are subject to change based on state
                    processing.
                  </div> */}
                </DetailCard>
              </div>
            )}

            <div className={styles.nextBtnWrapper}>
              <Button
                className={styles.btn}
                disabled={Object.keys(formik.errors).length !== 0}
                onClick={() => formik.handleSubmit()}
              >
                {company?.isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <>
                    Next
                    <BsArrowRightShort className={styles.icon} />
                  </>
                )}
              </Button>
            </div>
          </Col>
          <Col lg={4}>
            <PriceSection />
          </Col>
        </Row>
      </Container>

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
      <PopUp
        show={showPopUp2}
        centered="centered"
        handleClose={() => setShowPopUp2(!showPopUp2)}
      >
        <div className="popupWrapper">
          <div className="popupHeader">Confirm</div>
          <div className="popupBody">
            <h6>
              I am a foreign person and do not have a U.S. social security
              number.
            </h6>
          </div>
          <div className="popupFooter">
            <Button
              className="popupBtnPrimary"
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  foreignIndividual: true,
                  einNumberType: "",
                  einNumber: "",
                })
                setShowPopUp2(!showPopUp2)
              }}
            >
              I Agree
            </Button>
            <Button
              className="popupBtnSecondary"
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  foreignIndividual: false,
                  einNumberType: "SSN",
                  einNumber: "",
                })
                setShowPopUp2(!showPopUp2)
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

export default ArticlesOfAmendment
