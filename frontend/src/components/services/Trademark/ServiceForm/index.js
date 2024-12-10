import React, { useEffect, useState } from "react"
import {
  Col,
  Container,
  Row,
  Button,
  Spinner,
  Form,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import { BsArrowRightShort } from "react-icons/bs"
import moment from "moment"
import { AiFillDelete, AiOutlineQuestionCircle } from "react-icons/ai"
import PhoneInput from "react-phone-input-2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"
import styles from "./ServiceForm.module.scss"
import icon from "../../../../images/services/articlesofamendment/icon.svg"
import { entityOptions } from "../../../../utils/helpers"
import {
  addItem,
  addPrice,
  removeFromCart,
} from "../../../../_features/cartSlice"
import { routes } from "../../../../routes"
import PriceSection from "../../../common/PriceSection"
import DetailCard from "../../../businessDetails/common/DetailCard"
import InputField from "../../../businessDetails/common/InputField"
import exampleLogo from "../../../../images/services/trademark/demo-design-logo.jpg"
import CompanyPreview from "../../../common/CompanyPreview"
import Designator from "../../../common/Designator"
import CardInfo from "../../../businessDetails/common/CardInfo"
import { einData } from "../../../../utils/helper2"

function ArticlesOfAmendment() {
  const company = useSelector((state) => state?.company)
  const userData = useSelector((state) => state?.auth?.userData)
  const userToken = useSelector((state) => state?.auth?.userToken)
  const statesRed = useSelector((state) => state?.common?.state)
  const singleService = useSelector((state) => state?.common?.selectedService)
  const [designator, setDesignator] = useState([])
  const dispatch = useDispatch()
  const serviceData = JSON.parse(localStorage.getItem("serviceDetails")) || {}
  const formData =
    serviceData?.serviceId === singleService?._id
      ? JSON.parse(localStorage.getItem("formDetails"))
      : {}

  const date = new Date()
  const date2 = new Date()
  const date3 = new Date()

  const [inputFields, setInputFields] = useState(
    formData?.memberList || [
      {
        key: 1,
        required: true,
        firstName: "",
        lastName: "",
        uniqueKey: 1,
      },
      {
        key: 2,
        required: true,
        firstName: "",
        lastName: "",
        uniqueKey: 2,
      },
    ]
  )

  const handleFormChange = (index, event) => {
    const data = [...inputFields]

    data[index][event.target.name] = event.target.value
    data[index]["required"] = false
    setInputFields(data)
    if (
      data[index].firstName.length !== 0 &&
      data[index].lastName.length !== 0
    ) {
      data[index]["required"] = true
      setInputFields(data)
    }
  }
  const addButton = () => {
    setInputFields([
      ...inputFields,
      {
        key: inputFields.length + 1,
        required: true,
        firstName: "",
        lastName: "",
        uniqueKey: inputFields.length + 1,
      },
    ])
  }
  const removeItem = (item) => {
    if (inputFields.length <= 2) {
      return toast.error("Members Should not be less then 2")
    }
    const arrayCopy = inputFields.filter(
      (e) => e?.uniqueKey !== item?.uniqueKey
    )

    setInputFields([...arrayCopy])
  }

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
  // const [activeTab, setActiveTab] = useState(null)
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
      activeTab: formData?.activeTab || 0,
      activeTab2: formData?.activeTab2 || 0,

      businessName: formData?.bushinessName || "",
      slogan: formData?.slogan || "",
      markTags: formData?.markTags || "",
      sound: formData?.sound || "",
      proofSound: formData?.proofSound || "",
      soundq1: formData?.soundq1 || "",
      soundq2: formData?.soundq2 || "",
      soundq3: formData?.soundq3 || "",
      soundq4: formData?.soundq4 || "",
      usingMark: formData?.usingMark || "yes",
      usingMark2: formData?.usingMark2 || "yes",
      agree: formData?.agree || "",
      ownsTradeMark: formData?.ownsTradeMark || "",
      trademarkCompany: formData?.trademarkCompany || "",
      trademarkFirstName: formData?.trademarkFirstName || "",
      trademarkLastName: formData?.trademarkLastName || "",
      trademarkMonitor: formData?.trademarkMonitor || "no",
    },

    validationSchema: Yup.object({
      ownsTradeMark: Yup.string().required("Required"),
      trademarkCompany: Yup.string().when("ownsTradeMark", {
        is: "Company",
        then: Yup.string().required("Required"),
      }),
      trademarkFirstName: Yup.string().when("ownsTradeMark", {
        is: "One Person",
        then: Yup.string().required("Required"),
      }),
      trademarkLastName: Yup.string().when("ownsTradeMark", {
        is: "One Person",
        then: Yup.string().required("Required"),
      }),
      streetAddress: Yup.string().required("Required"),
      streetAddress2: Yup.string().required("Required"),

      city: Yup.string().required("Required"),
      city2: Yup.string().required("Required"),
      // address: Yup.string().required("Required"),
      postal_code: Yup.string()
        .required("Required")
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
        .max(5, "Max five characters"),
      postal_code2: Yup.string()
        .required("Required")
        .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
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
      state2: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      companyName: Yup.string().required("Required"),
      businessName: Yup.string().when("activeTab", {
        is: 0,
        then: Yup.string().required("Required"),
      }),
      slogan: Yup.string().when("activeTab", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      markTags: Yup.string().required("Required"),
      agree: Yup.boolean().required("Required"),
    }),
    onSubmit: async (values) => {
      if (formik.values.ownsTradeMark === "Multiple People") {
        const a = inputFields.find(
          (e) => e.firstName.trim() === "" || e.lastName.trim() === ""
        )
        if (a !== undefined)
          toast.error("Please fill all required  information")
        if (a !== undefined) return
      }
      localStorage.setItem(
        "serviceDetails",
        JSON.stringify({
          name: singleService?.title,
          serviceId: singleService._id,
        })
      )
      localStorage.setItem(
        "formDetails",
        JSON.stringify({ ...values, memberList: [...inputFields] })
      )

      navigate(`${routes.amendmentServicePayment}`, {
        state: {
          service: {
            name: singleService?.title,
            serviceId: singleService._id,
            serviceDetails: {
              ...values,
              memberList: [...inputFields],
            },
          },
        },
      })
    },
  })

  const anotheroptions = [
    {
      label: "Individual",
      id: 10,
      value: "Individual",
      price: 20,
      priceData: [],
    },
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
      label: "Limited Partnership",
      id: 13,
      value: "Limited Partnership",
      price: 20,
      priceData: [],
    },
    {
      label: "Joint Venture",
      id: 14,
      value: "Joint Venture",
      price: 20,
      priceData: [],
    },
    {
      label: "Trust",
      id: 15,
      value: "Trust",
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
              <h1 className={styles.heading}>Register a Trademark</h1>
              <p className={styles.tagline}>
                A business trademark is a symbol, phrase, or word that is used
                to identify and distinguish the goods or services of one
                business from those of another. An example of a trademark is the
                Nike Swoosh, which is used to identify Nike sports apparel and
                equipment. Another example is Apple‘s logo, which is used to
                identify the company‘s computers, phones, and tablets. Business
                trademarks are protected by law, giving the business the
                exclusive right to use the mark and to prevent others from using
                it without permission.
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
              <h2 className={styles.title}>Entity Information</h2>
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

                  <div className={`mt-3 ${styles.tradeMarkSubtitle}`}>
                    <div className={`mt-3 ${styles.tradeMarkSubtitle}`}>
                      Is a company filing this trademark application?
                    </div>{" "}
                  </div>
                  <div className={`ms-3 my-4 ${styles.radioCheckBoxWapper}`}>
                    <Form.Check
                      inline
                      label="Yes"
                      name="checkbox123"
                      checked={formik.values.usingMark2 === "yes"}
                      type="radio"
                      onChange={() =>
                        formik.setValues({
                          ...formik.values,
                          usingMark2: "yes",
                        })
                      }
                      className="me-5"
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="checkbox123"
                      checked={formik.values.usingMark2 === "no"}
                      type="radio"
                      onChange={() =>
                        formik.setValues({ ...formik.values, usingMark2: "no" })
                      }
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.companyaddress}>
              <h2 className={styles.title}>Mailing Address</h2>
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

            <div className={styles.companyaddress}>
              <h2 className={styles.title}>Domicile Address</h2>
              <div className={styles.formblock}>
                <form className={styles.form}>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Street Address *</p>
                    <input
                      placeholder="Street Address *"
                      name="streetAddress2"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.streetAddress2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.streetAddress2}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Address (Cont)</p>
                    <input
                      placeholder="Address (Cont)"
                      name="address2"
                      autoComplete="off"
                      type="text"
                      className={styles.input}
                      value={formik.values.address2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.address2}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>City *</p>
                    <span className="error-message">
                      <input
                        placeholder="City *"
                        name="city2"
                        autoComplete="off"
                        type="text"
                        className={styles.input}
                        value={formik.values.city2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.city2}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Select State *</p>
                    <Select
                      options={companyAddressOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.state2}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          state2: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      name="state2"
                      id="state"
                    />
                    <span className="error-message">
                      {formik.errors.state2?.value}
                    </span>
                  </div>
                  <div className={styles.formInpWrapper}>
                    <p className={styles.subtitle}>Zip Code *</p>
                    <input
                      placeholder="Zip Code *"
                      name="postal_code2"
                      autoComplete="off"
                      type="text"
                      className={styles.inputzip}
                      value={formik.values.postal_code2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="error-message">
                      {formik.errors.postal_code2}
                    </span>
                  </div>
                </form>
              </div>
            </div>

            <DetailCard title="Trademark Information">
              <div
                className={`${styles.tradeMarkSubtitle} d-flex align-items-center justify-content-between`}
              >
                Please select the appropriate type of trademark.
                <ButtonToolbar>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        Your trademark won’t register until you provide proof of
                        use.
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
              <div className={styles.tabsWrapper}>
                <div className={styles.tabBtnsWrapper}>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        slogan: "",
                        activeTab: 0,
                      })
                    }
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        name="slogan"
                        checked={formik.values.activeTab === 0 ? "checked" : ""}
                      />
                    </div>
                    <div>
                      <p>Name</p>
                    </div>
                  </div>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        bushinessName: "",
                        activeTab: 1,
                      })
                    }
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        name="slogan"
                        checked={formik.values.activeTab === 1 ? "checked" : ""}
                      />
                    </div>
                    <div>
                      <p>Slogan</p>
                    </div>
                  </div>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        slogan: "",
                        activeTab: 2,
                      })
                    }
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        name="slogan"
                        checked={formik.values.activeTab === 2 ? "checked" : ""}
                      />
                    </div>
                    <div>
                      <p>Design/Logo</p>
                    </div>
                  </div>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        sound: "",
                        activeTab: 3,
                      })
                    }
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        name="sound"
                        checked={formik.values.activeTab === 3 ? "checked" : ""}
                      />
                    </div>
                    <div>
                      <p>Sound</p>
                    </div>
                  </div>
                </div>
                {formik.values.activeTab === 0 ? (
                  <div className={styles.tabsContentWrapper}>
                    <div className={styles.tradeMarkSubtitle}>
                      Please write out the NAME EXACTLY as you want it to appear
                      on the application.
                    </div>
                    <div>
                      <InputField
                        label="BUSINESS NAME"
                        name="businessName"
                        value={formik.values.businessName}
                        error={formik.errors.businessName}
                        onChange={formik.handleChange}
                        type="text"
                        placeholder="i.e Wendy’s, BMW, Adidas

                        "
                      />
                    </div>
                  </div>
                ) : formik.values.activeTab === 1 ? (
                  <div className={styles.tabsContentWrapper}>
                    <div className={styles.tabsWrapper}>
                      <div className={styles.tradeMarkSubtitle}>
                        Please write out the SLOGAN EXACTLY as you want it to
                        appear on the application.
                      </div>
                      <div>
                        <InputField
                          label="SLOGAN"
                          name="slogan"
                          value={formik.values.slogan}
                          error={formik.errors.slogan}
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="i.e Just Do It, Have It Your Way, The Quicker Picker Upper

                          "
                        />
                      </div>
                    </div>
                  </div>
                ) : formik.values.activeTab === 2 ? (
                  <div className={styles.tabsContentWrapper}>
                    <div className={styles.tabsWrapper}>
                      {/* <div className={styles.tradeMarkSubtitle}></div> */}
                      <div className={styles.tradeMarkLogoExample}>
                        Example:{" "}
                        <img className="ms-2" src={exampleLogo} alt="" />
                      </div>
                    </div>
                  </div>
                ) : formik.values.activeTab === 3 ? (
                  <div className="mt-3">
                    <InputField
                      label={`Click on the "Browse/Choose File" button to select the image/sound/motion file`}
                      type="file"
                      sound={true}
                      id="inpFile2"
                      placeholder="Select "
                      name="sound"
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          sound: e.target.files,
                        })
                      }}
                    />
                    {formik?.values?.sound.length > 0 && (
                      <div>{formik.values?.sound[0]?.name}</div>
                    )}
                    <div>
                      <div
                        className={`${styles.tradeMarkSubtitle} d-flex align-items-center justify-content-between mt-4`}
                      >
                        Additional Statement
                      </div>
                      <ul>
                        <li>Claim of prior registration(s)</li>
                        <li>Translation</li>
                        <li>Transliteration</li>
                        <li>Consent of individual identified in mark</li>
                        <li>Concurrent use claim</li>
                      </ul>
                      <div>
                        <small>
                          <b>Note</b> You are not required to enter any other
                          statement(s) at the time of filing; however, you may
                          be required to add a statement(s) to the record during
                          examination of the application. If you are unsure
                          whether you should make such a statement, besides
                          those specifically identified above, the examining
                          attorney assigned to your application will issue a
                          requirement, if appropriate.
                        </small>
                      </div>
                    </div>
                    <div className="mt-4">
                      <InputField
                        label={`PLEASE UPLOAD PROOF OF USE.`}
                        type="file"
                        sound={true}
                        id="inpFile3"
                        placeholder="Select "
                        name="proofSound"
                        onChange={(e) => {
                          formik.setValues({
                            ...formik.values,
                            proofSound: e.target.files,
                          })
                        }}
                      />
                      {formik?.values?.proofSound?.length > 0 && (
                        <div>{formik.values?.proofSound[0]?.name}</div>
                      )}

                      <div className="mt-2">
                        <InputField
                          label="If your specimen consists of a webpage, provide the webpage URL:"
                          name="soundq1"
                          value={formik.values.soundq1}
                          error={formik.errors.soundq1}
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Url

                        "
                        />
                      </div>
                      <div className="mt-2">
                        <InputField
                          label="Describe the specimen that was uploaded."
                          name="soundq2"
                          value={formik.values.soundq2}
                          error={formik.errors.soundq2}
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Type here

                        "
                        />
                      </div>
                      <div className="mt-2">
                        <InputField
                          type="date"
                          name="soundq3"
                          value={formik.values.soundq3}
                          onChange={(e) =>
                            formik.setValues({
                              ...formik.values,
                              soundq3: e.target.value,
                            })
                          }
                          label={"Date of first use of mark anywhere"}
                          placeholder="Type here"
                        />
                      </div>
                      <div className="mt-2">
                        <InputField
                          type="date"
                          name="soundq4"
                          value={formik.values.soundq4}
                          onChange={(e) =>
                            formik.setValues({
                              ...formik.values,
                              soundq4: e.target.value,
                            })
                          }
                          label={"Date of first use of mark in commerce:"}
                          placeholder="Type here"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div
                className={`${styles.tradeMarkSubtitle} d-flex align-items-center justify-content-between mt-4`}
              >
                Who owns the trademark?
              </div>
              <p className="error-message">{formik.errors?.ownsTradeMark}</p>
              <div className={styles.tabsWrapper}>
                <div className={styles.tabBtnsWrapper}>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() => {
                      formik.setValues({
                        ...formik.values,
                        ownsTradeMark: "Company",
                        trademarkCompany: "",
                        trademarkFirstName: "",
                        trademarkLastName: "",
                      })
                      setInputFields([
                        {
                          key: 1,
                          required: true,
                          firstName: "",
                          lastName: "",
                          uniqueKey: 1,
                        },
                        {
                          key: 2,
                          required: true,
                          firstName: "",
                          lastName: "",
                          uniqueKey: 2,
                        },
                      ])
                    }}
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        value="Company"
                        name="ownsTradeMark"
                        checked={
                          formik.values.ownsTradeMark === "Company"
                            ? "checked"
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <p>Company</p>
                    </div>
                  </div>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() => {
                      setInputFields([
                        {
                          key: 1,
                          required: true,
                          firstName: "",
                          lastName: "",
                          uniqueKey: 1,
                        },
                        {
                          key: 2,
                          required: true,
                          firstName: "",
                          lastName: "",
                          uniqueKey: 2,
                        },
                      ])
                      formik.setValues({
                        ...formik.values,
                        ownsTradeMark: "One Person",
                        trademarkCompany: "",
                        trademarkFirstName: "",
                        trademarkLastName: "",
                      })
                    }}
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        value="One Person"
                        name="ownsTradeMark"
                        checked={
                          formik.values.ownsTradeMark === "One Person"
                            ? "checked"
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <p>One Person</p>
                    </div>
                  </div>
                  <div
                    className={styles.tabBtn}
                    role="button"
                    onClick={() => {
                      formik.setValues({
                        ...formik.values,
                        ownsTradeMark: "Multiple People",
                        trademarkCompany: "",
                        trademarkFirstName: "",

                        trademarkLastName: "",
                      })
                      setInputFields([
                        {
                          key: 1,
                          required: true,
                          firstName: "",
                          lastName: "",
                          uniqueKey: 1,
                        },
                        {
                          key: 2,
                          required: true,
                          firstName: "",
                          lastName: "",
                          uniqueKey: 2,
                        },
                      ])
                    }}
                    tabIndex={0}
                  >
                    <div>
                      <Form.Check
                        inline
                        value="Multiple People"
                        name="ownsTradeMark"
                        checked={
                          formik.values.ownsTradeMark === "Multiple People"
                            ? "checked"
                            : ""
                        }
                      />
                    </div>
                    <div>
                      <p>Multiple People</p>
                    </div>
                  </div>
                </div>
                {formik.values.ownsTradeMark === "Company" ? (
                  <div className={styles.tabsContentWrapper}>
                    <div className={styles.tradeMarkSubtitle}>
                      Enter the exact legal spelling for your company name
                    </div>
                    <div>
                      <InputField
                        label="Company Name"
                        name="trademarkCompany"
                        value={formik.values.trademarkCompany}
                        error={formik.errors.trademarkCompany}
                        onChange={formik.handleChange}
                        type="text"
                        placeholder="Company Name

                        "
                      />
                    </div>
                  </div>
                ) : formik.values.ownsTradeMark === "One Person" ? (
                  <div className={styles.tabsContentWrapper}>
                    <div className={styles.tabsWrapper}>
                      <div className={styles.tradeMarkSubtitle}>
                        Trademark applicant’s name
                      </div>
                      <div>
                        <InputField
                          label="First Name"
                          name="trademarkFirstName"
                          value={formik.values.trademarkFirstName}
                          error={formik.errors.trademarkFirstName}
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="FirstName

                          "
                        />
                      </div>

                      <div className="mt-3">
                        <InputField
                          label="Last Name"
                          name="trademarkLastName"
                          value={formik.values.trademarkLastName}
                          error={formik.errors.trademarkLastName}
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Last Name

                          "
                        />
                      </div>
                    </div>
                  </div>
                ) : formik.values.ownsTradeMark === "Multiple People" ? (
                  <div className={styles.tabsContentWrapper}>
                    <div className={styles.tabsWrapper}>
                      {/* <div className={styles.tradeMarkSubtitle}></div> */}
                      <div className={styles.tradeMarkLogoExample}>
                        Enter the exact legal spelling of the applicants’ names.
                        {inputFields.map((e, i) => (
                          <React.Fragment key={i}>
                            <div
                              style={{
                                fontWeight: "800",
                                color: "#4e4e4e",
                                fontSize: "18px",
                                margin: "10px 0",
                              }}
                            >
                              {" "}
                              Applicant No #{i + 1}
                              <AiFillDelete
                                color="#d4b768"
                                cursor="pointer"
                                onClick={() => removeItem(e)}
                              />
                            </div>
                            <div>
                              <InputField
                                label="First Name"
                                name="firstName"
                                value={e?.firstName}
                                error={
                                  e?.required === false ? "Required" : null
                                }
                                onChange={(el) => handleFormChange(i, el)}
                                type="text"
                                placeholder="FirstName

                          "
                              />
                            </div>

                            <div className="mt-3">
                              <InputField
                                label="Last Name"
                                name="lastName"
                                value={e?.lastName}
                                error={
                                  e?.required === false ? "Required" : null
                                }
                                onChange={(el) => handleFormChange(i, el)}
                                type="text"
                                placeholder="Last Name

                          "
                              />
                            </div>
                          </React.Fragment>
                        ))}
                        <Button
                          className="mt-5"
                          style={{
                            background: "#d4b768",
                            outline: "none",
                            border: 0,
                          }}
                          onClick={() => addButton()}
                        >
                          Add more
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className={`mt-3 ${styles.tradeMarkSubtitle}`}>
                The trademark covers a range of goods and services, including
                but not limited to clothing, footwear, headwear, accessories,
                cosmetics, home goods, jewelry, furniture, textiles, and online
                retail services. Please list the range of goods and services
                offered by the mark.
              </div>
              <div className={styles.productInpField}>
                <InputField
                  name="markTags"
                  type="text"
                  value={formik.values.markTags}
                  error={formik.errors.markTags}
                  onChange={formik.handleChange}
                  placeholder="i.e headwear, home goods, shoes, etc

                  "
                />
              </div>
              <div className={`mt-3 ${styles.tradeMarkSubtitle}`}>
                <div className={`mt-3 ${styles.tradeMarkSubtitle}`}>
                  Are you currently using the mark?
                </div>{" "}
              </div>
              <div className={`ms-3 my-4 ${styles.radioCheckBoxWapper}`}>
                <Form.Check
                  inline
                  label="Yes"
                  name="checkbox"
                  checked={formik.values.usingMark === "yes"}
                  type="radio"
                  onChange={() =>
                    formik.setValues({ ...formik.values, usingMark: "yes" })
                  }
                  className="me-5"
                />
                <Form.Check
                  inline
                  label="No"
                  name="checkbox"
                  checked={formik.values.usingMark === "no"}
                  type="radio"
                  onChange={() =>
                    formik.setValues({ ...formik.values, usingMark: "no" })
                  }
                />
              </div>
              <hr />
            </DetailCard>
            <DetailCard title="Protect Your Trademark With Monitoring">
              <p
                className="my-2"
                style={{ fontSize: "16px", color: "#4e4e4e" }}
              >
                Your trademark is a representation of your brand. Unless given
                permission, no one is allowed to use by law. We will monitor
                your trademark and alert you when it is infringed upon.
              </p>
              <div>
                <CardInfo title="Why is this important?">
                  <br />
                  Common law rights are available if you are already using your
                  trademark. The rights are available to you even if you have
                  not yet registered the trademark. <br /> Tracking its usage is
                  important because it gives you the power to challenge the
                  unauthorized user in court.
                  <br /> <br />
                  Your trademark registration give you full nationwide rights
                  and allows you to challenge similar marks that may be created
                  in the future. <br /> <br /> Don’t let your trademark’s value
                  get tarnished by an unauthorized user or earn someone else
                  money. Be proactive and monitor your trademark.
                </CardInfo>
              </div>
              {einData.protectTradeMark.map((e, i) => (
                <div key={i} className="mt-3">
                  <h4 style={{ color: "#1d1d1d", fontSize: "20px" }}>
                    {e?.title}
                  </h4>
                  <p style={{ fontSize: "16px", color: "#4e4e4e" }}>
                    {e?.description}
                  </p>
                </div>
              ))}
              <CardInfo>
                Trademark Monitoring costs $150 per year. It renews
                automatically each year unless you cancel by sending an email to
                billing@filthyrichidea.com.
              </CardInfo>
              <div className={`mt-3 ${styles.tradeMarkSubtitle}`}>
                Do you need Trademark Monitoring?
              </div>{" "}
              <div className={`ms-3 my-4 ${styles.radioCheckBoxWapper}`}>
                <Form.Check
                  inline
                  label="Add Trademark Monitoring"
                  name="trademarkMonitor"
                  checked={formik.values.trademarkMonitor === "yes"}
                  type="radio"
                  onChange={() => {
                    formik.setValues({
                      ...formik.values,
                      trademarkMonitor: "yes",
                    })
                    dispatch(
                      addItem({
                        name: `Trademark Monitoring`,
                        label: `Trademark Monitoring fee`,
                        value: `Trademark Monitoring fee`,
                        price: 150,
                        id: `Trademark Monitoring`,
                        parentName: `Trademark Monitoring`,
                      })
                    )
                    dispatch(addPrice())
                  }}
                  className="me-5"
                />
                <Form.Check
                  inline
                  label=" No Thanks"
                  name="trademarkMonitor"
                  checked={formik.values.trademarkMonitor === "no"}
                  type="radio"
                  onChange={() => {
                    formik.setValues({
                      ...formik.values,
                      trademarkMonitor: "no",
                    })
                    dispatch(
                      removeFromCart({
                        name: `Trademark Monitoring`,
                        label: `Trademark Monitoring fee`,
                        value: `Trademark Monitoring fee`,
                        price: 150,
                        id: `Trademark Monitoring`,
                        parentName: `Trademark Monitoring`,
                      })
                    )
                    dispatch(addPrice())
                  }}
                />
              </div>
              <div className={`mt-5 ${styles.agreeWithPolicy}`}>
                <Form.Check
                  inline
                  label={
                    <a
                      href="https://filthyrichidea.com/fri-policy-agreements/"
                      target="_blank"
                    >
                      I Agree To The Trademark Policy.
                    </a>
                  }
                  checked={formik.values.agree}
                  onChange={() =>
                    formik.setValues({
                      ...formik.values,
                      agree: !formik.values.agree,
                    })
                  }
                  name="agree"
                  type="checkbox"
                />
              </div>
            </DetailCard>

            {/* {(singleService?.standardFees === 0 ||
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
            )} */}

            <div className={styles.nextBtnWrapper}>
              <Button
                className={styles.btn}
                disabled={
                  Object.keys(formik.errors).length !== 0 ||
                  !formik.values.agree
                }
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
    </div>
  )
}

export default ArticlesOfAmendment
