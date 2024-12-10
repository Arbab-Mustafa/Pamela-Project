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
import ReactInputMask from "react-input-mask"
import moment from "moment/moment"

import { BsArrowRightShort } from "react-icons/bs"
import { AiOutlineQuestionCircle } from "react-icons/ai"
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
import { entityOptions, entityType2 } from "../../../../utils/helpers"
import {
  addItem,
  addPrice,
  removeFromCart,
} from "../../../../_features/cartSlice"
import { routes } from "../../../../routes"
import PriceSection from "../../../common/PriceSection"
import CompanyPreview from "../../../common/CompanyPreview"
import DetailCard from "../../../businessDetails/common/DetailCard"
import professional from "../../../../images/startBusiness/professional-location.png"
import tickIcon from "../../../../images/services/amendment/need/tick.svg"
import Designator from "../../../common/Designator"
import { useData } from "../../../../utils/helper2"
import InputField from "../../../businessDetails/common/InputField"
import CardInfo from "../../../businessDetails/common/CardInfo"
import CustomSelect from "../../../businessDetails/common/CustomSelect"

function ArticlesOfAmendment() {
  const company = useSelector((state) => state?.company)
  const [designator, setDesignator] = React.useState([])
  const userData = useSelector((state) => state?.auth?.userData)
  const userToken = useSelector((state) => state?.auth?.userToken)
  const statesRed = useSelector((state) => state?.common?.state)
  const singleService = useSelector((state) => state?.common?.selectedService)
  const [address, setAddress] = useState(false)

  const [fillingFee, setFillingFee] = React.useState(false)
  const serviceData = JSON.parse(localStorage.getItem("serviceDetails")) || {}
  const formData =
    serviceData?.serviceId === singleService?._id
      ? JSON.parse(localStorage.getItem("formDetails"))
      : {}
  const [inputFields, setInputFields] = useState(formData?.memberList || [])

  const date = new Date()
  const date2 = new Date()
  const date3 = new Date()
  const dispatch = useDispatch()

  const navigate = useNavigate()
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
      activeTab: formData?.activeTab || 0,
      activeTab2: formData?.activeTab2 || 0,
      notifyBusiness: formData?.notifyBusiness || "",
      members:
        {
          label: inputFields?.length === 0 ? "Select " : inputFields?.length,
          value: inputFields?.length === 0 ? "" : inputFields?.length,
        } || "",
    },
    validationSchema: Yup.object({
      einNumber: Yup.string().when("foreignIndividual", {
        is: false,
        then: Yup.string().required("Required").min(10, "9 digits Required"),
      }),
      sosQuestion: Yup.string().required("Required"),
      notifyBusiness: Yup.string().required("Required"),
      stateService: Yup.object().shape({
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
      members: Yup.object().shape({
        value: Yup.string().required("Required"),
      }),
      companyName: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
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

  useEffect(() => {
    if (formik.values.notifyBusiness === "yes") {
      dispatch(
        addItem({
          name: "Amendment ",
          label: "Amendment ",
          value: "Amendment ",
          price: 75,
          id: singleService._id,
          parentName: "Amendment ",
        })
      )
    } else if (formik.values.notifyBusiness === "no") {
      dispatch(
        removeFromCart({
          name: "Amendment ",
          label: "Amendment ",
          value: "Amendment ",
          price: 75,
          id: singleService._id,
          parentName: "Amendment ",
        })
      )
    }

    dispatch(addPrice())
  }, [formik.values.notifyBusiness])

  useEffect(() => {
    if (formik.values.notifyBusiness === "yes") {
      if (
        formik.values.entityType?.value &&
        formik.values.stateFormation?.value &&
        formik.values.stateService?.value
      ) {
        delete formik.errors["notValid"]

        const feesAdd = formik.values.entityType?.priceData?.find(
          (e) => e?.serviceName?.toLowerCase() === "Amendment".toLowerCase()
        )
        if (feesAdd) {
          const data = feesAdd?.fee?.find(
            (e) =>
              e?.stateName?.toLowerCase() ===
              formik.values.stateService?.value?.toLowerCase()
          )
          if (data?.price === 0) {
            formik.setErrors({
              notValid: "Not a Valid Region please try another",
            })
            toast.warn("Not a Valid State please try another")
          }
          if (data) {
            dispatch(
              addItem({
                name: `${data?.stateName} fee`,
                label: `${data?.stateName} fee`,
                value: `${data?.stateName} fee`,
                price: data?.price,
                id: `asdad`,
                parentName: `State`,
              })
            )
            dispatch(addPrice())
          }
        }

        const feeAdd3 = entityType2.find(
          (e) => e.value === formik.values.entityType?.value
        )

        const feesAdd2 = feeAdd3?.priceData?.find(
          (e) =>
            e.serviceName.toLowerCase() === singleService?.title.toLowerCase()
        )

        if (feesAdd2) {
          const data = feesAdd2?.fee?.find(
            (e) =>
              e?.stateName?.toLowerCase() ===
              formik.values.stateService?.value?.toLowerCase()
          )
          if (data) {
            setFillingFee(data)
          } else {
            setFillingFee(false)
          }
        }
      }
    } else if (formik.values.notifyBusiness === "no") {
      dispatch(
        removeFromCart({
          name: ` fee`,
          label: ` fee`,
          value: ` fee`,
          price: "0",
          id: `asdad`,
          parentName: `State`,
        })
      )
      dispatch(addPrice())
    }
  }, [
    formik.values.entityType,
    formik.values.stateFormation,
    formik.values.stateService,
    formik.values.notifyBusiness,
  ])

  const stateOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State",
    }
  })
  const stateServiceOptions = statesRed?.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      price: value?.price,
      id: value?.id,
      parentName: "State Service",
    }
  })
  const designatorOptions = designator.map((value) => {
    return {
      value: value?.value,
      label: value?.name,
      id: value?.id,
      price: 0,
      parentName: "designatorOptions",
    }
  })
  const memberOption = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ]

  const handleFormChange = (index, event) => {
    const data = [...inputFields]
    data[index][event.target.name] = event.target.value
    setInputFields(data)
  }
  useEffect(() => {
    const arrayCopy = Array.from({ length: formik.values.members?.value }).map(
      (e, i) => {
        return {
          key: inputFields[i]?.i || i,
          activeTab: inputFields[i]?.activeTab || 0,
          uniqueKey: inputFields[i]?.i || i,
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
      }
    )
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
        dispatch(addPrice())
      } else {
        setAddress(false)
      }
    }
  }, [formik.values.stateService.value])

  return (
    <div className={styles.wrap}>
      <Container>
        <Row>
          <Col lg={8}>
            <div className={styles.textblock}>
              <h1 className={styles.heading}>
                Professional Business Address & Mail Service
              </h1>
              <p className={styles.tagline}>
                Filthy Rich Idea offers business mailboxes in 50 states, giving
                you the freedom to manage your business from anywhere in the
                world.
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
                  <div className={styles.form3}>
                    <p className={styles.subtitle}>State Of Service *</p>
                    <Select
                      options={stateServiceOptions}
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
                      name="stateService"
                      id="stateService"
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
              </div>
            </div>
            {formik.values.companyName && formik.values.designator.value && (
              <DetailCard title="Company Address Information">
                {address?.address && (
                  <>
                    <div className={styles.companyAddressInfo}>
                      <div className={styles.companyAddress}>
                        <div className={styles.addressImgWrapper}>
                          <img src={professional} alt="" />
                        </div>
                        <div className={styles.assignedAddressWrapper}>
                          <p>
                            Your principal company address including suite #
                            will be assigned after the order completion.
                          </p>
                          {/* <div className={styles.assignedAddress}>
                            <p>{address?.address}</p>
                            <span>
                              (Suite # will be assigned after the order
                              completion)
                            </span>
                          </div> */}
                        </div>
                      </div>
                      <ul className={styles.detailCardList}>
                        <li>
                          <img src={tickIcon} alt="tick" />
                          <span>
                            Keep your data secure with a professional mailing
                            address,
                          </span>
                        </li>
                        <li>
                          {" "}
                          <img src={tickIcon} alt="tick" />
                          <span>Unlimited incoming mail scanning</span>
                        </li>
                        <li>
                          <img src={tickIcon} alt="tick" />
                          <span>A physical location (not a PO box)</span>
                        </li>
                        <li>
                          {" "}
                          <img src={tickIcon} alt="tick" />
                          <span>
                            24/7 notifications sent to you at any time.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.addressUpdateWrapper}>
                      <div className="d-flex">
                        Would you like us to notify the state of update to your
                        business address?
                        <ButtonToolbar className="ms-1">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>
                                In accordance with the rules of the State, the
                                Articles of Formation filed must include the
                                correct address of the business. Since you are
                                changing or getting a business address, Articles
                                of Amendment must be filed.
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

                      <div className="mt-2 ms-2 mb-3">
                        <Form.Check
                          inline
                          label="Yes"
                          name="notifyBusiness"
                          type="radio"
                          checked={
                            formik.values?.notifyBusiness === "yes" ? true : ""
                          }
                          onChange={() => {
                            formik.setValues({
                              ...formik.values,
                              notifyBusiness: "yes",
                            })
                          }}
                          className="me-5"
                        />
                        <Form.Check
                          inline
                          label="No"
                          checked={
                            formik.values?.notifyBusiness === "no" ? true : ""
                          }
                          onChange={() => {
                            formik.setValues({
                              ...formik.values,
                              notifyBusiness: "no",
                            })
                          }}
                          name="notifyBusiness"
                          type="radio"
                        />
                      </div>
                      <p className="error-message">
                        {formik?.errors?.notifyBusiness}
                      </p>
                    </div>
                  </>
                )}
              </DetailCard>
            )}

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
    </div>
  )
}

export default ArticlesOfAmendment
