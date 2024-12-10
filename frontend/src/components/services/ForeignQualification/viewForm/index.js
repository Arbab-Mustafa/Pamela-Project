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
import { AiOutlineQuestionCircle } from "react-icons/ai"
import PhoneInput from "react-phone-input-2"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import moment from "moment"
import ReactInputMask from "react-input-mask"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"
import styles from "./ServiceForm.module.scss"
import { entityOptions } from "../../../../utils/helpers"
import {
  addItem,
  addPrice,
  removeFromCart,
} from "../../../../_features/cartSlice"
import { routes } from "../../../../routes"
import PriceSection from "../../../common/PriceSection"
import InputField from "../../../businessDetails/common/InputField"
import CardInfo from "../../../businessDetails/common/CardInfo"
import CustomSelect from "../../../businessDetails/common/CustomSelect"
import DetailCard from "../../../businessDetails/common/DetailCard"
import tickIcon from "../../../../images/services/amendment/need/tick.svg"
import free from "../../../../images/startBusiness/free-first-year.svg"
import guaranteed from "../../../../images/startBusiness/guaranteed-rates.svg"
import reduce from "../../../../images/startBusiness/reduce-junk.svg"
import inclusive from "../../../../images/startBusiness/all-inclusive.svg"
import CompanyPreview from "../../../common/CompanyPreview"
import OfferCard from "../../../businessDetails/common/OfferCard/OfferCard"
import Designator from "../../../common/Designator"
import { useData } from "../../../../utils/helper2"
import { updateSingle } from "../../../../_features/ordersSlice"

function ForeignQualificationForm({ edit }) {
  const [designator, setDesignator] = useState([])
  const company = useSelector((state) => state?.company)
  const userData = useSelector((state) => state?.auth?.userData)
  const userToken = useSelector((state) => state?.auth?.userToken)
  const statesRed = useSelector((state) => state?.common?.state)

  const [address, setAddress] = useState(false)
  const singleService = useSelector((state) => state?.common?.selectedService)

  const serviceData = JSON.parse(localStorage.getItem("serviceDetails")) || {}
  const singleOrder = useSelector(
    (state) => state?.orders?.singleOrder?.serviceDetails?.details
  )
  const formData = singleOrder || {}
  const [inputFields, setInputFields] = useState(formData?.memberList || [])
  const date = new Date()
  const date2 = new Date()
  const date3 = new Date()
  const singleOrderName = useSelector(
    (state) => state?.orders?.singleOrder?.serviceDetails?.name
  )
  const idOrder = useSelector((state) => state?.orders?.singleOrder?._id)
  const isLoading = useSelector((state) => state?.orders?.isLoading)

  const dispatch = useDispatch()

  const membersOptions = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
  ]

  const registerBenifits = [
    {
      icon: free,
      title: `$59 First Year
      `,
      para: `All initial orders of incorporation services come with one year of Registered Agent service for merely $59. The service will automatically renew every 12 months, but you can cancel anytime by substituting your agent and notifying us.`,
    },
    {
      icon: guaranteed,
      title: "Convenience",
      para: `Filthy Rich Idea provides a comprehensive service that allows businesses to easily and quickly complete the necessary registration paperwork. This eliminates the need for businesses to spend time researching and filing the paperwork.
`,
    },
    {
      icon: inclusive,
      title: "Cost Savings",

      para: `Filthy Rich Idea offers a flat rate for an annual registered agent service, whereas a traditional registered agent may charge a monthly fee and additional fees for additional services. This can result in significant cost savings for businesses.
`,
    },
    {
      icon: reduce,
      title: "Accessibility",
      para: `Filthy Rich Idea’s registered agent service is available 24/7. This gives businesses the ability to receive and respond to legal documents quickly.
`,
    },
    {
      icon: reduce,
      title: "Security",
      para: `Filthy Rich Idea’s registered agent service provides businesses with a secure, reliable way to receive important documents. This ensures that all documents are received in a timely manner and are securely stored.
`,
    },
  ]

  const stateOptions = statesRed?.map((value) => {
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
  const agentInfo = {
    agentFirstName: formData?.agentFirstName || "",
    agentLastName: formData?.agentLastName || "",
    agentAddress: formData?.agentAddress || "",
    agentStreetAddress: formData?.agentStreetAddress || "",
    agentCity: formData?.agentCity || "",
    agentState: {
      label: formData?.agentState?.label || "Select",
      value: formData.agentState?.value || "",
    },
    agentZipcode: formData?.agentZipcode || "",
    agentCompanyName: formData?.agentCompanyName || "",
  }

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
      businessPurpose: formData?.businessPurpose || "",
      sosQuestion: formData?.sosQuestion || "",
      exactlyName: formData?.exactlyName || "",
      einNumberType: formData?.einNumberType || "SSN",
      einNumber: formData?.einNumber || "",
      foreignIndividual:
        formData?.foreignIndividual === false
          ? false
          : formData?.foreignIndividual === true
          ? true
          : false,
      agentRegistered:
        formData?.agentRegistered === false
          ? false
          : formData?.agentRegistered === true
          ? true
          : true,
      ...agentInfo,
      activeTab: formData?.activeTab || 0,
      activeTab2: formData?.activeTab2 || 0,

      members:
        {
          label: inputFields?.length === 0 ? "Select " : inputFields?.length,
          value: inputFields?.length === 0 ? "" : inputFields?.length,
        } || "",
      businessType: {
        label: formData?.businessType?.label || "Select any",
        value: formData?.businessType?.value || "",
      },
      // activeTab: 0,
      agent: formData?.agent || "Company Registered Agent",
      registerInnerTab: formData?.registerInnerTab || 0,
      registerTab: formData?.registerTab || 0,
      paidAddress:
        formData?.paidAddress === false
          ? false
          : formData?.paidAddress === true
          ? true
          : true,
      paidUserAddress: formData?.paidUserAddress || "",
      paidUserStreetAddress: formData?.paidUserStreetAddress || "",
      PaidUserCity: formData?.PaidUserCity || "",
      PaidUserState: {
        label: formData?.PaidUserState?.label || "Select any",
        value: formData?.PaidUserState?.value || "",
      },
      PaidUserZipcode: formData?.PaidUserZipcode || "",

      ...agentInfo,
    },
    validationSchema: Yup.object({
      PaidUserZipcode: Yup.string().when("paidAddress", {
        is: false,
        then: Yup.string()
          .required("Required")
          .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
          .max(5, "Max five characters"),
      }),

      PaidUserCity: Yup.string().when("paidAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      paidUserStreetAddress: Yup.string().when("paidAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      PaidUserState: Yup.object().when("paidAddress", {
        is: false,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),

      einNumber: Yup.string().when("foreignIndividual", {
        is: false,
        then: Yup.string().required("Required").min(10, "9 digits Required"),
      }),
      sosQuestion: Yup.string().required("Required"),
      agentFirstName: Yup.string().when("registerTab", {
        is: 1,
        then: Yup.string().when("registerInnerTab", {
          is: 0,
          then: Yup.string().required("Required"),
        }),
      }),

      agentLastName: Yup.string().when("registerTab", {
        is: 1,
        then: Yup.string().when("registerInnerTab", {
          is: 0,
          then: Yup.string().required("Required"),
        }),
      }),

      agentStreetAddress: Yup.string().when("registerTab", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      agentCity: Yup.string().when("registerTab", {
        is: 1,
        then: Yup.string().required("Required"),
      }),
      agentZipcode: Yup.string().when("registerTab", {
        is: 1,
        then: Yup.string()
          .required("Required")
          .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid postal code")
          .max(5, "Max five characters"),
      }),
      agentState: Yup.object().when("registerTab", {
        is: 1,
        then: Yup.object().shape({
          value: Yup.string().required("Required"),
        }),
      }),
      agentCompanyName: Yup.string().when("registerTab", {
        is: 1,
        then: Yup.string().when("registerInnerTab", {
          is: 1,
          then: Yup.string().required("Required"),
        }),
      }),

      businessType: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),

      stateFormation: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      entityType: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      designator: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),

      stateService: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      members: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      companyName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (
        formik.values.stateFormation.label === formik.values.stateService.label
      ) {
        // window.scroll({
        //   top: 0,
        //   behavior: "smooth",
        // })
        return formik.setErrors({
          stateService: {
            value: `State Of Formation Qualification * cannot be the same as the State Of Formation `,
          },
          stateFormation: {
            value: `State Of Formation  * cannot be the same as the State Of Formation  Qualification`,
          },
        })
      }
      if (formik.values.members.value !== 0) {
        const a = inputFields.find((e) =>
          e.activeTab === 0
            ? e.firstName.trim() === "" ||
              e.lastName.trim() === "" ||
              e.postal_code === "" ||
              e.state?.value.trim() === "" ||
              e.addressStreet.trim() === "" ||
              e.city.trim() === ""
            : e.activeTab === 1
            ? e.companyName.trim() === "" ||
              e.state?.value.trim() === "" ||
              e.postal_code === "" ||
              e.addressStreet.trim() === ""
            : ""
        )
        if (a !== undefined) toast.error("Please fill  members information")
        if (a !== undefined) return
      }
      dispatch(
        updateSingle({
          id: idOrder,
          serviceDetails: {
            name: singleOrderName,
            details: {
              ...values,
              memberList: [...inputFields],
            },
          },
        })
      )
    },
  })
  console.log(formik.errors)
  const handleFormChange = (index, event) => {
    const data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
  }

  useEffect(() => {
    const arrayCopy = Array.from({
      length: formik.values.members?.value,
    }).map((e, i) => {
      return {
        // key: i,
        // activeTab: 0,
        // companyName: "",
        // firstName: "",
        // lastName: "",
        // postal_code: "",
        // address: "",
        // addressStreet: "",
        // city: "",
        key: inputFields[i]?.i || i,
        uniqueKey: inputFields[i]?.i || i,
        activeTab: inputFields[i]?.activeTab || 0,
        companyName: inputFields[i]?.companyName || "",
        firstName: inputFields[i]?.firstName || "",
        lastName: inputFields[i]?.lastName || "",
        postal_code: inputFields[i]?.postal_code || "",
        address: inputFields[i]?.address || "",
        addressStreet: inputFields[i]?.addressStreet || "",
        city: inputFields[i]?.city || "",
        state: {
          label: inputFields[i]?.state?.label || "Select state",
          value: inputFields[i]?.state?.value || "",
        },
      }
    })
    setInputFields([...arrayCopy])
  }, [formik.values.members?.value])

  const removeItem = (item) => {
    const arrayCopy = inputFields.filter(
      (e) => e?.uniqueKey !== item?.uniqueKey
    )
    formik.setValues({
      ...formik.values,
      members: {
        value: arrayCopy?.length === 0 ? "" : arrayCopy?.length,
        label: arrayCopy?.length === 0 ? "Select " : arrayCopy?.length,
      },
    })

    setInputFields([...arrayCopy])
  }

  React.useEffect(() => {
    if (formik.values.stateService.value) {
      const getAddress = useData.virtualAddress.find(
        (e) =>
          e.state.toLowerCase() ===
          formik.values.stateService.value?.toLowerCase()
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
  }, [formik.values.stateService.value])

  return (
    <div className={styles.wrap}>
      <Container>
        <Row>
          <Col lg={12}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>
                Foreign Qualification / Certificate of Authority
              </h1>
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
                      isDisabled
                      id="stateFormation"
                    />
                    <span className="error-message">
                      {formik.errors.stateFormation?.value}
                    </span>
                  </div>
                  <div className={styles.form3}>
                    <p className={styles.subtitle}>
                      State Of Formation Qualification *
                    </p>
                    <Select
                      options={stateOptions}
                      placeholder="Select State"
                      className="react-select-container"
                      classNamePrefix="react-select"
                      value={formik.values.stateService}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          stateService: e,
                        })
                      }}
                      onBlur={formik.handleBlur}
                      isDisabled
                    />
                    <span className="error-message">
                      {formik.errors.stateService?.value}
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
                  <div className="w-100">
                    <p className={styles.subtitle}>
                      Tell us what industry your business is in? *
                      <br />
                      <br />
                      Realizing the sector you are operating in can be
                      beneficial when filing specific documents with the state,
                      as well as when applying for contracts and financing.
                    </p>
                  </div>
                  <div className="w-100">
                    <div className={styles.form1}>
                      <p className={styles.subtitle}>Enter Business Type</p>
                      <Select
                        options={industryOption}
                        placeholder="Enter Business Type"
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
                    {formik.values.businessType.value && (
                      <div className="w-100">
                        <CompanyPreview
                          name={formik.values.businessType.value}
                          businessType
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={styles.formCompanyName}
                    style={{ maxWidth: "100%" }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <p className={styles.subtitle}>
                        What is the SOS Entity Number?
                      </p>
                      <ButtonToolbar>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              This is the identification number assigned to your
                              entity by the Secretary of State (or other
                              corporation filing office) in the state of
                              formation.
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
                    <div className={styles.formInpWrapper}>
                      <InputField
                        placeholder="Sos"
                        value={formik.values.sosQuestion}
                        onChange={formik.handleChange}
                        error={formik.errors.sosQuestion}
                        name="sosQuestion"
                        className={styles.input}
                        autoComplete="off"
                        type="text"
                      />
                      {/* <span className="error-message"></span> */}
                    </div>
                  </div>
                  <div
                    className={styles.formCompanyName}
                    style={{ maxWidth: "100%" }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <p className={styles.subtitle}>
                        What is the business EIN?
                      </p>
                    </div>
                    <div className={styles.formInpWrapper}>
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
                      {/* <span className="error-message"></span> */}
                    </div>
                  </div>
                </form>
                <CardInfo>
                  The <b>state of formation</b> is where the company was formed,
                  while the <b>state of service</b> is where you are seeking to
                  obtain authority to transact business.
                </CardInfo>
              </div>
            </div>
            <div className={styles.companyAddressWrapper}>
              {address && (
                <DetailCard title="Company Address Information">
                  <p className={styles.detailCardDesciption}>
                    It is advisable to utilize our Business Address service if
                    you wish to retain your privacy. The registration paperwork
                    can make the address of the business and the personal
                    address of the owners publicly accessible.
                    <br />
                    <br />
                    Advantages of using our Business Mailbox service.
                    <ul className={styles.detailCardList}>
                      <li>
                        <img src={tickIcon} alt="tick" />
                        <span>
                          Protect your personal details from being disclosed.
                        </span>
                      </li>
                      <li>
                        {" "}
                        <img src={tickIcon} alt="tick" />
                        <span>
                          Get real-time notifications when mail arrives.
                        </span>
                      </li>
                      <li>
                        <img src={tickIcon} alt="tick" />
                        <span>
                          Maintain a physical presence even though you are not
                          physically at that address.
                        </span>
                      </li>
                      <li>
                        {" "}
                        <img src={tickIcon} alt="tick" />
                        <span>
                          Have access to your correspondence from any place in
                          the world.
                        </span>
                      </li>
                      <li>
                        {" "}
                        <img src={tickIcon} alt="star" />
                        <span>
                          Receive messages from governmental agencies such as
                          the Secretary of State.
                        </span>
                      </li>
                    </ul>
                  </p>

                  <>
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
                  </>

                  {!formik.values.paidAddress && (
                    <DetailCard>
                      <p className={styles.detailCardDesciption}>
                        Please provide the address you would like listed as your
                        company address.
                      </p>
                      <div className={styles.detailCardFieldsWrapper}>
                        <div className={styles.inpField}>
                          <InputField
                            label="Street Address"
                            name="paidUserStreetAddress"
                            type="text"
                            value={formik.values.paidUserStreetAddress}
                            error={formik.errors.paidUserStreetAddress}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className={styles.inpField}>
                          <InputField
                            label="Address (Cont)"
                            name="paidUserAddress"
                            type="text"
                            value={formik.values.paidUserAddress}
                            error={formik.errors.paidUserAddress}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className={styles.inpField}>
                          <InputField
                            label="City"
                            name="PaidUserCity"
                            type="text"
                            value={formik.values.PaidUserCity}
                            error={formik.errors.PaidUserCity}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className={styles.inpField}>
                          <CustomSelect
                            label="State"
                            name="PaidUserState"
                            options={stateOptions}
                            placeholder=""
                            value={formik.values.PaidUserState}
                            onChange={(e) => {
                              formik.setValues({
                                ...formik.values,
                                PaidUserState: e,
                              })
                            }}
                          />
                          <span className="error-message">
                            {formik.errors.PaidUserState?.value}
                          </span>
                        </div>
                        <div className={styles.inpField}>
                          <InputField
                            label="Zip Code"
                            name="PaidUserZipcode"
                            type="text"
                            value={formik.values.PaidUserZipcode}
                            error={formik.errors.PaidUserZipcode}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                    </DetailCard>
                  )}
                </DetailCard>
              )}
            </div>
            <div className={styles.registerStepWrapper}>
              <DetailCard title="Registered Agent Information">
                <div className={styles.detailCardDesciption}>
                  <h5>
                    {formik.values?.stateFormation?.label} requires all entities
                    to appoint a Registered Agent:
                  </h5>
                  <div className={styles.subTitleList}>
                    <div className={styles.listIcon}>
                      <img src={tickIcon} alt="tick" />
                    </div>
                    <div className={styles.listText}>
                      All states demand that businesses designate a
                      representative based in the state to receive official
                      documents.
                    </div>
                  </div>
                  <div className={styles.subTitleList}>
                    <div className={styles.listIcon}>
                      <img src={tickIcon} alt="tick" />
                    </div>
                    <div className={styles.listText}>
                      Businesses must name a person or organization within the
                      state to act as their legal contact.
                    </div>
                  </div>
                  <CardInfo>
                    A registered agent is an individual or entity designated to
                    receive legal documents on behalf of a business. Our
                    registered agents will be available during regular business
                    hours to receive service of process notices, official
                    government correspondence, and other legal notices served on
                    the business. We make it our responsibility to forward these
                    documents in a timely manner to your business.
                  </CardInfo>
                  <h5 className="mt-3">
                    Typical documents delivered to your Registered Agent can
                    include:
                  </h5>
                  <div className={styles.subTitleList}>
                    <div className={styles.listIcon}>
                      <img src={tickIcon} alt="tick" />
                    </div>
                    <div className={styles.listText}>
                      Service of Process, i.e. notice of a lawsuit or court
                      order
                    </div>
                  </div>
                  <div className={styles.subTitleList}>
                    <div className={styles.listIcon}>
                      <img src={tickIcon} alt="tick" />
                    </div>
                    <div className={styles.listText}>
                      Communications from the state, i.e. yearly reports or
                      advisories
                    </div>
                  </div>
                  <div className={styles.subTitleList}>
                    <div className={styles.listIcon}>
                      <img src={tickIcon} alt="tick" />
                    </div>
                    <div className={styles.listText}>
                      Notifications of Mergers, Purchases, and Dissolutions
                      *Legal documents, i.e. forms related to a business entity
                    </div>
                  </div>
                </div>
                <div className={styles.tabsWrapper}>
                  <div className={styles.tabBtnsWrapper}>
                    <div
                      className={styles.tabBtn}
                      role="button"
                      onClick={() => {
                        formik.setValues({
                          ...formik.values,
                          registerTab: 0,
                          agent: "Company Registered Agent",
                        })
                        dispatch(
                          addItem({
                            value: "Registered Agent",
                            label: "Registered Agent",
                            id: 9929292929292,
                            price: 59,
                            parentName: "Registered Agent",
                          })
                        )
                      }}
                      tabIndex={0}
                    >
                      <div>
                        <Form.Check
                          inline
                          name="checkbox"
                          checked={
                            formik.values.registerTab === 0 ? "checked" : ""
                          }
                        />
                      </div>
                      <div>
                        <p>
                          Assign Filthy Rich Idea as my Registered Agent for
                          FREE my first year. I will renew at $129 per year.
                        </p>
                      </div>
                    </div>
                    <div
                      className={styles.tabBtn}
                      role="button"
                      onClick={() => {
                        formik.setValues({
                          ...formik.values,
                          registerTab: 1,
                          agent: "Own Registered Agent",
                        })
                        dispatch(
                          removeFromCart({
                            value: "Registered Agent",
                            label: "Registered Agent",
                            id: 9929292929292,
                            price: 59,
                            parentName: "Registered Agent",
                          })
                        )
                      }}
                      tabIndex={0}
                    >
                      <div>
                        <Form.Check
                          inline
                          name="checkbox"
                          checked={
                            formik.values.registerTab === 1 ? "checked" : ""
                          }
                        />
                      </div>
                      <div>
                        <p>I would like to act as my own registered agent.</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tabsContentWrapper}>
                    {formik.values.registerTab === 0 ? (
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
                    ) : formik.values.registerTab === 1 ? (
                      <>
                        <div className={styles.tabsWrapper}>
                          <div className={styles.agentInfo}>
                            <h2>Agent Information</h2>
                            <p>
                              You can act as your own Registered Agent if you
                              have a physical address (not a PO Box) in the
                              state where the company is being formed.
                            </p>
                          </div>
                          <div className={styles.tabBtnsWrapper}>
                            <div
                              className={styles.tabBtn}
                              role="button"
                              onClick={() =>
                                formik.setValues({
                                  ...formik.values,
                                  ...agentInfo,
                                  registerInnerTab: 0,
                                })
                              }
                              tabIndex={0}
                            >
                              <div>
                                <Form.Check
                                  inline
                                  name="checkbox"
                                  checked={
                                    formik.values.registerInnerTab === 0
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </div>
                              <div>
                                <h6>Individual</h6>
                                <p>
                                  The registered agent will be an individual.
                                </p>
                              </div>
                            </div>
                            <div
                              className={styles.tabBtn}
                              role="button"
                              onClick={() =>
                                formik.setValues({
                                  ...formik.values,
                                  ...agentInfo,
                                  registerInnerTab: 1,
                                })
                              }
                              tabIndex={0}
                            >
                              <div>
                                <Form.Check
                                  inline
                                  name="checkbox"
                                  checked={
                                    formik.values.registerInnerTab === 1
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </div>
                              <div>
                                <h6>Company</h6>
                                <p>The registered agent will be a company.</p>
                              </div>
                            </div>
                          </div>
                          <div className={styles.tabsContentWrapper}>
                            {formik.values.registerInnerTab === 0 ? (
                              <>
                                <div className={styles.detailCardFieldsWrapper}>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="First Name *"
                                      name="agentFirstName"
                                      type="text"
                                      value={formik.values.agentFirstName}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentFirstName}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="Last Name *"
                                      name="agentLastName"
                                      type="text"
                                      value={formik.values.agentLastName}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentLastName}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="Street Address *"
                                      name="agentStreetAddress"
                                      type="text"
                                      value={formik.values.agentStreetAddress}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentStreetAddress}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="Address (Cont)"
                                      name="agentAddress"
                                      type="text"
                                      value={formik.values.agentAddress}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentAddress}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="City *"
                                      name="agentCity"
                                      type="text"
                                      value={formik.values.agentCity}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentCity}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <CustomSelect
                                      label="State *"
                                      name="state"
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
                                      error={formik.errors.agentZipcode}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : formik.values.registerInnerTab === 1 ? (
                              <>
                                <div className={styles.detailCardFieldsWrapper}>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="Company Name *"
                                      name="agentCompanyName"
                                      type="text"
                                      value={formik.values.agentCompanyName}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentCompanyName}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="Street Address *"
                                      name="agentStreetAddress"
                                      type="text"
                                      value={formik.values.agentStreetAddress}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentStreetAddress}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="Address (Cont)"
                                      name="agentAddress"
                                      type="text"
                                      value={formik.values.agentAddress}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentAddress}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <InputField
                                      label="City *"
                                      name="agentCity"
                                      type="text"
                                      value={formik.values.agentCity}
                                      onChange={formik.handleChange}
                                      error={formik.errors.agentCity}
                                    />
                                  </div>
                                  <div className={styles.inpField}>
                                    <CustomSelect
                                      label="State *"
                                      name="state"
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
                                      error={formik.errors.agentZipcode}
                                    />
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
            </div>
            {formik.values.entityType.value && (
              <div className={styles.stepWrapper}>
                <DetailCard
                  title={
                    formik.values.entityType.label.toLowerCase() ===
                    "corporation"
                      ? "Directors Information "
                      : "Members Information "
                  }
                >
                  {formik.values.entityType.label.toLowerCase() ===
                  "corporation" ? (
                    <div className="mb-5">
                      <CardInfo className="mt-0" title="What is a Director?">
                        A director is responsible for overseeing the operations
                        of a business. They have the authority to make any
                        legal, financial, operational, and contractual decisions
                        that affect the company.
                      </CardInfo>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className={`mb-4 ${styles.inpField}`}>
                    <CustomSelect
                      label={`Number of ${
                        formik.values.entityType.label.toLowerCase() ===
                        "corporation"
                          ? "Directors"
                          : "Members"
                      }  *`}
                      name="noOfMember"
                      placeholder="Select Directors"
                      options={membersOptions}
                      value={formik.values.members}
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          members: e,
                        })
                      }}
                    />
                    <span className="error-message">
                      {formik.errors.members?.value}
                    </span>
                  </div>
                  {inputFields.length !== 0 &&
                    inputFields.map((item, index) => (
                      <React.Fragment key={index}>
                        <DetailCard
                          list
                          removeItem={() => removeItem(item)}
                          title={`${
                            formik.values.entityType.label.toLowerCase() ===
                            "corporation"
                              ? "Director"
                              : "Member"
                          } ${index + 1}`}
                        >
                          <div className={styles.tabsWrapper}>
                            <div className={styles.tabBtnsWrapper}>
                              {formik.values.entityType.label.toLowerCase() ===
                              "corporation" ? (
                                <></>
                              ) : (
                                <>
                                  <div
                                    className={styles.tabBtn}
                                    role="button"
                                    onClick={() => {
                                      const data = [...inputFields]
                                      data[index]["activeTab"] = 0
                                      data[index]["companyName"] = ""
                                      setInputFields(data)
                                    }}
                                    tabIndex={0}
                                  >
                                    <div>
                                      <Form.Check
                                        inline
                                        name={item.key}
                                        type="radio"
                                        checked={
                                          item?.activeTab === 0 &&
                                          index === item?.key
                                            ? "checked"
                                            : ""
                                        }
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
                                    onClick={() => {
                                      const data = [...inputFields]
                                      data[index]["activeTab"] = 1
                                      data[index]["firstName"] = ""
                                      data[index]["lastName"] = ""
                                      setInputFields(data)
                                    }}
                                    tabIndex={0}
                                  >
                                    <div>
                                      <Form.Check
                                        inline
                                        name={item.key}
                                        type="radio"
                                        checked={
                                          item?.activeTab === 1 &&
                                          index === item?.key
                                            ? "checked"
                                            : ""
                                        }
                                      />
                                    </div>
                                    <div>
                                      <h6>Company</h6>
                                      <p>Select if Member is a company.</p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <div className={styles.tabsContentWrapper}>
                              {item?.activeTab === 0 && index === item?.key ? (
                                <>
                                  <div
                                    className={styles.detailCardFieldsWrapper}
                                  >
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="First Name *"
                                        name="firstName"
                                        type="text"
                                        value={item.firstName}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Last Name *"
                                        name="lastName"
                                        type="text"
                                        value={item.lastName}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Street Address *"
                                        name="addressStreet"
                                        type="text"
                                        value={item.addressStreet}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Address (Cont)"
                                        name="address"
                                        type="text"
                                        value={item.address}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="City *"
                                        name="city"
                                        type="text"
                                        value={item.city}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <CustomSelect
                                        label="State *"
                                        name="state"
                                        placeholder="Select State"
                                        options={stateOptions}
                                        value={item.state}
                                        onChange={(e) => {
                                          const data = [...inputFields]
                                          data[index]["state"] = e
                                          setInputFields(data)
                                        }}
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Zip Code *"
                                        name="postal_code"
                                        type="text"
                                        value={item.postal_code}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : item?.activeTab === 1 &&
                                index === item?.key ? (
                                <>
                                  <div
                                    className={styles.detailCardFieldsWrapper}
                                  >
                                    <div className="w-100">
                                      <InputField
                                        label="Company Name *"
                                        name="companyName"
                                        type="text"
                                        value={item.companyName}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Street Address *"
                                        name="addressStreet"
                                        type="text"
                                        value={item.addressStreet}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Address (Cont)"
                                        name="address"
                                        type="text"
                                        value={item.address}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="City *"
                                        name="city"
                                        type="text"
                                        value={item.city}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <CustomSelect
                                        label="State *"
                                        name="state"
                                        placeholder="Select State"
                                        options={stateOptions}
                                        value={item.state}
                                        onChange={(e) => {
                                          const data = [...inputFields]
                                          data[index]["state"] = e
                                          setInputFields(data)
                                        }}
                                      />
                                    </div>
                                    <div className={styles.inpField}>
                                      <InputField
                                        label="Zip Code *"
                                        name="postal_code"
                                        type="text"
                                        value={item.postal_code}
                                        onChange={(event) =>
                                          handleFormChange(index, event)
                                        }
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </DetailCard>
                      </React.Fragment>
                    ))}
                </DetailCard>
              </div>
            )}

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
          </Col>
          {/* <Col lg={4}>
            <PriceSection />
          </Col> */}
        </Row>
      </Container>
    </div>
  )
}

export default ForeignQualificationForm
